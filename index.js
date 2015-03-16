var express = require('express')
var mongoose = require('mongoose')
var routes = require('./routes.js')

var app = express()
mongoose.connect(process.MONGOLAB_URI)
console.log(MONGOLAB_URI)

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

app.listen(process.env.PORT)
console.log("listening on " + process.env.PORT)
