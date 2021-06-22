// Standard odules
const fs = require('fs');
const path = require('path');
const { DateTime }= require('luxon');
const logger = console;

// AWS APIs
const AWS = require('aws-sdk');
const { env } = require('process');
const s3 = new AWS.S3();
const ecs = new AWS.ECS();

async function handler(event) {
    // Build the options for the lambda
    const options = initialize(event);

    // Determine what action to take
    switch (event.action) {
        // Combine USDS data with external data sources
        case 'enrichment':
            return await enrichDataWithUSDSAttributes(options);

        default:
            logger.warn(`Unknown action ${action}. Exiting`);
            break;
    }
}

async function enrichDataWithUSDSAttributes(options) {

    // Scan the S3 bucket for items
    const cutoff = getTimestampCutoff(options);
    const inputRecords = await fetchInputS3Objects(options, cutoff);

    // For each item, create an ECS Task
    for ( const record of inputRecords ) {
        const taskVars = createECSTaskVariablesFromS3Record(record);
        await createECSTaskDefinition(options, taskVars);
    }

    return 'Enrichment complete';
}

function initialize(event) {
    return {
        deps: {
            DateTime,
            fs,
            logger,
            path,
            s3,
            ecs
        },
        env,
        event
    };
}

function getTimestampCutoff(options) {
    const { event } = options;
    const { DateTime } = options.deps;

    return DateTime.now().minus({ seconds: event.age });
}

function buildDestinationVSIS3Path(options, name) {
    return `/vsis3/${bucket}/${key}`;
}

async function createECSTaskDefinition(options, taskVars) {
    const { fs, path } = options.deps;

    // Load the task template
    let taskTemplate = await fs.promises.readFile(path.join(__dirname, 'taskDefinitions', 'ogr2ogr.json'));

    // Perform variable substitution
    for (const key of Object.keys(taskVars)) {
        const token = '${' + key + '}';
        taskTemplate = taskTemplate.replaceAll(token, taskVars[key]);
    }

    // Parse into a JSON object and return
    return JSON.parse(taskTemplate);
}

async function createTask(input, output, ) {
    const { REGION } = process.env;

    const taskVars = {
        REGION,
        input,
        census_source,
        census_join_attribute,
        usds_source,
        usds_source_name,
        usds_join_attribute,
        output
    };

    const params = {
        taskDefinition: await createECSTaskDefinition(taskVars),
        count: 1
    };

    return await ecs.runTask(params).promise();
}

function createECSTaskDefinition() {

}

function fetchInputS3Objects (options, cutoff) {
    const { sourceBucketName, sourceBucketPrefix } = options.event;
    return fetchS3Objects(sourceBucketName, sourceBucketPrefix, cutoff);
}

/**
 * @param {string} bucket name in S3 to scan
 * @param {string} prefix of S3 buket items
 * @param {Date} cutoff timestamp
 * @returns 
 */
async function fetchS3Objects (bucket, prefix, cutoff) {
    const objects = [];
    const threshold = cutoff.getTime();

    // Limit the results to items in this bucket with a specific prefix
    const params = {
      Bucket: bucket,
      Prefix: prefix
    };
  
    do {
        // Get all of the initial objects
        const response = await s3.listObjectsV2(params).promise();

        // Filter out any objects with a LastModified timestamp prior to the cutoff
        const updatedObjects = response.Contents.filter(c => threshold < c.LastModified.getTime());
        objects.push(...updatedObjects);

        params.ContinuationToken = response.IsTruncated
          ? response.NextContinuationToken
          : null;
    } while (params.ContinuationToken);
  
    return objects;
}

module.exports = {
    handler
};
