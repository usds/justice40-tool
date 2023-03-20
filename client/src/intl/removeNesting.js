const fs = require('fs');

// Place nested translation file
const nestedTranslation = require('./es_3.17.23-translated-final.json');

// placeholder for fixed es json file
const fixedEs = {};

// loop through nested es.json file and "flatten"
for (const [key, value] of Object.entries(nestedTranslation)) {
  fixedEs[key] = value.defaultMessage;
};

console.log(fixedEs);

// convert JSON object to string
const fixedEsString = JSON.stringify(fixedEs);

// write the flattened (no nesting) translated JSON string to a file
fs.writeFile('esFlattened.json', fixedEsString, (err) => {
  if (err) {
    throw err;
  }
  console.log('JSON data is saved.');
});


