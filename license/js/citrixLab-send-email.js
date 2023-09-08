function shuffleString(inputString) {
  const array = inputString.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

const originalSequence = 'Wkbae1Ksc5OtyLgMV2U9iRWlpD3wTHFnmB0QJoG8EXNjP7ZzdrvXY4fINhquSA6cxYR';
const jumbledSequence = shuffleString(originalSequence);

const fs = require('fs');
const crypto = require('crypto');

// Read the content from "/encryption/crptograph-auth.txt"
const filePath = '/encryption/crptograph-auth.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

// Encrypt the file content (e.g., using AES encryption)
const encryptionKey = jumbledSequence; // Replace with your encryption key
const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
let encryptedData = cipher.update(fileContent, 'utf8', 'hex');
encryptedData += cipher.final('hex');

// Read the last value from "0.txt" and increment it
let lastValue = parseInt(fs.readFileSync('/encryption/0.txt', 'utf8').trim(), 10);
lastValue++;
fs.writeFileSync('0.txt', lastValue.toString(), 'utf8');

// Create a new HTML file "key-i.html" with the encrypted data
const newFileName = `key-${lastValue}.html`;
const htmlContent = `<html><body>${encryptedData}</body></html>`;
fs.writeFileSync(newFileName, htmlContent, 'utf8');

console.log(`HTML file "${newFileName}" created with encrypted data.`);



/*
  This is a multi-line comment
  in JavaScript.
//credits from: https://raw.githubusercontent.com/benjamintemitope/EmailSend-JS/master/js/script.js
const secureToken = encryptedData; //Secure Token Here

const form = document.getElementById("form-feild");
const formButton = document.getElementById("form-button");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    //Get all fields entries
    const data = Object.fromEntries(new FormData(form).entries());
    formButton.innerText = "Please Wait";
    //Send Email
    sendEmail(data);
});

function sendEmail(data) {
    //Sending multiple emails
    var recipientEmails = data['recipient-email'];
    recipientEmails = recipientEmails.split(',');

    Email.send({
        SecureToken: secureToken, //Get SecureToken https://smtpjs.com/#useit
        To: recipientEmails,
        From: data['sender-email'],
        Subject: data['subject'],
        Body: "<html>" + data['message'] + "</html>"
    }).then(
      function(message) {
          if (message === 'OK') {
              alert('Email Sent.');
              form.reset();
          }else {
            alert(message)
          }
          formButton.innerText = "Send Email";
      }
    );
}
*/
