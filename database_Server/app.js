const express = require('express');
const bp = require('body-parser');
const dbSetup = require('./dbSetup');
const apiCallback = require('./apiCallbacks')
    //jwt

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

//DBSetup Operation
app.get('/createdb', (req, res) => {
    dbSetup.createDatabase(req, res);
});
app.get('/createusertable', (req, res) => {
    dbSetup.createUserTable(req, res);
});
app.get('/createlooptable', (req, res) => {
    dbSetup.createLoopsTable(req, res);
});


/*Implementation of the CRUD operations for the User and Loop table*/
app.post('/createuser/', (req, res) => {
    apiCallback.createUser(req, res);
});
app.post('/createloop/', (req, res) => {
    apiCallback.createLoop(req, res);
});
app.get('/getusers/:id', (req, res) => {
    apiCallback.getUser(req, res);
});
app.get('/getloopbyuser/:userid', (req, res) => {
    apiCallback.getLoopsByUser(req, res);
});
app.get('/getloopbyid/:id', (req, res) => {
    apiCallback.getLoopsById(req, res);
});
app.post('/updateuser/:id', (req, res) => {
    apiCallback.updateUser(req, res);
});
app.post('/updateloop/:id', (req, res) => {
    apiCallback.updateLoop(req, res);
});
app.get('/deleteuser/:id', (req, res) => {
    apiCallback.deleteUser(req, res);
});
app.get('/deleteloop/:id', (req, res) => {
    apiCallback.deleteLoop(req, res);
});


app.listen('4040', () => {
    console.log('server started on port 4040');
});
app.use(bp.text());