const express = require('express');
const mariadb = require('mariadb/callback');
const db = require('./databaseConnection');

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

//Drop User Table
module.exports.dropUserTable = function(req, res) {
    let sql = 'DROP TABLE User';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Table User dropped');
    });
};

//Drop Loops Table
module.exports.dropLoopTable = function(req, res) {
    let sql = 'DROP TABLE Loops';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Table Loops dropped');
    });
};

//Drop DB
module.exports.dropDatabase = function(req, res) {
    let sql = 'DROP DATABASE DrumbotDatabase';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Database dropped');
    });
};


//username und PW besser als primary key verwenden?
module.exports.createUserTable = function(req, res) {
    let sql = 'CREATE TABLE User(id int AUTO_INCREMENT, name VARCHAR(255) UNIQUE, password VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User table created');
    });
}

module.exports.createLoopsTable = function(req, res) {
    let sql = 'CREATE TABLE Loops(id int AUTO_INCREMENT, name VARCHAR(255), tempo VARCHAR(255), meter VARCHAR(255), InstrumentTimes VARCHAR(500), ' +
        'VolumeCymbal decimal(2,1), VolumeHiHat decimal(2,1), VolumeSnare decimal(2,1), VolumeBass decimal(2,1), VolumeTom1 decimal(2,1), VolumeTom2 decimal(2,1), ' +
        'MasterVolume decimal(2,1), userId int, PRIMARY KEY (id), FOREIGN KEY (userId) REFERENCES User(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Loops table created');
    });
}