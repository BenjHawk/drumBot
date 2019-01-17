const express = require('express');
const bp = require('body-parser');
const dbSetup = require('./dbSetup');
const apiCallback = require('./apiCallbacks');
const authentication = require('./authentication');

const app = express();
// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
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

//Only for dev purpose; comment out in the final version
app.get('/dropdatabase', (req, res) => {
    dbSetup.dropDatabase();
});

app.get('/dropdusertable', (req, res) => {
    dbSetup.dropUserTable();
});

app.get('/droplooptable', (req, res) => {
    dbSetup.dropLoopTable();
});

//endpoint for login via JWT authentication
app.post('/login', (req, res) => {
    authentication.loginRoute(req, res);
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
app.get('/getloopidsbyuser/:userid', (req, res) => {
    apiCallback.getLoopsByUser(req, res);
});
app.get('/getloopbyid/:id', (req, res) => {
    apiCallback.getLoopsById(req, res);
});
/*app.post('/updateuser/:id', (req, res) => {
    apiCallback.updateUser(req, res);
});*/
app.post('/updateloop/:id', (req, res) => {
    apiCallback.updateLoop(req, res);
});
/*app.get('/deleteuser/:id', (req, res) => {
    apiCallback.deleteUser(req, res);
});*/
app.get('/deleteloop/:id', authentication.checkIfAuthenticated, (req, res) => {
    apiCallback.deleteLoop(req, res);
});

//dummy endpoint for test purposes
app.get('/dummy', authentication.checkIfAuthenticated, (req, res) => {
    console.log("dummy endpoint visited");
});

app.listen('4040', () => {
    console.log('server started on port 4040');
});