var express = require('express')
var mongoose = require('mongoose')
var routes = require('./routes.js')

var app = express()
mongoose.connect('mongodb://localhost/discoverage')

// Bootstrap models
require('./models/Animal.js')
require('./models/BananaTree.js')
require('./models/BananaPick.js')
require('./models/User.js')

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

routes(app)

app.listen(4242)
console.log("listening on 4242")
