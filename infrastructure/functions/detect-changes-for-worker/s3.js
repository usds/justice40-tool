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
function fetchUpdatedS3Objects (options, bucket, prefix, cutoff) {
    // Define a filter function that only looks at object on a single level of the
    // bucket and removes any objects with a LastModified timestamp prior to the cutoff
    const threshold = cutoff.toMillis();
    const filterFunc = (c) => isSimpleObject(c, prefix) && (threshold < c.LastModified.getTime());

    return fetchS3Objects(options, bucket, prefix, filterFunc);
}

/**
 * Basic utility function to return S3 object from a bucket that match a given prefix.  An
 * optional filtering function can be passed in.
 */
async function fetchS3Objects (options, bucket, prefix, filterFunc = () => true) {
    const { s3 } = options.deps;
    const objects = [];

    // Limit the results to items in this bucket with a specific prefix
    const params = {
      Bucket: bucket,
      Prefix: prefix
    };
  
    do {
        // Get all of the initial objects
        const response = await s3.listObjectsV2(params).promise();

        // Optionally, filter out objects
        const contents = response.Contents.filter(filterFunc);
        objects.push(...contents);

        params.ContinuationToken = response.IsTruncated
          ? response.NextContinuationToken
          : null;
    } while (params.ContinuationToken);
  
    return objects;
}

module.exports = {
    isSimpleObject,
    fetchS3Objects,
    fetchUpdatedS3Objects
};