"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//necessary imports to work with leveldb
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
//class metric containing timestamp and it's value
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
//class containing all the GET and POST methods,
//that we are going to use to manipulate the DB
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    //'save' method - allows to insert metrics values into the database
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        //opening a write stream
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        //inserting metrics into the db
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + ":" + m.timestamp, value: m.value });
        });
        //ending stream
        stream.end();
    };
    //method to get all the metrics form the database
    MetricsHandler.prototype.getAll = function (callback) {
        //will regroup the metrics from the db, to output them later
        var metrics = [];
        //start reading the db
        this.db.createReadStream()
            //when we encounter the data
            .on('data', function (data) {
            //displaying the data in console
            console.log(data.key, '=', data.value);
            console.log(data.key.split(':'));
            //saving the part of key that we need
            var timestamp = data.key.split(':')[2];
            //creating a metric
            var metric = new Metric(timestamp, data.value);
            //adding it into the array of metrics, that will be displayed
            metrics.push(metric);
        })
            //when we encounter an error
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, null);
        })
            //closing the stream
            .on('close', function () {
            console.log('Stream closed');
        })
            //ending the stream
            .on('end', function () {
            console.log('Stream ended');
            //we return metrics array to display it
            callback(null, metrics);
        });
    };
    //method to get one metric from the database
    MetricsHandler.prototype.getOne = function (key, value, callback) {
        //will contain a metric to display
        var metric;
        //start reading the db
        this.db.createReadStream()
            .on('data', function (data) {
            var timestamp = data.key.split(':')[2];
            if (key == data.key.split(':')[1] && value == data.key.split(':')[2]) {
                console.log(data.key, '=', data.value);
                console.log(data.key.split(':'));
                metric = new Metric(timestamp, data.value);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, null);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, metric);
        });
    };
    //method to delete a metric from the db
    MetricsHandler.prototype.deleteMetric = function (key, value, callback) {
        //message to display
        var message;
        message: 'No such metric exists in database, delition is impossible';
        //deliting a metric from the table
        this.db.del("metric:" + key + ":" + value, function (err) {
            if (err) {
                console.log('No such metric exists in database, delition is impossible');
                callback(err, message);
            }
        });
        //changing the message if delition was successfull
        message = "The metric is deleted";
        //returning the message to display
        callback(null, message);
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
