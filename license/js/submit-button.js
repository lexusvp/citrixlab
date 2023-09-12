try
{
// Define a function to shuffle a string
function shuffleString(inputString) {
    const array = inputString.split('');
    let currentIndex = array.length, randomIndex, temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array.join('');
}

// Define a function to get data from a file and process it
function getDataFromFileAndProcess(url, callback) {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPromise = fetch(url, { signal });

    fetchPromise
        .then(response => {
            if (signal.aborted) {
                console.log('Fetch request was aborted.');
                throw new Error('Fetch request was aborted.');
            } else if (!response.ok) {
                throw new Error(`Network response was not ok (status: ${response.status})`);
            } else {
                return response.text();
            }
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch request was aborted.');
                throw error;
            } else {
                console.error('Error:', error);
                throw error;
            }
        });
}

// Define a function to decrypt data using CryptoJS
function decryptData(dataToDecrypt, encryptionKey) {
    const decryptedBytes = CryptoJS.AES.decrypt(dataToDecrypt, encryptionKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

let fetchedData = `123`;
getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/cryptograph-auth.txt', function(data){    fetchedData = data;});

let dataToEncrypt=`123`; 
getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/cryptograph-gmail-api.txt', function(data){    dataToEncrypt = data;});

let jumbledSequence = `123`;
getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/originalSequenceKey.txt', function(data){    getOSK = data;});

let emailDataNew = `123`;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
		
        let emailDataNew = email;
        
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
                throw new Error(fetchedData);
            }

            resultDiv.innerHTML = `Failed to get fetch: ${fetchedData}`;
        } catch (error) {
            console.error('An error occurred:', error);
            resultDiv.innerHTML = `An error occurred: ${fetchedData}`;
        }

        try {
        
            const encryptionKey = fetchedData; // Use fetched data as the encryption key
            const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, encryptionKey).toString();

            const q1 = dataToEncrypt.length;
            const z1 = encryptionKey.length - 1;
            const probability1 = AttackerSuccessProbability(q1, z1);

            let jumbledSequence = shuffleString(encryptedData);

            const decryptedData = decryptData(encryptedData, encryptionKey);
            const jumbledSequence2 = shuffleString(decryptedData);

            const jumbledSequence3 = shuffleString(encryptionKey);

            const encryptedData2 = CryptoJS.AES.encrypt(jumbledSequence2, jumbledSequence3).toString();

            const decryptedData2 = decryptData(encryptedData2, jumbledSequence3);
            const jumbledSequence4 = shuffleString(decryptedData2);
            const jumbledSequence5 = shuffleString(jumbledSequence4);
             
            const encryptedEmailData = CryptoJS.AES.encrypt(emailDataNew, encryptionKey).toString();
            const jumbledSequence6 = shuffleString(encryptedEmailData);
            
            resultDiv.innerHTML = `Probability (q=${q1}, z=${z1}): ${probability1} <br>Email Address Encrypted Data: <br>${jumbledSequence6}<br>Encrypted Data: <br>${encryptedData}
            <br>2nd Layer Encrypted Data: <br>${jumbledSequence} <br> Decrypted Data: <br>${decryptedData2} 
            <br> 2nd Layer Decrypted Data: <br>${jumbledSequence5} <br>Encryption Keys:<br>${encryptionKey} 
            &  ${decryptedData}<br>2nd Layer Encryption Key:<br>${jumbledSequence3}`;
            
        } catch (error) {
            resultDiv.innerHTML = `An error occurred: ${error.message}`;
        }
    });
});

// Function to calculate Attacker Success Probability
function AttackerSuccessProbability(q, z) {
    let p = 1.0 - q;
    let lambda = z * (q / p);
    let sum = 1.0;

    for (let k = 0; k <= z; k++) {
        let poisson = Math.exp(-lambda);

        for (let i = 1; i <= k; i++) {
            poisson *= lambda / i;
        }

        sum -= poisson * (1 - Math.pow(q / p, z - k));
    }

    return sum;
}

} catch (error) {resultDiv.innerHTML = `An error occurred: ${error}`;}
