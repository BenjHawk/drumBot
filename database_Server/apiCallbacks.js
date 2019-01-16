const express = require('express');
const mariadb = require('mariadb/callback');
const db = require('./databaseConnection');
const bp = require('body-parser');

const app = express();
app.use(bp.json());


module.exports.createUser = function(req, res) {
    let post = req.body;
    let values = [];
    values.push(post.name, post.password);

    let sql = 'INSERT INTO User (name, password) VALUES (?, ?) ';
    let query = db.query(sql, values, (err, result) => {
        if (err) {
            res.status(501).end();
            console.log(err);
        }
        res.status(201).end();
    });
};

module.exports.createLoop = function(req, res) {
    let post = req.body;

    let values = [];
    values.push(post.tempo, post.meter, post.instrumentTimes, post.volumeCymbal,
        post.volumeHiHat, post.volumeSnare, post.volumeBass, post.volumeTom1, post.volumeTom2, post.masterVolume, post.userId);
    console.log(values);

    let sql = 'INSERT INTO Loops (tempo, meter, InstrumentTimes,' +
        ' VolumeCymbal, VolumeHiHat, VolumeSnare, VolumeBass, VolumeTom1, VolumeTom2, MasterVolume, userId)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    let query = db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(501).end();
        }
        res.status(201).end();
    });
}

module.exports.getUser = function(req, res) {
    let userId = req.params.id;
    let sql = `SELECT * FROM User WHERE id = ?`;
    let query = db.query(sql, userId, (err, result) => {
        if (err) {
            res.status(404).end();
            console.log(err);
        }
        //console.log("Response to be send" + result);
        res.status(200).json(result).end();
    });
}

module.exports.getLoopsByUser = function(req, res) {
    let userId = req.params.userid;
    let sql = `SELECT * FROM Loops WHERE userId = ?`;
    let query = db.query(sql, userId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
    });
}

module.exports.getLoopsById = function(res, req) {
    let Id = req.params.id;
    let sql = `SELECT * FROM Loops WHERE id = ?`;
    let query = db.query(sql, Id, (err, result) => {
        if (err) {
            res.status(404).end();
        }
        res.status(200).json(result).end();
    });
}

module.exports.updateUser = function(res, req) {
    let post = req.body;
    let user = req.params.id;
    let sql = `UPDATE User SET ? WHERE id = ?`;
    let query = db.query(sql, [post, user], (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(200).end();
    });
}

module.exports.updateLoop = function(res, req) {
    let post = req.body;
    let sql = `UPDATE Loop SET ? WHERE id =${req.params.id}`;
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(200).end();
    });
}

module.exports.deleteUser = function(res, req) {
    let userId = req.params.id;
    let sql = `DELETE FROM User WHERE id = ?`;
    let query = db.query(sql, userId, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
}

module.exports.deleteLoop = function(res, req) {
    let Id = req.params.id;
    let sql = `DELETE FROM Loop WHERE id = ?`;
    let query = db.query(sql, Id, (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
}