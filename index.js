var mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI)

// Bootstrap models
require('./models/Animal.js')
require('./models/BananaTree.js')
require('./models/BananaPick.js')
require('./models/User.js')

var express = require('express')
var routes = require('./routes.js')
var app = express()


app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

routes(app)

app.listen(process.env.PORT)
console.log("listening on " + process.env.PORT)
