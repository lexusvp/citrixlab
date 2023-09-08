/* execute the encryption

## Secondary License

This code is protected under the terms of the [Limited Use License](LICENSE). By using this code, you agree to the terms and conditions outlined in the License.
Limited Use License Official Link: https://lexusvp.github.io/citrixlab/license/Limited-Use-License.txt
*/

try {

// Create a script element
const script = document.createElement('script');

// Set the source attribute to your JavaScript file
script.src = '/js/encryption/encryptme.js';

// Define a callback function to execute when the script is loaded
script.onload = function() {
  console.log('The script has been loaded and executed.');
  // You can add any code here that depends on the loaded script
};

// Handle errors if the script fails to load
script.onerror = function() {
  console.error('Error loading the script.');
  // You can handle the error or redirect to a 404 page here 
};

// Append the script element to the document's head to load and execute it
document.head.appendChild(script);

// Make an HTTP GET request to fetch the JSON data from emailholder.json
fetch('/license/js/encryption/emailholder.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch email data.');
        }
        return response.json();
    })
    .then(data => {
        // Access the email value from the JSON data
        const email = data.email;

        // Use the email value as needed
        console.log('Email retrieved from emailholder.json:', email);
        alert(email);
        // You can perform further actions with the email value here
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });

/*
//credits from: https://raw.githubusercontent.com/benjamintemitope/EmailSend-JS/master/js/script.js
const secureToken = getSecureToken; //Secure Token Here

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
  
} catch (error) {
  // An error occurred
  console.error('An error occurred:', error);
  
  // Redirect to the GitHub 404 page
  window.location.href = 'https://github.com/404';
}
