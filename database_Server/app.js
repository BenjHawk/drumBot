const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test12',
    //database: 'DrumbotDatabase'
});

//Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
})

const app = express();

//Create DB
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Database created');
    });
});

//Create Table User
app.get('/creatusertable', (req, res) => {
    let sql = 'CREATE TABLE User(id int AUTO_INCREMENT, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User table created');
    });
});

//Create Table Loops
app.get('/creatlooptable', (req, res) => {
    let sql = 'CREATE TABLE Loop(id int AUTO_INCREMENT, name VARCHAR(255), tempo int, meter VARCHAR(255), sound VARCHAR(255), ' +
        'ButtonsSnare VARCHAR(40), ButtonsBass VARCHAR(40), ButtonsHiHat VARCHAR(40), ButtonsTom1 VARCHAR(40), ButtonsTom2 VARCHAR(40), ButtonsCymbal VARCHAR(40), ' +
        'VolumeSnare int, VolumeBass int, VolumeHiHat int, VolumeTom1 int, VolumeTom2 int, VolumeCymbal int, ' +
        'MasterVolume int, userId int, PRIMARY KEY (id), FOREIGN KEY userId REFERENCES id (User))';
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
            res.status(501).end();
        }
        console.log(result);
        res.status(200).json(result).end();
        res.send('user fetched');
    });
});

//Read Loops by User
app.get('/getloopbyuser/:userid', (req, res) => {
    let sql = `SELECT * FROM Loop WHERE userId =${req.params.userid}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
        res.send('Loops for a User fetched');
    });
});

//Read Loops by id
app.get('/getloopbyuser/:id', (req, res) => {
    let sql = `SELECT * FROM Loop WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
    });
});

//Update User
app.get('/updateuser/:id', (req, res) => {
    let sql = `UPDATE User SET ? WHERE id =${req.params.id}`;
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(200).end();
    });
});

//Update Loop
app.get('/updateloop/:id', (req, res) => {
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