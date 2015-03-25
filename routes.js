var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')
var bananaPicks = require('./controllers/bananaPicks.js')
var bananaTrees = require('./controllers/bananaTrees.js')
var omnibus = require('./controllers/omnibus.js')
var sanitize = require('./sanitize.js')

var async = require('async')
var mongoose = require('mongoose')
var datagen = require('./datagen.js')
var seeder = require('./seeder.js')

var Animal = mongoose.model('Animal')
var User = mongoose.model('User')
var BananaTree = mongoose.model('BananaTree')
var BananaPick = mongoose.model('BananaPick')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.post('/login', users.login)
  app.get('/logout', users.logout)
  app.post('/update', users.auth, omnibus.updates)
  app.get('/items/near', function (req, res, next) {
    omnibus.near(req.query, function (err, animals) {
      if (err) { return next(err) }
      return res.json(animals)
    })
  })

  app.get('/animals', animals.getAll)
  app.get('/animals/near', function (req, res, next) {
    animals.near(req.query, function (err, animals) {
      if (err) { return next(err) }
      return res.json(animals)
    })
  })
  app.get('/animals/:id', animals.getById)
  app.post('/animal/:id', users.auth, function (req, res, next) {
    animals.update(req.user, req.params.id, req.body, function (err, animal) {
      if (err) { return next(err) }
      res.json(sanitize(animal))
    })
  })
  app.post('/animal', animals.save)

  app.get('/users', users.getAll)
  app.get('/users/ranked', function (req, res, next) {
    users.ranked(function (err, users) {
      if (err) { return next(err) }
      res.json(sanitize(users))
    })
  })
  app.get('/users/:id', users.getById)
  app.post('/user/:id', users.auth, function (req, res, next) {
    users.update(req.user, req.params.id, req.body, function (err, user) {
      if (err) { return next(err) }
      res.json(sanitize(user))
    })
  })
  app.post('/user', users.save)

  app.get('/bananapicks', bananaPicks.getAll)
  app.get('/bananapicks/:id', bananaPicks.getById)
  app.post('/bananapick', users.auth, function (req, res, next) {
    bananaPicks.save(req.user, req.body, function (err, bananaPick) {
      if (err) { return next(err) }
      res.json(sanitize(bananaPick))
    })
  })

  app.get('/bananatrees', bananaTrees.getAll)
  app.get('/bananatrees/near', function (req, res, next) {
    bananaTrees.near(req.query, function (err, bananaTrees) {
      if (err) { return next(err) }
      return res.json(bananaTrees)
    })
  })
  app.get('/bananatrees/:id', bananaTrees.getById)
  app.post('/bananatree', bananaTrees.save)

  app.post('/seed', function (req, res, next) {
    async.each([User, Animal, BananaPick, BananaTree], function (Model, callback) {
      Model.remove({}, callback)
    }, function (err) {
      if (err) { next (err) }
      var data = datagen()
      seeder(data.animals, Animal)
      seeder(data.bananaTrees, BananaTree)
      seeder(data.users, User)

      res.json(data)
    })
  })
}