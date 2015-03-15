var express = require('express')
var routes = require('./routes.js')

var app = express()

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

routes(app)

app.listen(4242)
console.log("listening on 4242")
