// myscript.js
console.log("Hello, Node.js!");

const fs = require('fs');
const path = require('path');

// Specify the folder and file details
const folderPath = 'myFolder'; // Replace with your desired folder path
const fileName = 'example.txt';
const filePath = path.join(folderPath, fileName);
const fileContent = 'This is the content of the file.';

// Check if the folder exists, and create it if it doesn't
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true }); // Create the folder and any missing parent folders
  console.log(`The folder "${folderPath}" was created.`);
}

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
