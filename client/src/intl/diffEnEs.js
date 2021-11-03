const enJson = require('./en.json');
const esJson = require('./es.json');
// const assert = require('assert');

const esKeys = Object.keys(esJson);
const esKeysNotInEn = Object.keys(enJson).filter((key) => !esKeys.includes(key));

if (esKeysNotInEn.length > 0) {
  console.log('\nKeys that are missing in es.json: ');
  console.log(esKeysNotInEn);
} else {
  console.log('All keys from en.json appear to exist in es.json');
}
