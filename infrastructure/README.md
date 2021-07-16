# Current steps for local & stg:

## Assumptions

Make sure you have previously run

`npm install`

and this assumes you have set up an AWS account and have your CLI programmatic access stored in:

OSX:
`~/.aws/credentials`

Windows:
`C:\Users\USERNAME\.aws\credentials`

## Create ACM Certificate

This only needs to be run once for the `stg` environment.  Prd (not yet created: tbd) will be assuming some other certificate arn will be used.

    `npx serverless create-cert`

You'll have to grab the arn of the certificate from the log output or go into the console to get it, looks like the plugin doesn't work any more.  Set CLOUDFRONT_CERTIFICATE_ARN in sit to that value.

## How To Deploy

    `sls deploy --aws-profile <<your profile name from ~/.aws/credentials>> --stage stg --verbose`

* Note: if sls doesn't work for you, try running this command inside /infrastructure: 

    `./node_modules/.bin/serverless deploy --aws-profile <<your profile name from ~/.aws/credentials>> --stage stg --verbose`

## View Our Resources in AWS Console

Sign in and checkout:

https://console.aws.amazon.com/lambda/home?region=us-east-1#/applications/j40-stg-justice40-data-harvester?tab=deploy

to see our Cloudformation template deploys as lambdas. You should see the `j40-stg-justice40-data-harvester` deploy events there. 

To see our functions in the lambda, check out: 

https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/

Right now we just have:
`stg-DetectChangesForWorker` which has no triggers and just immediately runs when you deploy. Additional work needs to be done to have it run on a cron. That code exists and is currently commented out. 

To view the buckets it writes to in `stg` go to:

https://s3.console.aws.amazon.com/s3/home?region=us-east-1&region=us-east-1

Currently the logging is not setup to write to an internal S3. 

# Warning! This section on is currently unimplemented, partially incorrect, and untested.

## Testing

The examples can be run several different ways

### Local

The `package.json` file incluses several examples to run against the local source code.  The actual 
tasks will execute within AWS, so an `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be set in
the `test.env` file.

```bash
$ cd ./functions/detect-changes-for-worker
$ npm run test:gdal
```

### Lambda invoke

The deployed lambda functions can be directly invoked with the `serverless invoke` function.

```bash
$ cat ./functions/detect-changes-for-worker/events/gdal.json | sls invoke -s sit -f DetectChangesForWorker
```

New event files can be created to perform one-off data processes.


