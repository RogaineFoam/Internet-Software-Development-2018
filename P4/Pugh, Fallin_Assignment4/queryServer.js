const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const SqlString = require('sqlstring');

const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/clients/:id', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'CS3320',
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM clientinformation WHERE clientId=" + req.params.id, function (err, result, fields) {
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
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM fuelquote WHERE clientId=" + req.params.id, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.post('/api/fuelquotes/addquote', function (req, res) {
    //Retrieving data:
    let parsedJSON = req.body;//JSON.parse(req.body);
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: 'CS3320',
        });
        console.log(req.body);
        let sql =("INSERT INTO fuelQuote (clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, " +
            "deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, " +
            "deliveryContactEmail, suggestedPrice, totalAmountDue) VALUES (" + SqlString.escape(req.body.clientId) + ', '
            + SqlString.escape(req.body.gallonsRequested) +', ' + SqlString.escape(req.body.requestDate) + ', '
            + SqlString.escape(req.body.deliveryDate) + ', ' + SqlString.escape(req.body.deliveryAddress) + ', '
            + SqlString.escape(req.body.deliveryCity) + ', ' + SqlString.escape(req.body.deliveryState) + ', '
            + SqlString.escape(req.body.deliveryZipCode) + ', ' + SqlString.escape(req.body.deliveryContactName) + ', '
            + SqlString.escape(req.body.deliveryContactPhone) + ', ' + SqlString.escape(req.body.deliveryContactEmail) + ', '
            + SqlString.escape(req.body.suggestedPrice) + ', ' + SqlString.escape(req.body.totalAmountDue) + ')');
        con.connect(function(err) {
            if (err) throw err;
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        });

    res.send();
});

app.listen(3000, () => console.log('Listening on 3000...'));

// TODO: Cookie the browser to keep client id between windows
// TODO: Create a client modification page
// TODO: Allow the user to select client
// TODO: Get City, State, and Zip from user in request quote page
