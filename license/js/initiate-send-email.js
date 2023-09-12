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