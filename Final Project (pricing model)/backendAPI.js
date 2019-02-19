const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const SqlString = require('sqlstring');

const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/clients/:id', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    if (req.params.id === 'undefined') {
        res.send();
    }
    else {
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM clientinformation WHERE clientId=" + req.params.id, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        });
    }
});

// Pricing module, eq = Suggested Price = Current Price + Margin
// Where,
// Current price per gallon = $2.19 always
// Margin =  Current Price * (Location Factor + Rate History Factor+ Gallons Requested Factor + Company Profit Factor + Rate Fluctuation)
// Consider these factors:
// Location Factor = 2% for in state, 4% for out of state.
// Rate History Factor = 2% if client requested fuel before, 3% if no history
// Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
// Company Profit Factor = 5% always
// Rate Fluctuation = 4% always
app.get('/api/pricing/:id/:gallonsReq/:state', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    if (req.params.id === 'undefined') {
        res.send();
    }
    else {
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM fuelquote WHERE clientId=" + req.params.id, function (err, result) {
                if (err) throw err;
                const CURRENT_PRICE = 2.19;
                const COMPANY_PROFIT = .05;
                const RATE_FLUX = .04;
                let locationFact = (req.params.state === 'TX') ? .02 : .04;
                let rateHistoryFact = (result.length > 0) ? .02 : .03;
                let gallonsReqFact = (req.params.gallonsReq > 1000) ? .02 : .03;

                let lowRate = CURRENT_PRICE + CURRENT_PRICE * (COMPANY_PROFIT + RATE_FLUX +
                    locationFact + rateHistoryFact + gallonsReqFact);

                let suggestedPrice = lowRate * 100;
                suggestedPrice = Math.ceil(suggestedPrice);
                suggestedPrice = suggestedPrice/100
                res.send({suggestedPrice});
            });
        });
    }
});

// Get client ID by name
app.get('/api/getIdByName/:name', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    if (req.params.id === 'undefined') {
        res.send();
    }
    else {
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT clientId FROM clientinformation WHERE fullName=" + SqlString.escape(req.params.name), function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        });
    }
});

app.get('/api/fuelquotes/:id', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    if (req.params.id === 'undefined'){
        res.send();
    }
    else{
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM fuelquote WHERE clientId=" + req.params.id, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            });
        });
    }
});

app.post('/api/fuelquotes/addquote', function (req, res) {
    //Retrieving data:
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });

    let sql = ("INSERT INTO fuelQuote (clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, " +
        "deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, " +
        "deliveryContactEmail, suggestedPrice, totalAmountDue) VALUES (" + SqlString.escape(req.body.clientId) + ', '
        + SqlString.escape(req.body.gallonsRequested) + ', ' + SqlString.escape(req.body.requestDate) + ', '
        + SqlString.escape(req.body.deliveryDate) + ', ' + SqlString.escape(req.body.deliveryAddress) + ', '
        + SqlString.escape(req.body.deliveryCity) + ', ' + SqlString.escape(req.body.deliveryState) + ', '
        + SqlString.escape(req.body.deliveryZipCode) + ', ' + SqlString.escape(req.body.deliveryContactName) + ', '
        + SqlString.escape(req.body.deliveryContactPhone) + ', ' + SqlString.escape(req.body.deliveryContactEmail) + ', '
        + SqlString.escape(req.body.suggestedPrice) + ', ' + SqlString.escape(req.body.totalAmountDue) + ')');
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    });

    res.send();
});

app.post('/api/clients/addclient', function (req, res) {
    //Retrieving data:
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });

    let sql = ("INSERT INTO clientinformation (fullName, address, city, state, zipCode, phone, email) " +
        "VALUES (" + SqlString.escape(req.body.fullName) + ', ' + SqlString.escape(req.body.address) + ', ' +
        SqlString.escape(req.body.city) + ', ' + SqlString.escape(req.body.state) + ', ' +
        SqlString.escape(req.body.zipCode) + ', ' + SqlString.escape(req.body.phone) + ', ' +
        SqlString.escape(req.body.email) + ')');
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err) {
            if (err) throw err;
        });
        sql = ("SELECT clientId FROM clientinformation WHERE fullName=" + SqlString.escape(req.body.fullname));
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.put('/api/clients', function (req, res) {
    // Retrieving new client:
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    }); // fullName address phone email
    let sql = ("UPDATE clientinformation SET fullName= " + SqlString.escape(req.body.fullName)
        + ", address= " + SqlString.escape(req.body.address)
        + ", phone= " + SqlString.escape(req.body.phone)
        + ", email= " + SqlString.escape(req.body.email)
        + " WHERE clientId = " + SqlString.escape(req.body.clientId));
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    });

});

app.listen(3000, () => console.log('Listening on 3000...'));

// TODO: Validate new client and updated client info, get City State, Zip from user in request quote.
// TODO: Implement pricing scheme from Dr. Raj
