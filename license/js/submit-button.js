
const fs = require('fs');

// Module for handling data
const DataModule = (function () {
        
    let stringResponseHTML = '123';
    let fetchedData = '123';
    let dataToEncrypt = '123';
    let jumbledSequence = '123';

    // Fetch data from a file and process it
    async function getDataFromFileAndProcess(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Network response was not ok (status: ${response.status})`);
            }

            return await response.text();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // Initialize data
    async function initializeData() {
        fetchedData = await getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/cryptograph-auth.txt');
        dataToEncrypt = await getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/cryptograph-gmail-api.txt');
        jumbledSequence = await getDataFromFileAndProcess('https://raw.githubusercontent.com/lexusvp/citrixlab/main/license/js/encryption/originalSequenceKey.txt');
    }

    // Public method to get fetched data
    function getFetchedData() {
        return fetchedData;
    }

    // Public method to get data to encrypt
    function getDataToEncrypt() {
        return dataToEncrypt;
    }

    // Public method to get jumbled sequence
    function getJumbledSequence() {
        return jumbledSequence;
    }

    // Initialize data when the DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeData);

    return {
        getFetchedData,
        getDataToEncrypt,
        getJumbledSequence,
    };
        
        // Function to write data to the existing emaildb.JSON file
        function writeToEmailDB(data) {
          const emailDBPath = 'license/database/emaildb.JSON';
        
          try {
            // Read the existing JSON data from the file
            const existingData = JSON.parse(fs.readFileSync(emailDBPath, 'utf-8'));
        
            // Append the new data to the existing data
            existingData.push(data);
        
            // Write the updated data back to the file
            fs.writeFileSync(emailDBPath, JSON.stringify(existingData, null, 2), 'utf-8');
        
            return 'Data has been written to emaildb.JSON';
          } catch (error) {
            return `An error occurred: ${error.message}`;
          }
        }

})();

// Module for crypto operations
const CryptoModule = (function () {
    // Function to shuffle a string
    function shuffleString(inputString) {
        const array = inputString.split('');
        let currentIndex = array.length,
            randomIndex, temporaryValue;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array.join('');
    }

    // Function to decrypt data using CryptoJS
    function decryptData(dataToDecrypt, encryptionKey) {
        const decryptedBytes = CryptoJS.AES.decrypt(dataToDecrypt, encryptionKey);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }

    // Function to calculate Attacker Success Probability
    function attackerSuccessProbability(q, z) {
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

    // Public method to get a random character from a string
    function getRandomCharFromString(inputString) {
        const randomIndex = Math.floor(Math.random() * inputString.length);
        return inputString.charAt(randomIndex);
    }

    return {
        shuffleString,
        decryptData,
        attackerSuccessProbability,
        getRandomCharFromString,
    };
})();

// Module for handling form submissions
const FormModule = (function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('signup-form');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const emailDataNew = email;

            try {
                const fetchedData = DataModule.getFetchedData();
                const dataToEncrypt = DataModule.getDataToEncrypt();
                const jumbledSequence = DataModule.getJumbledSequence();

                const encryptionKey = fetchedData; // Use fetched data as the encryption key
                const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, encryptionKey).toString();

                const decryptedData = CryptoModule.decryptData(encryptedData, encryptionKey);
                const jumbledSequence2 = CryptoModule.shuffleString(decryptedData);

                const q1 = decryptedData.length;
                const z1 = encryptionKey.length - 1;
                const probability1 = CryptoModule.attackerSuccessProbability(q1, z1);

                let jumbledSequenceValue = CryptoModule.shuffleString(encryptedData);

                const jumbledSequence3 = CryptoModule.shuffleString(encryptionKey);

                const encryptedData2 = CryptoJS.AES.encrypt(jumbledSequence2, jumbledSequence3).toString();

                const decryptedData2 = CryptoModule.decryptData(encryptedData2, jumbledSequence3);
                const jumbledSequence4 = CryptoModule.shuffleString(decryptedData2);
                const jumbledSequence5 = CryptoModule.shuffleString(jumbledSequence4);

                const encryptedEmailData = CryptoJS.AES.encrypt(emailDataNew, encryptionKey).toString();
                let firstLetterArray = [];
                let jumbledSequenceEmail = '';
                for (let i = 1; i <= 36; i++) {
                    const chunk = CryptoModule.shuffleString(encryptedEmailData);
                    jumbledSequenceEmail += chunk;
                    if (i < 36) {
                        jumbledSequenceEmail += '<br>';
                        const firstLetter = CryptoModule.getRandomCharFromString(chunk); // Get a random character from the current chunk
                        firstLetterArray.push(firstLetter); // Add the first letter to the array
                    }
                }
                // Convert firstLetterArray to a string without commas
                const firstLetterString = firstLetterArray.join('');

                const randomIndex = Math.floor(Math.random() * 9);

                        dataModule.stringResponseHTML = `Probability (q=${q1}, z=${z1}): ${probability1} <br>Secured Email Address Encrypted Data: <br>${'0x000' + randomIndex + firstLetterString}<br>Email Address Encrypted Data: <br>${jumbledSequenceEmail}<br>Encrypted Data: <br>${encryptedData}
                        <br>2nd Layer Encrypted Data: <br>${jumbledSequenceValue} <br> Decrypted Data: <br>${decryptedData2} 
                        <br> 2nd Layer Decrypted Data: <br>${jumbledSequence5} <br>Encryption Keys:<br>${encryptionKey} 
                        &  ${decryptedData}<br>2nd Layer Encryption Key:<br>${jumbledSequence3}`;
                        
                        
                                 try {
                                  // Create an object to store the result data
                                  const resultData = {
                                    probability: probability1,
                                    securedEmailData: `0x000${randomIndex}${firstLetterString}`,
                                    emailData: jumbledSequenceEmail,
                                    encryptedData: encryptedData,
                                    secondLayerEncryptedData: jumbledSequenceValue,
                                    secondLayerDecryptedData: jumbledSequence5,
                                    encryptionKeys: encryptionKey,
                                    secondLayerEncryptionKey: jumbledSequence3,
                                  };
                                
                                  // Write the result data to the emaildb.JSON file
                                  const writeResult = DataModule.writeToEmailDB(resultData);
                                
                                  resultDiv.innerHTML = `${writeResult} <br> ${dataModule.stringResponseHTML}`;
                                } catch (error) {
                                  resultDiv.innerHTML = `JS script error occurred: ${error.message} <br> ${dataModule.stringResponseHTML}`;
                                }
                    } catch (error) {
                resultDiv.innerHTML = `405 error occurred: ${error.message} <br> ${dataModule.stringResponseHTML}`;
            }
        });
    });
})();
