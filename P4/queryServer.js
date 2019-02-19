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
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM clientinformation WHERE clientId=" + req.params.id, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.get('/api/fuelquotes/:id', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM fuelquote WHERE clientId=" + req.params.id, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
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

// TODO: Get City, State, and Zip from user in request quote page. Allow for the adding of a new user
// TODO: Validate new client and updated client info. Implement pricing scheme from Dr. Raj
// TODO: Add a login page and have all other pages redirect there until a login occurs, whether it be a new user or not
