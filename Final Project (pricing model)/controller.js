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
        this.zipCode = zipCode;
        this.phone = phone;
        this.email = email;
    }

}

// FUNCTIONAL \\
class Quote {

    constructor(id, clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue) {
        this.quoteId = id;
        this.clientId = clientId;
        this.gallonsRequested = gallonsRequested;
        this.requestDate = requestDate;
        this.deliveryDate = deliveryDate;
        this.deliveryAddress = deliveryAddress;
        this.deliveryCity = deliveryCity;
        this.deliveryState = deliveryState;
        this.deliveryZipCode = deliveryZipCode;
        this.deliveryContactName = deliveryContactName;
        this.deliveryContactPhone = deliveryContactPhone;
        this.deliveryContactEmail = deliveryContactEmail;
        this.suggestedPrice = suggestedPrice;
        this.totalAmountDue = totalAmountDue;
    }
}

// FUNCTIONAL \\
class quoteHistory {
    constructor() {
        // Create and array of quotes
        this.quoteList = [];
    }
}

{ // Functions that are related to displaying or creating quotes
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
        var devLocation = document.getElementById("deliveryLocation").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var zip = document.getElementById("zip").value;

        var validFieldList = [];
        validFieldList.push(devLocation);

        // JS considers an empty string to be false, if none are empty -> do validation
        if (gallons && devDate && devLocation && devPerName
            && devPerPhone && devPerEmail && sugPrice && totAmountDue) {
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
                    realDevDate = devDate.substr(6, 10) + '-' + devDate.substr(0, 2) + '-' + devDate.substr(3, 2) + ' 00:00:00';
                    validFieldList.push(realDevDate);//devDate.replace(/\//g, '-'));
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
                    validFieldList.push(devPerPhone.replace(/-/g, ''));
                    document.getElementById("dContactPhoneError").innerHTML = "";
                }
                else {
                    document.getElementById("dContactPhoneError").innerHTML = "Phone number must be formatted ###-###-####";
                }

            }

            { // Testing the email for correct formatting
                var delimiter = /[@]/;
                var length = devPerEmail.length;
                var subString = devPerEmail.substring(length - 4, length);

                if (delimiter.test(devPerEmail) && (subString === ".com" || subString === ".edu" || subString === ".gov")) {
                    console.log("deliveryPersonEmail: " + devPerEmail);
                    validFieldList.push(devPerEmail);
                    document.getElementById("dContactEmailError").innerHTML = "";
                }
                else {
                    document.getElementById("dContactEmailError").innerHTML = "Email must be formatted as XX@XX{.com, .gov, .edu}";
                }
            }

            { // City, State, ZIP
                validFieldList.push(city);
                if (state.length === 2){
                    validFieldList.push(state);
                    document.getElementById("stateError").innerHTML = "";
                }
                else{
                    document.getElementById("stateError").innerHTML = "State must be in two letter format e.g. 'TX'";
                }
                if (zip.length === 5){
                    validFieldList.push(zip);
                    document.getElementById("zipError").innerHTML = "";
                }
            }

            // Done with error checking
            document.getElementById("subStatus").innerHTML = "";

            if (validFieldList.length === 11) {
                // Getting today's date
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                // SQL wants it like this 2018-11-15 00:00:00
                today = yyyy + '-' + mm + '-' + dd + ' 00:00:00';

                quoteToSend = new Quote('NextID', sessionStorage.clientId, validFieldList[1], today, validFieldList[5],
                    validFieldList[0], validFieldList[8], validFieldList[9], validFieldList[10], validFieldList[4],
                    validFieldList[6], validFieldList[7], validFieldList[3], validFieldList[2]);

                fetch('http://localhost:3000/api/fuelquotes/addquote', {
                    method: 'POST',
                    body: JSON.stringify(quoteToSend),
                    headers: {'Content-Type': 'application/json'}
                });

                window.location = '#';
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

    function populateQuoteHistory(id = sessionStorage.clientId) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/fuelquotes/' + id;
        Http.open("GET", url);
        Http.send();

        var parsedJSON = '';
        var currentClient = '';

        Http.onreadystatechange = function () {
            if (this.readyState == 4 && parsedJSON === '') {
                parsedJSON = JSON.parse(Http.responseText);
                displayQuoteHistory(parsedJSON);
            }
        };
    }

    function displayQuoteHistory(parsedJSON) {
        historyOfQuotes = new quoteHistory();
        for (var i = 0; i < parsedJSON.length; i++) {
            var tempQuote = new Quote(parsedJSON[i].quoteId, parsedJSON[i].clientId, parsedJSON[i].gallonsRequested,
                parsedJSON[i].requestDate, parsedJSON[i].deliveryDate, parsedJSON[i].deliveryAddress,
                parsedJSON[i].deliveryCity, parsedJSON[i].deliveryState, parsedJSON[i].deliveryZipCode,
                parsedJSON[i].deliveryContactName, parsedJSON[i].deliveryContactPhone,
                parsedJSON[i].deliveryContactEmail, parsedJSON[i].suggestedPrice, parsedJSON[i].totalAmountDue);

            historyOfQuotes.quoteList.push(tempQuote);
        }

        // for each outer array row
        for (var i = 0; i < historyOfQuotes.quoteList.length; i++) {
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].quoteId);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].requestDate.substr(0, 10));
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].deliveryDate.substr(0, 10));
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].gallonsRequested);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].suggestedPrice);
            td.appendChild(txt);
            tr.appendChild(td);

            var td = document.createElement("td");
            var txt = document.createTextNode(historyOfQuotes.quoteList[i].totalAmountDue);
            td.appendChild(txt);
            tr.appendChild(td);

            // append row to table
            document.getElementById("quoteHistoryTable").appendChild(tr);
        }
    }
    
    function getSuggestedPrice(id = sessionStorage.clientId) {
        let state = document.getElementById("state").value;
        let gallonsReq = document.getElementById("gallonsRequested").value;

        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/pricing/' + id + '/' + gallonsReq + '/' + state;
        Http.open("GET", url);
        Http.send();

        console.log(url);

        Http.onreadystatechange = function () {
            if (this.readyState === 4 && Http.status === 200) {
                let rate = JSON.parse(Http.responseText).suggestedPrice;

                document.getElementById("suggestedPricePerGallon").value = rate;
                document.getElementById("totalAmountDue").value = (gallonsReq * rate).toFixed(2);
            }
        };

        document.getElementById("gallonsRequested").disabled = true;
        document.getElementById("deliveryDate").disabled = true;
        document.getElementById("deliveryContactPersonName").disabled = true;
        document.getElementById("deliveryContactPersonPhone").disabled = true;
        document.getElementById("deliveryContactPersonEmail").disabled = true;
        document.getElementById("deliveryLocation").disabled = true;
        document.getElementById("city").disabled = true;
        document.getElementById("state").disabled = true;
        document.getElementById("zip").disabled = true;
    }

    function resetPriceForm(){
        document.getElementById("suggestedPricePerGallon").value = null;
        document.getElementById("totalAmountDue").value = null;
        
        document.getElementById("gallonsRequested").disabled = false;
        document.getElementById("deliveryDate").disabled = false;
        document.getElementById("deliveryContactPersonName").disabled = false;
        document.getElementById("deliveryContactPersonPhone").disabled = false;
        document.getElementById("deliveryContactPersonEmail").disabled = false;
        document.getElementById("deliveryLocation").disabled = false;
        document.getElementById("city").disabled = false;
        document.getElementById("state").disabled = false;
        document.getElementById("zip").disabled = false;
    }
}

{ // Functions that are related to displaying, creating, or modifying clients
    // Gets client based on ID from db and displays it
    function displayClient(id = sessionStorage.clientId) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/clients/' + id;
        Http.open("GET", url);
        Http.send();

        var parsedJSON = '';
        var currentClient = '';

        Http.onreadystatechange = function () {
            if (this.readyState == 4 && Http.responseText !== '[]') {
                parsedJSON = JSON.parse(Http.responseText);
                currentClient = new ClientInformation(parsedJSON[0].clientId, parsedJSON[0].fullName,
                    parsedJSON[0].address, parsedJSON[0].city, parsedJSON[0].state, parsedJSON[0].zipCode,
                    parsedJSON[0].phone, parsedJSON[0].email);
                document.getElementById("clientInfoName").innerHTML = parsedJSON[0].fullName;
                document.getElementById("clientInfoAddress").innerHTML = parsedJSON[0].address;
                document.getElementById("clientInfoPhone").innerHTML = formatPhone(parsedJSON[0].phone);
                document.getElementById("clientInfoEmail").innerHTML = parsedJSON[0].email;
            }
        };
    }

    // Changes client and reflects that in session storage
    function changeClient() {
        sessionStorage.clientId = document.getElementById("newClientId").value;
        displayClient();
    }

    // Adds a new client to the database
    function addClient() {
        let fullName = document.getElementById("fullName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zipCode = document.getElementById('zip').value;
        let phone = (document.getElementById("phone").value).replace(/-/g, '');
        let email = document.getElementById("email").value;

        let clientJSON = JSON.stringify(new ClientInformation(1, fullName, address,
            city, state, zipCode, phone, email));

        fetch('http://localhost:3000/api/clients/addclient', {
            method: 'POST',
            body: clientJSON,
            headers: {'Content-Type': 'application/json'}
        });

        alert('You have been added to the client list, you now must log in.');
        window.location = './requestQuote.html';
    }

    // Verifies a client is in the database and sets them to active in the session, TODO: needs to do a name search too
    function logInClient(id = document.getElementById('clientID').value, name = document.getElementById('fullName').value) {
        const Http = new XMLHttpRequest();
        let url = (id !== '') ? 'http://localhost:3000/api/clients/' + id : 'http://localhost:3000/api/getIdByName/' + name;
        Http.open("GET", url);
        Http.send();

        if (id !== ''){
            Http.onreadystatechange = function () {
                if (this.readyState === 4) {
                    sessionStorage.clientId = id;
                    alert('You have been logged in, returning you to where you were...');
                    window.location = sessionStorage.previousPage;
                }
            };
        }
        else{
            Http.onreadystatechange = function () {
                if (this.readyState === 4) {
                    sessionStorage.clientId = JSON.parse(Http.responseText)[0].clientId;
                    alert('You have been logged in, returning you to where you were...');
                    window.location = sessionStorage.previousPage;
                }
            };
        }
    }

    // Sends an update to the database with new client information keyed to a client id
    function modifyClient() {
        let newFullName = document.getElementById("fullName").value;
        let newAddress = document.getElementById("address").value;
        let newPhone = (document.getElementById("phone").value).replace(/-/g, '');
        let newEmail = document.getElementById("email").value;

        let clientJSON = JSON.stringify(new ClientInformation(sessionStorage.clientId, newFullName, newAddress,
            'city', 'state', 'zip', newPhone, newEmail));

        fetch('http://localhost:3000/api/clients', {
            method: 'PUT',
            body: clientJSON,
            headers: {'Content-Type': 'application/json'}
        });
    }

    // Goes to the database and retrieves the current client and puts that data into the form on the modify client page
    function loadClientIntoModifyForm(id = sessionStorage.clientId) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/clients/' + id;
        Http.open("GET", url);
        Http.send();

        var parsedJSON = '';
        var currentClient = '';

        Http.onreadystatechange = function () {
            if (this.readyState == 4 && parsedJSON === '') {
                parsedJSON = JSON.parse(Http.responseText);
                currentClient = new ClientInformation(parsedJSON[0].clientId, parsedJSON[0].fullName,
                    parsedJSON[0].address, parsedJSON[0].city, parsedJSON[0].state, parsedJSON[0].zipCode,
                    parsedJSON[0].phone, parsedJSON[0].email);
                document.getElementById("fullName").value = parsedJSON[0].fullName;
                document.getElementById("address").value = parsedJSON[0].address;
                document.getElementById("phone").value = formatPhone(parsedJSON[0].phone);
                document.getElementById("email").value = parsedJSON[0].email;
            }
        };
    }
}


{ // Additional general purpose functions
    // Takes a phone number in xxxxxxxxxx and returns it in xxx-xxx-xxxx
    function formatPhone(phoneNum) {
        phoneNum = phoneNum.toString();
        formattedPhone = phoneNum.substr(0, 3) + '-' + phoneNum.substr(3, 3) + '-' + phoneNum.substr(6, 4);
        return formattedPhone;
    }

    // Verifies that there is an active user, if not it redirects to the login page
    function verifyClientIsLoggedIn() {
        if (document.title !== 'Client Login' & document.title !== 'Add New Client') {
            if (typeof sessionStorage.clientId === 'undefined') {
                sessionStorage.previousPage = window.location;
                window.location = './clientLogin.html';
            }
        }
    }
}

// Gets run before any scripts on any page connected to controller.js
sessionStorage.previousPage = './requestQuote.html';
verifyClientIsLoggedIn();


