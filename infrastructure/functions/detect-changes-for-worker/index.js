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
        // Execute a raw ogr2ogr command in Fargate
        case 'raw':
            return await executeRawOgr2OgrCommand(options);

        // Combine USDS data with external data sources
        case 'enrichment':
            return await enrichDataWithUSDSAttributes(options);

        default:
            logger.warn(`Unknown action ${action}. Exiting`);
            break;
    }
}

async function enrichDataWithUSDSAttributes(options) {
    const { logger } = options.deps;

    // Scan the S3 bucket for items
    const cutoff = getTimestampCutoff(options);
    const inputRecords = await fetchInputS3Objects(options, cutoff);

    logger.debug(inputRecords);

    // For each item, create an ECS Task
    for ( const record of inputRecords ) {
        const taskVars = createECSTaskVariablesFromS3Record(options, record);
        const taskDefinition = await createECSTaskDefinition(options, 'ogr2ogr', taskVars);

        logger.info(JSON.stringify(taskDefinition, null, 2));
    }

    return 'Enrichment complete';
}

function initialize(event) {
    logger.debug('event:', JSON.stringify(event, null, 2));
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

function applyVariableSubstitution(options, vars, input) {
    const { logger } = options.deps;

    let result = input;
    for (const [key, value] of Object.entries(vars)) {
        const token = '${' + key + '}';

        // Use the split-join-method because the tokens have special characters which
        // confuses the Regular Expression constructor
        //  @see https://stackoverflow.com/a/17606289/332406
        result = result.split(token).join(value);
    }

    return result;
}

async function createECSTaskDefinition(options, templateName, taskVars) {
    const { fs, path } = options.deps;

    // Load the task template
    const templatePath = path.join(__dirname, 'taskDefinitions', `${templateName}.json`);
    const rawTaskTemplate = await fs.promises.readFile(templatePath, 'utf8');

    // Perform variable substitution
    const taskTemplate = applyVariableSubstitution(options, taskVars, rawTaskTemplate);

    // Parse into a JSON object and return
    return JSON.parse(taskTemplate);
}

/**
 * Takes the event parameters and performs some variable substitution for the
 * SQL query based on the actual items being processed.
 */
function createECSTaskVariablesFromS3Record(options, record) {
    const { event } = options;
    const { REGION } = options.env;
    const { path } = options.deps;

    const fullKey = record.Key;
    const baseKey = path.basename(fullKey);
    const baseKeyExt = path.extname(baseKey);
    const baseKeyNoExt = path.basename(baseKey, baseKeyExt);

    // Define all of the valid substitution variables
    const vars = {
        "s3.Key:full": fullKey,
        "s3.Key": baseKey,
        "s3.Key:base": baseKeyNoExt,
        "s3.Key:ext": baseKeyExt
    };

    // Apply them to the SQL clause
    const sql = applyVariableSubstitution(options, vars, event.sql);

    // Return the modified event record
    return {
        ...event,
        REGION,
        sql
    };
}

async function executeRawOgr2OgrCommand(options) {
    const { logger } = options.deps;
    const { env } = options;
    const { event } = options;
    const { ECS_CLUSTER, STAGE, VPC_SUBNET_ID } = env;

    // These are the only variables injected from the environment
    //const taskVars = {
    //    REGION
    //};

    // Create the basic task definition
    // const taskDefinition = await createECSTaskDefinition(options, 'ogr2ogr_raw', taskVars);

    // Create the full Tas parameter object and execute
    const params = {
        taskDefinition: getTaskDefinitionName(options),
        cluster: ECS_CLUSTER,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: { // Must be specified for tasks with `awsvpc` networking and awsvpc networking is required for FARGATE launch types
            awsvpcConfiguration: {
                subnets: [
                    VPC_SUBNET_ID
                ],
                assignPublicIp: 'DISABLED',
                securityGroups: []
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: `${STAGE}-justice40-data-harvester-osgeo-gdal`,
                    command: ['ogr2ogr', ...event.command]
                }
            ]
        }
    };

    logger.info(`Executing ECS Task...`, JSON.stringify(params, null, 2));
    return await ecs.runTask(params).promise();
}

function getTaskDefinitionName(options) {
    const { STAGE } = options.env;
    return `${STAGE}-justice40-data-harvester-ogr2ogr`;
}

function fetchInputS3Objects (options, cutoff) {
    const { sourceBucketName, sourceBucketPrefix } = options.event;
    return fetchS3Objects(sourceBucketName, sourceBucketPrefix, cutoff);
}

function isSimpleObject(c, prefix) {
    // The object is the prefix, ignore...
    if (c.Key.length === prefix.length) {
        return false;
    }

    // This doesn't give the *exact* count, but all we really care about is that
    // the value is the same for the prefix and the S3 Key.
    const separatorCount = c.Key.split('/').length;
    const prefixSeparatorCount = prefix.split('/').length;

    return separatorCount === prefixSeparatorCount;
}

/**
 * @param {string} bucket name in S3 to scan
 * @param {string} prefix of S3 buket items
 * @param {Date} cutoff timestamp
 * @returns 
 */
async function fetchS3Objects (bucket, prefix, cutoff) {
    const objects = [];
    const threshold = cutoff.toMillis();

    // Limit the results to items in this bucket with a specific prefix
    const params = {
      Bucket: bucket,
      Prefix: prefix
    };
  
    do {
        // Get all of the initial objects
        const response = await s3.listObjectsV2(params).promise();

        // Filter out any objects that are within another "folder" or match the prefix itself
        const validObjects = response.Contents.filter(c => isSimpleObject(c, prefix));

        // Filter out any objects with a LastModified timestamp prior to the cutoff
        const updatedObjects = validObjects.filter(c => threshold < c.LastModified.getTime());
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
