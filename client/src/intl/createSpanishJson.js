/**
 * The purpose of this file is to create the es.json file. This file will read in en.json
 * keys and place all keys in es.json. It will also add English copy for easy translation.
 * It will add spaces between each key for ease of reading.
 *
 * TODO: Modify this file to use the existing es.json so that we don't overwrite
 * existing translations.
 */

const fs = require('fs');
const englishJson = require('./en.json');

// Get keys and message for each entry:
const englishKeys = Object.keys(englishJson);
const englishMessage = Object.values(englishJson).map((m) => m.defaultMessage);

const logger = fs.createWriteStream('es-out.json', {
  flags: 'a', // 'a' means appending (old data will be preserved)
});

// Only create the file if keys and message length are the same
if (englishKeys.length === englishMessage.length) {
  // Write the opening curly bracket of JSON
  logger.write('{\n');

  // Loop through all keys adding english and spanish content:
  for (i=0; i<englishKeys.length; i++ ) {
    logger.write(`\t"${englishKeys[i]}_english" : "${englishMessage[i]}",\n`);
    logger.write(`\t"${englishKeys[i]}" : ""`);

    // if the last entry, don't place trailing comma:
    i === englishKeys.length - 1 ? logger.write('\n\n') : logger.write(',\n\n');
  }

  // Write the closing curly bracket:
  logger.write('}');
} else {
  // throw error if lengths do not match
  throw Error(`The number of English keys do not match the number of English messages. 
  Please run test testIntlExtraction`);
}


// Legacy method using writeFile()

// // Initialize object for spanish
// const spanishObj = {};

// // Ensure the number of keys and messages are the same
// if (englishKeys.length === englishMessage.length) {
//   // Add key.english to spanish object
//   englishKeys.forEach((key, index) => spanishObj[`${key}.english`] = englishMessage[index]);

//   // Add key (spanish) to spanish object
//   englishKeys.forEach((key, index) => spanishObj[key] = 'Please fill in Spanish here.');
// } else {
//   // throw error if lengths do not match
//   throw Error(`The number of English keys do not match the number of English messages.
//   Please run test testIntlExtraction`);
// }

// // Alphabetize the spanish object by keys:
// const spanishObjAlphabetized = Object.keys(spanishObj).sort().reduce(
//     (obj, key) => {
//       obj[key] = spanishObj[key];
//       return obj;
//     },
//     {},
// );

// console.log(spanishObjAlphabetized);

// // Write to file:
// const esJson = JSON.stringify(spanishObjAlphabetized, null, 2);
// fs.writeFileSync('es-out.json', esJson);
