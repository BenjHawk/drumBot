const express = require('express');
const mariadb = require('mariadb/callback');

let db;

db = mariadb.createConnection({
    host: 'db', //'localhost'
    user: 'root',
    password: 'test12',
    database: 'DrumbotDatabase'
});

setTimeout(() => {
    db.connect(err => {
        if (err) {
            console.log("not connected due to error: " + err);
        } else {
            console.log("connected ! connection id is " + db.threadId);
        }
    });
}, 8000);


module.exports = db;