// FUNCTIONAL \\
class ClientInformation {

    constructor(clientId = 0, fullName = 'DefaultName', address = 'DefaultAddress',
                city = 'DefaultCity', state = 'DefaultState', zipCode = 'DefaultZipCode',
                phone = 'DefaultPhone', email = 'DefaultEmail') {
        this.clientId = clientId;
        this.fullName = fullName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode =zipCode;
        this.phone = phone;
        this.email = email;
    }

}

// FUNCTIONAL \\
class Quote {

    constructor(id, clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue){
        this.quoteId=id;
        this.clientId=clientId;
        this.gallonsRequested=gallonsRequested;
        this.requestDate=requestDate;
        this.deliveryDate=deliveryDate;
        this.deliveryAddress=deliveryAddress;
        this.deliveryCity=deliveryCity;
        this.deliveryState=deliveryState;
        this.deliveryZipCode=deliveryZipCode;
        this.deliveryContactName=deliveryContactName;
        this.deliveryContactPhone=deliveryContactPhone;
        this.deliveryContactEmail=deliveryContactEmail;
        this.suggestedPrice=suggestedPrice;
        this.totalAmountDue=totalAmountDue;
    }
}

// FUNCTIONAL \\
class quoteHistory {
    constructor() {
        // Create and array of quotes
        this.quoteList = [];
    }

    addQuote(quoteObj) {
        // if the value passed is a quote object then push it.
        if (quoteObj instanceof Quote) {
            // add to the array
            this.quoteList.push(quoteObj);
        }
    }

    showHistory() {
        // for now print to console, later print to html document.
        console.log(this.quoteList);
    }

    // This will eventually retrieve the data from the DB
    getDataFromJSON() {
        // Will be deprecated, he just wanted us to use JSON
        var tempJSON =
            [
                {
                    "itemNum": 1,
                    "reqDate": "1/2",
                    "deliveryDate": "2/1",
                    "gallons": 1,
                    "rate": "$1 a gallon",
                    "totPrice": 69
                },
                {
                    "itemNum": 2,
                    "reqDate": "2/3",
                    "deliveryDate": "3/2",
                    "gallons": 2,
                    "rate": "$2 a gallon",
                    "totPrice": 420
                }
            ];

        //Retrieving data:
        var parsedJSON = JSON.parse(JSON.stringify(tempJSON));

        for (var i = 0; i < parsedJSON.length; i++)
        {
            var tempQuote = new Quote(parsedJSON[i].itemNum, parsedJSON[i].gallons, parsedJSON[i].deliveryDate
                , parsedJSON[i].reqDate, 'devLoc', 'contName', 'contPhone', 'contEmail',
                parsedJSON[i].rate, parsedJSON[i].totPrice);
            this.quoteList.push(tempQuote);
            // console.log(tempQuote);
        }


        // for each outer array row
        for (var i = 0 ; i < this.quoteList.length; i++) {
            var tr = document.createElement("tr");

            // for each inner array cell
            // create td then text, append
            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].id);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].requestDate);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].deliveryDate);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].gallonsRequested);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].suggestedPrice);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(this.quoteList[i].totalAmountDue);
            td.appendChild(txt);
            tr.appendChild(td);

            // append row to table
            document.getElementById("quoteHistoryTable").appendChild(tr);
        }
    }
}

{ // Functions that are called when on the requestQuote page
    // Function is called when the submit button is clicked on requestQuote Page
    function createQuote() {
        
        // grab all of the elements of the main form.
        var gallons = document.getElementById("gallonsRequested").value;
        var devDate = document.getElementById("deliveryDate").value;
        var devPerName = document.getElementById("deliveryContactPersonName").value;
        var devPerPhone = document.getElementById("deliveryContactPersonPhone").value;
        var devPerEmail = document.getElementById("deliveryContactPersonEmail").value;
        var sugPrice = document.getElementById("suggestedPricePerGallon").value;
        var totAmountDue = document.getElementById("totalAmountDue").value;
        var devLocation = document.getElementById("deliveryLocation");

        var validFieldList =[];
        validFieldList.push(devLocation);

        // JS considers an empty string to be false, if none are empty -> do validation
        if (gallons && devDate && devLocation && devPerName
            && devPerPhone && devPerEmail && sugPrice && totAmountDue){
            { // Double fields validation
                if (isDoubleValid(gallons)) {
                    console.log("gallonsRequested:" + gallons);
                    validFieldList.push(gallons);
                    document.getElementById("gallonsError").innerHTML = "";
                }
                else {
                    document.getElementById("gallonsError").innerHTML = "Gallons requested must be a number e.g. '##.##'";
                }

                if (isDoubleValid(totAmountDue)) {
                    console.log("totalAmountDue:" + totAmountDue);
                    validFieldList.push(totAmountDue);
                    document.getElementById("totAmtError").innerHTML = "";
                }
                else {
                    document.getElementById("totAmtError").innerHTML = "Total amount due must be a number e.g. '##.##'";
                }

                if (isDoubleValid(sugPrice)) {
                    console.log("suggestedPricePerGallon:" + sugPrice);
                    validFieldList.push(sugPrice);
                    document.getElementById("priceGalError").innerHTML = "";
                }
                else {
                    document.getElementById("priceGalError").innerHTML = "Suggested rate must be a number e.g. '##.##'";
                }
            }

            { // Testing the name for special characters
                var a = /^[a-zA-Z ]*$/i;
                if (a.test(devPerName)) {
                    console.log("deliveryPersonName: " + devPerName);
                    validFieldList.push(devPerName);
                    document.getElementById("dContactNameError").innerHTML = "";
                }
                else {
                    document.getElementById("dContactNameError").innerHTML = "Delivery contact name must only contain alphabet characters and cannot be blank";
                }
            }

            { // Testing the date for correct format
                var dateForm = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                if (dateForm.test(devDate)) {
                    console.log("deliveryDate: " + devDate);
                    validFieldList.push(devDate);
                    document.getElementById("dDateError").innerHTML = "";
                }
                else {
                    document.getElementById("dDateError").innerHTML = "Date must be formatted MM/DD/YYYY";
                }
            }

            { // Testing the phone number for correct format
                var phoneForm = /^\d{3}\-\d{3}\-\d{4}$/;

                if (phoneForm.test(devPerPhone)) {
                    console.log("deliveryPersonPhone: " + devPerPhone);
                    validFieldList.push(devPerPhone);
                    document.getElementById("dContactPhoneError").innerHTML = ""
                }
                else {
                    document.getElementById("dContactPhoneError").innerHTML = "Phone number must be formatted ###-###-####"
                }

            }

            { // Testing the email for correct formatting
                var delimiter = /[@]/;
                var length = devPerEmail.length;
                var subString = devPerEmail.substring(length - 4, length);

                if (delimiter.test(devPerEmail) && (subString === ".com" || subString === ".edu" || subString === ".gov")) {
                    console.log("deliveryPersonEmail: " + devPerEmail);
                    validFieldList.push(devPerEmail);
                    document.getElementById("dContactEmailError").innerHTML = ""
                }
                else {
                    document.getElementById("dContactEmailError").innerHTML = "Email must be formatted as XX@XX{.com, .gov, .edu}";
                }
            }

            // Done with error checking
            document.getElementById("subStatus").innerHTML = "";

            if (validFieldList.length === 8){
                alert("Your form has been successfully submitted, see console for output");
                // TODO: this is where we'll store the form to the db
            }
        }
        // The else to our top if; there are fields that are empty
        else {
            document.getElementById("subStatus").innerHTML = "Errors in form, all fields must be filled out.";
        }
} // End of createQuote

    // Function takes a double and checks it to make sure its a number that we can use
    function isDoubleValid(dToValidate) {
        dToValidate = parseFloat(dToValidate).toFixed(2);

        var decRegex = /^\d*\.\d{2}$/;

        return (decRegex.test(dToValidate));

    } // End isDoubleValid
}

{ // Functions that are called by clientInfo.html
    // Gets client based on ID from db and displays it
    function displayClient(id = 1) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/clients/' + id;
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            var parsedJSON = JSON.parse(JSON.stringify(Http.responseText));
            // TODO: Store this in session storage or something
            var currentClient = new ClientInformation(parsedJSON.clientId, parsedJSON.fullName,
                parsedJSON.address, parsedJSON.city, parsedJSON.state, parsedJSON.zipCode,
                parsedJSON.phone, parsedJSON.email);
        };
        document.getElementById("clientInfoName").innerHTML = this.fullName;
        document.getElementById("clientInfoAddress").innerHTML = this.address;
        document.getElementById("clientInfoPhone").innerHTML = this.phone;
        document.getElementById("clientInfoEmail").innerHTML = this.email;
    }
}

{ // Function that is run when quoteHistory is loaded
    function populateQuoteHistory(){
        //Constructing quote history object
        var clientQuoteHistory = new quoteHistory();

        //Populating rows from JSON
        clientQuoteHistory.getDataFromJSON();
    }
}
