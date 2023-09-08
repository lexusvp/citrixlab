document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        // Create an object with the email
        const emailData = {
            email: email
        };

        // Convert the object to JSON
        const jsonData = JSON.stringify(emailData);

        try {
            // Send a POST request to save the email data
            const response = await fetch('/license/js/encryption/emailholder.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (!response.ok) {
                throw new Error('Failed to save email.');
                return;
            }
            
            const scriptElement = document.createElement('script');
            scriptElement.src = '/license/js/citrixLab-send-email.js'; // Replace 'path-to-another-script.js' with the actual path to your script
            scriptElement.onload = function() {
                // Code to run after the script has loaded
                // You can call functions or perform actions defined in '/license/js/citrixLab-send-email.js' here
                // For example:
                // callFunctionFromAnotherScript();
            };
            document.head.appendChild(scriptElement);


            //alert('Email saved successfully!');
        } catch (error) {
            console.error('An error occurred:', error);

            // Redirect to the GitHub 404 page
            window.location.href = 'https://github.com/404';
        }
    });
});
