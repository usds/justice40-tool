// Standard modules
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const logger = console;

// AWS APIs
const AWS = require('aws-sdk');

// Local modules
const util = require('util');
const gdal = require('gdal');
const s3 = require('s3');
const ecs = require('ecs');

async function handler(event) {
    // Build the options for the lambda
    const options = initialize(event);

    // Determine what action to take
    switch (event.action) {
        // Execute a raw command against the gdal container
        case 'gdal':
            return await ecs.executeRawCommand(options, event.command);

        // Assume that we're running ogr2ogr
        case 'ogr2ogr':
            return await ecs.executeRawCommand(options, ['ogr2ogr', ...event.command]);

        case 'tippecanoe':
            return await ecs.executeRawCommand(options, event.command);
    
        // Combine USDS data with external data sources
        case 'enrichment':
            return await enrichDataWithUSDSAttributes(options);

        default:
            logger.warn(`Unknown action ${event.action}. Exiting`);
            break;
    }
}

async function enrichDataWithUSDSAttributes(options) {
    const { logger } = options.deps;
    const { util, ecs } = options.deps.local;

    // Scan the S3 bucket for items
    const cutoff = util.getTimestampCutoff(options);
    const inputRecords = await fetchInputS3Objects(options, cutoff);

    logger.debug(inputRecords);

    // For each item, create an ECS Task
    for ( const record of inputRecords ) {
        const taskVars = ecs.createECSTaskVariablesFromS3Record(options, record);
        const taskDefinition = await ecs.createECSTaskDefinition(options, 'ogr2ogr', taskVars);

        logger.info(JSON.stringify(taskDefinition, null, 2));
    }

    return 'Enrichment complete';
}

/**
 * Get a collection of S3 objects that need to be processed.
 */
function fetchInputS3Objects (options, cutoff) {
    const { s3 } = options.deps.local;
    const { sourceBucketName, sourceBucketPrefix } = options.event;
    return s3.fetchUpdatedS3Objects(options, sourceBucketName, sourceBucketPrefix, cutoff);
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
