// myscript.js
console.log("Hello, Node.js!");

const fs = require('fs');
const path = require('path');

// Specify the folder and file details
const folderPath = 'file'; // Replace with your desired folder path
const fileName = 'example.txt';
const filePath = path.join(folderPath, fileName);
const fileContent = 'This is the content of the file.';

// Check if the folder exists
if (!fs.existsSync(folderPath)) {
  console.log(`The folder "${folderPath}" does not exist.`);
  // You can choose to create the folder here if needed using fs.mkdirSync(folderPath)
} else {
  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.log(`The file "${fileName}" already exists.`);
  } else {
    // Create the file
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
      } else {
        console.log('File created successfully.');
      }
    });
  }
}
