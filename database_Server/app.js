const express = require('express');
const mysql = require('mysql');
const bp = require('body-parser');


//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test12',
    database: 'DrumbotDatabase'
});

// auseinander ziehen; callbacks raus, Datenbankverbindung raus; Modeldatei für Datenbankabfragen; JSON web token express-jwt -> Authentifizierung
//Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
})

const app = express();
// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bp.json());

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE DrumbotDatabase';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Database created');
    });
});

//Create Table User
app.get('/createusertable', (req, res) => {
    let sql = 'CREATE TABLE User(id int AUTO_INCREMENT, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User table created');
    });
});

//Create Table Loops
app.get('/createlooptable', (req, res) => {
    let sql = 'CREATE TABLE Loops(id int AUTO_INCREMENT, name VARCHAR(255), tempo int, meter VARCHAR(255), sound VARCHAR(255), ButtonsSnare VARCHAR(40), ' +
        'ButtonsBass VARCHAR(40), ButtonsHiHat VARCHAR(40), ButtonsTom1 VARCHAR(40), ButtonsTom2 VARCHAR(40), ButtonsCymbal VARCHAR(40), ' +
        'VolumeSnare int, VolumeBass int, VolumeHiHat int, VolumeTom1 int, VolumeTom2 int, VolumeCymbal int, ' +
        'MasterVolume int, userId int, PRIMARY KEY (id), FOREIGN KEY (userId) REFERENCES User(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User table created');
    });
});


/*Implementation of the CRUD operations for the User and Loop table*/

//Create User
app.post('/createuser/', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO User SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(201).end();
    });
});

//Create Loop
app.post('/createloop/', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO Loop SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(201).end();
    });
});

//Read User
app.get('/getusers/:id', (req, res) => {
    let sql = `SELECT * FROM User WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(404).end();
        }
        console.log("Response to be send");
        res.status(200).json(result).end();
    });
});

//Read Loops by User
app.get('/getloopbyuser/:userid', (req, res) => {
    let sql = `SELECT * FROM Loop WHERE userId =${req.params.userid}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(404).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
        //res.send('Loops for a User fetched');
    });
});

//Read Loops by id
app.get('/getloopbyid/:id', (req, res) => {
    let sql = `SELECT * FROM Loop WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(404).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
    });
});

//Update User
app.post('/updateuser/:id', (req, res) => {
    let post = req.body;
    let sql = `UPDATE User SET ? WHERE id =${req.params.id}`;
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(200).end();
    });
});

//Update Loop
app.post('/updateloop/:id', (req, res) => {
    let post = req.body;
    let sql = `UPDATE Loop SET ? WHERE id =${req.params.id}`;
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(200).end();
    });
});

//delete user
app.get('/deleteuser/:id', (req, res) => {
    let sql = `DELETE FROM User WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
});

//delete loop
app.get('/deleteloop/:id', (req, res) => {
    let sql = `DELETE FROM Loop WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
});

app.listen('4040', () => {
    console.log('server started on port 4040');
});
app.use(bp.text());