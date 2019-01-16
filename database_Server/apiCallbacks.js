const express = require('express');
const mariadb = require('mariadb/callback');
const db = require('./databaseConnection');

module.exports.createLoop = function(req, res) {
    let post = req.body;
    let values = [];
    values.push(post[0].name, post[0].tempo, post[0].meter, post[0].sound, post[0].ButtonsSnare, post[0].ButtonsBass,
        post[0].ButtonsHiHat, post[0].ButtonsTom1, post[0].ButtonsTom2, post[0].ButtonsCymbal, post[0].VolumeSnare,
        post[0].VolumeBass, post[0].VolumeHiHat, post[0].VolumeTom1, post[0].VolumeTom2, post[0].VolumeCymbal);

    let sql = 'INSERT INTO Loops (name, tempo, meter, sound, ButtonsSnare, ButtonsBass, ButtonsHiHat, ButtonsTom1,' +
        +' ButtonsTom2, ButtonsCymbal, VolumeSnare, VolumeBass, VolumeHiHat, VolumeTom1, VolumeTom2, VolumeCymbal)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    let query = db.query(sql, values, (err, result) => {
        if (err) {
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
    let userId = req.params.id;
    let sql = `SELECT * FROM Loop WHERE userId = ?`;
    let query = db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(404).end();
        }
        //console.log(result);
        res.status(200).json(result).end();
    });
}

module.exports.getLoopsById = function(res, req) {
    let Id = req.params.id;
    let sql = `SELECT * FROM Loop WHERE id = ?`;
    let query = db.query(sql, [Id], (err, result) => {
        if (err) {
            res.status(404).end();
        }
        res.status(200).json(result).end();
    });
}

module.exports.updateUser = function(res, req) {
    let post = req.body;
    let sql = `UPDATE User SET ? WHERE id =${req.params.id}`;
    let query = db.query(sql, post, (err, result) => {
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
    let query = db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
}

module.exports.deleteLoop = function(res, req) {
    let Id = req.params.id;
    let sql = `DELETE FROM Loop WHERE id = ?`;
    let query = db.query(sql, [Id], (err, result) => {
        if (err) {
            res.status(501).end();
        }
        res.status(204).end();
    });
}