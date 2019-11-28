"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyparser = require("body-parser");
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '8080';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
/*modified*/
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
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
//post request
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('ok');
    });
});
//pout le dm
app.get('/metrics/', function (req, res) {
    //define a route 
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        /* //instead
        res.status(200).send(resul)
        //to give the response
        res.end()*/
        //put
        res.json(result);
    });
});
//getOne
app.get('/metrics/:id/:number', function (req, res) {
    //define a route 
    dbMet.getOne(req.params.id, req.params.number, function (err, result) {
        if (err)
            throw err;
        /* //instead
        res.status(200).send(resul)
        //to give the response
        res.end()*/
        //put
        if (result != 0)
            res.json(result);
        else
            res.send('No such metric exists');
    });
});
app.post('/metrics/:id/:number', function (req, res) {
    dbMet.deleteMetric(req.params.id, req.params.number, function (err, result) {
        if (err)
            throw err;
        res.status(200).send('ok');
    });
});
///////////////
// adding metrics
// app.get('/metrics.json', (req: any, res: any) => {
// 	MetricsHandler.get((err: any, data: any) => {
// 		if(err) throw err
//     	res.status(200).json(data)
//   	})
// })
//listen to the port
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
