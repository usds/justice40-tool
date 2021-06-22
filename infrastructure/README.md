## create acm certificate

this only needs to be run once for the `sit` environment.  stg and prd, we're assuming some other certificate arn will be used

    npx serverless create-cert 

you'll have to grab the arn of the certificate from the log output or go into the console to get it, looks like the plugin doesn't work any more.  Set CLOUDFRONT_CERTIFICATE_ARN in sit to that value

## deploy

    sls deploy --aws-profile geoplatform --stage sit --verbose

if its the first time deploying, you'll have to create a dns entry that points to the cloudfront distribution.  This seems easier than defining in cloudformation, since most of the dns configuration isn't done through aws for .gov domains (like for stg, prd)



