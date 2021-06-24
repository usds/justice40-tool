/**
 * Helper function to determine if we should interpret an S3 object as
 * a "simple" file or a folder.
 */
function isSimpleObject(c, prefix) {
    // If the object ends with a separator charater, interpret that as a folder
    if (c.Key.endsWith('/')) {
        return false;
    }

    // If the object is more deeply nested than the prefix, then ignore, e.g.
    // prefix = /foo/bar      = two separators
    // c.Key  = /foo/bar/baz  = three separators [skip]
    // c.Key  = /foo/bar.txt  = two separators   [pass]
    // This doesn't give the *exact* count, but all we really care about is that
    // the value is the same for the prefix and the S3 Key.
    const separatorCount = c.Key.split('/').length;
    const prefixSeparatorCount = prefix.split('/').length;

    return separatorCount === prefixSeparatorCount;
}

/**
 * Return all of the simple S3 objects from a prefix that have a LastModified
 * date after a cutoff date.
 * 
 * This returns objects that have recently changed for re-processing.
 */
 async function fetchUpdatedS3Objects (options, bucket, prefix, cutoff) {
    const { s3 } = options.deps;
    const objects = [];
    const threshold = cutoff.toMillis();

    // Limit the results to items in this bucket with a specific prefix, and do not recursively
    // search the bucket -- only looks at object on a single level
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
    isSimpleObject,
    fetchUpdatedS3Objects
};