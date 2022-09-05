window.addEventListener('layout-initialized', () => {
    // Api key for the APINinjas service
    var apiKey = 'qtWOXUEMTrd7tku9S4hw9w==gtK4qE9mGO4izDlX';
    // Initial calls so that the default values get calculated 
    calculateMortgage();
    // Just a utility function to set some text in a <span> value, with a prefix and suffix
    function setElementValue(element, value, pref, suf){
        element.innerHTML = (pref ? pref : '') + value.toString() + (suf ? suf : '');
    }
    // I am using an external API to perform the calculation of a mortgage with the provided information
    // The parameters of this function match the API required parameters
    async function fetchMortgage(amount, interest, term){
        // Perform the fetch to the service with the API key, to get the object with the calculations
        let result = await fetch(
            `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${amount}&interest_rate=${interest}&duration_years=${term}`,
            {
                headers: { 'X-Api-Key': apiKey}
            });

        // Get the JSON object from the returned data
        let returnedJSON = await result.json();
        return returnedJSON;
    }

    // The submit button will trigger the calculateMortgage function
    document.getElementById('mortgage-submitBtn').addEventListener('click', calculateMortgage);
    
    // This function takes care of retrieving values from the form
    async function calculateMortgage(){
        // Each input box DOM element has its own .value property that corresponds to the entered value by the user
        let price = document.getElementById('mortgage-homePrice').value;
        let term = document.getElementById('mortgage-term').value;
        let interest = document.getElementById('mortgage-interest').value;
        let down = document.getElementById('mortgage-down').value;
        // The amount to finance
        let calculatedAmount = price - down;
        // Default payment. It will be shown if the calculated amount turns out to be less than zero (Down Payment is greater than the house cost)
        let totalPayment = 0;
        if(calculatedAmount > 0)
            totalPayment = (await fetchMortgage(calculatedAmount, interest, term)).monthly_payment.total; // Get the monthly payment total from the returned JSON

        // This will set the result <span> element and the mortgage interest <span> element
        setElementValue(document.getElementById('mortgage-result-amount'), totalPayment, '$'); // No suffix
        setElementValue(document.getElementById('mortgage-result-interest'), interest, null, '%'); // No prefix

        return;
    }
});