var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.connect(process.env.MONGOLAB_URI)

// Bootstrap models
require('./models/Animal.js')
require('./models/BananaTree.js')
require('./models/BananaPick.js')
require('./models/User.js')

var express = require('express')
var routes = require('./routes.js')
var app = express()

app.use(bodyParser.json())

app.use(function(req, res, next){
  console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));
  next();
});

routes(app)

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports.app = app
module.exports.mongoose = mongoose