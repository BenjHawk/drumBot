const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

let validateUsernameAndPassword = function(username, password) {
    let results = [];
    let resPW;

    let sql = `SELECT password FROM User WHERE username = ?`;
    let query = db.query(sql, username, (err, result) => {
        if (err) {
            res.status(404).end();
            console.log(err);
        }

        results = JSON.stringify(result);
        resPW = results[0].password;
        if (resPW === password) {
            return true;
        }
        return false;
    });
}

let findUserIdForUsername = function(username) {
    let results = [];
    let userId;

    let sql = `SELECT id FROM User WHERE username = ?`;
    let query = db.query(sql, username, (err, result) => {
        if (err) {
            res.status(404).end();
            console.log(err);
        }
        results = JSON.stringify(result);
        userId = results[0].id;
        console.log(userId);
        return userId;
    });
};

module.exports.loginRoute = function login(req, res) {

    let username = req.body.username;
    let password = req.body.password;
    let RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

    if (validateUsernameAndPassword(username, password)) {
        const userId = findUserIdForUsername(username);

        const jwtBearerToken = jwt.sign(userId, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: userId
        })

        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 120,
            Id: userId
        });

        // send the JWT back to the user
        // TODO - multiple options available                              
    } else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}

module.exports.checkIfAuthenticated = expressJWT({
    secret: RSA_PUBLIC_KEY
});