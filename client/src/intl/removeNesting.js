const fs = require('fs');
const englishJson = require('./es_4.12.22-translated-final.json');

// placeholder for fixed es json file
const fixedEs = {};

// loop through incorrect es.json file modify
for (const [key, value] of Object.entries(englishJson)) {
  fixedEs[key] = value.defaultMessage;
};

console.log(fixedEs);

// convert JSON object to string
const fixedEsString = JSON.stringify(fixedEs);

// write JSON string to a file
fs.writeFile('esNoNesting.json', fixedEsString, (err) => {
  if (err) {
    throw err;
  }
  console.log('JSON data is saved.');
});


