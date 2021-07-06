## create acm certificate

This only needs to be run once for the `sit` environment.  stg and prd, we're assuming some other certificate arn will be used

    npx serverless create-cert 

you'll have to grab the arn of the certificate from the log output or go into the console to get it, looks like the plugin doesn't work any more.  Set CLOUDFRONT_CERTIFICATE_ARN in sit to that value

## deploy

    sls deploy --aws-profile geoplatform --stage sit --verbose

If it's the first time deploying, you'll have to create a dns entry that points to the cloudfront distribution.

## testing

The examples can be run several different ways

### local

The `package.json` file incluses several examples to run against the local source code.  The actual 
tasks will execute within AWS, so an `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be set in
the `test.env` file.

```bash
$ cd ./functions/detect-changes-for-worker
$ npm run test:gdal
```

### lambda invoke

The deployed lambda functions can be directly invoked with the `serverless invoke` function.

```bash
$ cat ./functions/detect-changes-for-worker/events/gdal.json | sls invoke -s sit -f DetectChangesForWorker
```

New event files can be created to perform one-off data processes.


