//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var path = require('path');
var express = require('express');

// database related variables
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url =   'mongodb://test:123456@ds021984.mlab.com:21984/copundb';
var resultDeals = [];
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var app = express();

app.use(express.static(path.resolve(__dirname, 'app')));

app.get('/find',function(req,res){
  MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
    console.log("connected to the database");
    var results = db.collection('Deals').find({ 'title' : {'$regex': '.*' +req.query.search + '.*'}}).limit(5).each(function(err,doc){
        resultDeals.push(doc);
    });
    console.log(JSON.stringify(resultDeals));
    res.end(JSON.stringify(resultDeals));
  });
});


var server = app.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
