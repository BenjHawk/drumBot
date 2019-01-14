const express = require('express');
const mariadb = require('mariadb/callback');
let db;

setTimeout(() => {
    db = mariadb.createConnection({
        host: 'db', //'localhost',
        user: 'root',
        password: 'test12',
        database: 'DrumbotDatabase'
    });

    db.connect(err => {
        if (err) {
            console.log("not connected due to error: " + err);
        } else {
            console.log("connected ! connection id is " + db.threadId);
        }
    });
}, 12000);

// auseinander ziehen; callbacks raus, Datenbankverbindung raus; Modeldatei für Datenbankabfragen; JSON web token express-jwt -> Authentifizierung


//Create DB
module.exports.createDatabase = function(req, res) {
    let sql = 'CREATE DATABASE DrumbotDatabase';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Database created');
    });
};

//username un dPW besser als primary key verwenden?
module.exports.createUserTable = function(req, res) {
    let sql = 'CREATE TABLE User(id int AUTO_INCREMENT, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User table created');
    });
}

module.exports.createLoopsTable = function(req, res) {
    let sql = 'CREATE TABLE Loops(id int AUTO_INCREMENT, name VARCHAR(255), tempo int, meter VARCHAR(255), sound VARCHAR(255), ButtonsSnare VARCHAR(40), ' +
        'ButtonsBass VARCHAR(40), ButtonsHiHat VARCHAR(40), ButtonsTom1 VARCHAR(40), ButtonsTom2 VARCHAR(40), ButtonsCymbal VARCHAR(40), ' +
        'VolumeSnare int, VolumeBass int, VolumeHiHat int, VolumeTom1 int, VolumeTom2 int, VolumeCymbal int, ' +
        'MasterVolume int, userId int, PRIMARY KEY (id), FOREIGN KEY (userId) REFERENCES User(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Loops table created');
    });
}