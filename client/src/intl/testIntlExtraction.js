const enJson = require('./en.json');
const assert = require('assert');

// This file will allow us to test the en.json file and see if any entries are missing a default message.
// 1. Run intl:extract by npm run intl:extract
// 2. Navigate to client folder and in the command line
// 3. npm run test:intl-extraction
// 4. If there is no errors, then everything looks good!
// 5. If there are errors, set debug to true and re-run.

// Todo: Have this run anytime any copy changes occur

const debug = false;
if (debug) console.log('Total number of entries in en.json file: ', Object.entries(enJson).length);

let defaultCount = 0;
const noDefault = [];
Object.entries(enJson).forEach((msg) => msg[1].defaultMessage ? defaultCount++ : noDefault.push(msg[0]));
if (debug) console.log('Total number of defaultMessages in en.json file: ', defaultCount);

noDefault.forEach((msg) => console.log('Entries missing defaultMessage: ', msg));

let description = 0;
Object.entries(enJson).forEach((msg) => msg[1].description ? description++ : null);
if (debug) console.log('Total number of descriptions in en.json file: ', description);

// Assertions will fire on errors:
assert(Object.entries(enJson).length === defaultCount);
assert(Object.entries(enJson).length === description);
