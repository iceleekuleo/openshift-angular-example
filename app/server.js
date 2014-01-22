#!/bin/env node
//  Sviete cWMS Node application
var restify = require('restify');
var mongojs = require("mongojs");
var nstatic = require('node-static');
    
var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '3000';
var db_name = process.env.OPENSHIFT_APP_NAME || "ng";
var connection_string = '127.0.0.1:27017/' + db_name;

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

console.log('connection string: '+connection_string);

var db = mongojs(connection_string, [db_name]);
var users = db.collection("openshift");

// Serve WS RESTful 
var server = restify.createServer({
    name : "mongo"
});


// Serve static application files 
var file = new nstatic.Server('');

server.pre(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());


function findAllTask(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  doAuthorization(req, res, function () {
    findAllTaskWs(req, res, next);
  })
}

function getDbInfo(req, res, next) {
  users.find().limit(20).sort({
    postedOn: -1
  }, function (err, success) {
    if (success) {
      res.send(200, success);
      return next();
    } else {
      return next(err);
    }
  })
}


//PATH = '/info'
server.get({path : '/info'} , getDbInfo);


// serve static application files
server.get(/^\/.*/, function(req, res, next) {
    file.serve(req, res, function (err) {
      if (err) {
        throw err;
      }
      next();
    });
});

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
})
