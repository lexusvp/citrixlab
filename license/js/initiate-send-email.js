/* ## Secondary License

This code is protected under the terms of the [Limited Use License](LICENSE). By using this code, you agree to the terms and conditions outlined in the License.
Limited Use License Official Link: https://lexusvp.github.io/citrixlab/license/Limited-Use-License.txt */

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
         
             event.preventDefault(); document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const resultDiv = document.getElementById('result');

    // Call the appropriate functions to get the data from DataModule
    const fetchedData = DataModule.getFetchedData();
    const dataToEncrypt = DataModule.getDataToEncrypt();
    const jumbledSequence = DataModule.getJumbledSequence();

form.addEventListener('submit', async function (event) { 
    // Set the innerHTML of 'resultDiv' to the fetched data
    resultDiv.innerHTML = `Data Available: ${fetchedData}, ${dataToEncrypt}, ${jumbledSequence}`;
}
  });
})();
