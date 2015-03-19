var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')
var bananaPicks = require('./controllers/bananaPicks.js')
var bananaTrees = require('./controllers/bananaTrees.js')
var omnibus = require('./controllers/omnibus.js')
var sanitize = require('./sanitize.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.post('/login', users.login)
  app.get('/logout', users.logout)
  app.post('/update', users.auth, omnibus.updates)

  app.get('/animals', animals.getAll)
  app.get('/animals/near', animals.near)
  app.get('/animals/:id', animals.getById)
  app.post('/animal/:id', users.auth, function (req, res, next) {
    animals.update(req.user, req.params.id, req.body, function (err, animal) {
      if (err) { return next(err) }
      res.json(sanitize(animal))
    })
  })
  app.post('/animal', animals.save)

  app.get('/users', users.getAll)
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
  app.get('/bananatrees/near', bananaTrees.near)
  app.get('/bananatrees/:id', bananaTrees.getById)
  app.post('/bananatree', bananaTrees.save)
}