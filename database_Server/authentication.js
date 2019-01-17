const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const mariadb = require('mariadb/callback');
const db = require('./databaseConnection');

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

async function validateUsernameAndPassword(username, password) {
    let resPW;
    let bool = false;

    let sql = `SELECT password FROM User WHERE name = ?`;
    let query = await db.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err);
            return bool;
        }
        resPW = result[0].password;
        if (resPW === password) {
            bool = true;
            return bool;
        }
        return bool;
    });
}

function findUserIdForUsername(username) {
    return new Promise(function(resolve, reject) {
        let userId;
        let sql = `SELECT id FROM User WHERE name = ?`;

        let query = db.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                userId = result[0].id;
                resolve(userId);
            }
        });
    });
};

module.exports.loginRoute = function login(req, res) {

    let username = req.body.username;
    let password = req.body.password;
    let RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

    if (validateUsernameAndPassword(username, password)) {

        findUserIdForUsername(username)
            .then(function(userId) {


                let user = ' ' + userId + ' ';
                let payload = { Id: user };

                const jwtBearerToken = jwt.sign(payload, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 3600,
                    subject: '' + userId
                });

                res.status(200).json({
                    idToken: jwtBearerToken,
                    expiresIn: 3600,
                    Id: '' + userId
                });

            }).catch(function(err) {
                console.log(err);
                res.sendStatus(401);
            });
    }
}

module.exports.checkIfAuthenticated = expressJWT({
    secret: RSA_PUBLIC_KEY
});