const AWS = require('aws-sdk');
const s3 = new AWS.S3();
var ecs = new AWS.ECS();

async function handler(event) {
    // Scan the S3 bucket for items
    const cutoff = DateTime.now().minus({ seconds: event.age });
    const newItems = await fetchS3Objects(event.bucketName, event.bucketPrefix, cutoff);

    // For each item, create an ECS Task

    return 'Finished'
}

async function createTask() {
    const params = {
        taskDefinition: createECSTaskDefinition(),
        count: 1
    };

    await ecs.runTask(params).promise();
}

function createECSTaskDefinition() {

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
