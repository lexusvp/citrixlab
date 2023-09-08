/* ## Secondary License

This code is protected under the terms of the [Limited Use License](LICENSE). By using this code, you agree to the terms and conditions outlined in the License.
Limited Use License Official Link: https://lexusvp.github.io/citrixlab/license/Limited-Use-License.txt */

const shuffleString = (inputString) => {
  const array = inputString.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};

const fs = require('fs').promises;
const crypto = require('crypto');

async function main() {
  try {
    // Read the content from "/encryption/crptograph-auth.txt"
    const filePath = '/encryption/crptograph-auth.txt';
    const fileContent = await fs.readFile(filePath, 'utf8');

    // Read the last value from "count.JSON" and increment it
    const countFilePath = '/license/database/count.JSON';
    const countData = await fs.readFile(countFilePath, 'utf8');
    const countObject = JSON.parse(countData);
    let lastValue = countObject.lastValue || 0;
    lastValue++;

    // Update "count.JSON" with the new value of 'i'
    countObject.lastValue = lastValue;
    await fs.writeFile(countFilePath, JSON.stringify(countObject, null, 2), 'utf8');

    // Encrypt the file content (e.g., using AES encryption)
    const originalSequence = 'Wkbae1Ksc5OtyLgMV2U9iRWlpD3wTHFnmB0QJoG8EXNjP7ZzdrvXY4fINhquSA6cxYR';
    const jumbledSequence = shuffleString(originalSequence);

    const encryptionKey = jumbledSequence; // Replace with your encryption key
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encryptedData = cipher.update(fileContent, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    // Create a new HTML file "key-i.html" with the encrypted data
    const newFileName = `key-${lastValue}.html`;
    const htmlContent = `<html><body>${encryptedData}</body></html>`;
    await fs.writeFile(newFileName, htmlContent, 'utf8');

    console.log(`HTML file "${newFileName}" created with encrypted data.`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main();
