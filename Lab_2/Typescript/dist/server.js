"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = process.env.PORT || '8080';
/*modified*/
//import metrics.js
var metrics = require('./metrics.js');
//for jquery and bootstrap
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//for EJS
//second "/view" is the folder containing .ejs files
app.set('views', __dirname + "/view");
//set the view engine to ejs
app.set('view engine', 'ejs');
//at`/` displaying a home page with somw instructions
app.get('/', function (req, res) {
    res.render('home.ejs');
    res.end();
});
//displaying a main interractive page
app.get('/hello/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
    res.end();
});
//adding metrics
app.get('/metrics.json', function (req, res) {
    metrics.get(function (err, data) {
        if (err)
            throw err;
        res.status(200).json(data);
    });
});
//listen to the port
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
