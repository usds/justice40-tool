// Standard modules
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const logger = console;

// AWS APIs
const AWS = require('aws-sdk');

// Local modules
const util = require('./util');
const gdal = require('./gdal');
const s3 = require('./s3');
const ecs = require('./ecs');

async function handler(event) {
    // Build the options for the lambda
    const options = initialize(event);

    // Determine what action to take
    switch (event.action) {
        // Execute a raw command against the gdal container
        case 'gdal':
            return await ecs.executeRawCommand(options, event);

        // Assume that we're running ogr2ogr
        case 'ogr2ogr':
            return await ecs.executeRawCommand(options, {
                ...event,
                command: ['ogr2ogr', ...event.command]
            });

        case 'tippecanoe':
            return await ecs.executeRawCommand(options, event);
    
        // Combine USDS data with external data sources
        case 'enrichment':
            return await enrichDataWithUSDSAttributes(options, event);

        default:
            logger.warn(`Unknown action ${event.action}. Exiting`);
            break;
    }
}

async function enrichDataWithUSDSAttributes(options, event) {
    const { logger } = options.deps;
    const { util, ecs, s3 } = options.deps.local;

    // Use the event.age to calculate the custoff for any input files
    const cutoff = util.getTimestampCutoff(options);
    logger.info(`Cutoff time of ${cutoff}`);

    // Scan the source S3 bucket for items that need to be processed
    const { sourceBucketName, sourceBucketPrefix } = event;
    const sourceS3Records = await s3.fetchUpdatedS3Objects(options, sourceBucketName, sourceBucketPrefix, cutoff);

    // If there are no input record, exit early
    if (sourceS3Records.length === 0) {
        logger.info(`There are no objects in s3://${sourceBucketName}/${sourceBucketPrefix} that have been modified after the cutoff date`);
        return;
    }
    
    // Scan for the census records
    const { censusBucketName, censusBucketPrefix } = event;
    const censusS3Records = await s3.fetchS3Objects(options, censusBucketName, censusBucketPrefix);

    // If there are no census datasets, exit early
    if (censusS3Records.length === 0) {
        logger.info(`There are no objects in s3://${censusBucketName}/${censusBucketPrefix}`);
        return;
    }

    // Create a set of substitution variables for each S3 record that will be applied to the
    // action template
    const censusVariables = censusS3Records.map(r => util.createSubstitutionVariablesFromS3Record(options, r, 'census'));
    const sourceVariables = sourceS3Records.map(r => util.createSubstitutionVariablesFromS3Record(options, r, 'source'));

    // Kick off an ECS task for each (source, census) pair.
    for ( const census of censusVariables ) {
        for ( const source of sourceVariables) {
            // Merge the variables together
            const vars = { ...census, ...source };

            // Let the logs know what's happening
            logger.info(`Enriching ${vars['census.Key']} with ${vars['source.Key']}...`);

            // Apply the substitutions to the pre, post, and command arrays
            const pre = util.applyVariableSubstitutionToArray(options, vars, event.pre);
            const post = util.applyVariableSubstitutionToArray(options, vars, event.post);
            const command = util.applyVariableSubstitutionToArray(options, vars, event.command);

            await ecs.executeRawCommand(options, {
                ...event,
                pre,
                command: ['ogr2ogr', ...command],
                post
            });
        }
    }
}

/**
 * Wrap all dependencies in an object in order to inject as appropriate.
 */
function initialize(event) {
    logger.debug('event:', JSON.stringify(event, null, 2));
    return {
        deps: {
            DateTime,
            fs,
            logger,
            path,
            s3: new AWS.S3(),
            ecs: new AWS.ECS(),
            local: {
                ecs,
                gdal,
                s3,
                util
            }
        },
        env: process.env,
        event
    };
}

module.exports = {
    handler
};
