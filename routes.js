var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')
var bananaPicks = require('./controllers/bananaPicks.js')
var bananaTrees = require('./controllers/bananaTrees.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.get('/animals', animals.getAll)
  app.get('/animals/near', animals.near)
  app.get('/animals/:id', animals.getById)
  app.post('/animal/:id', animals.update)
  app.post('/animal', animals.save)

  app.get('/users', users.getAll)
  app.get('/users/:id', users.getById)
  app.post('/user/:id', users.update)
  app.post('/user', users.save)

  app.get('/bananapicks', bananaPicks.getAll)
  app.get('/bananapicks/:id', bananaPicks.getById)
  app.post('/bananapick', bananaPicks.save)

  app.get('/bananatrees', bananaTrees.getAll)
  app.get('/bananatrees/near', bananaTrees.near)
  app.get('/bananatrees/:id', bananaTrees.getById)
  app.post('/bananatree', bananaTrees.save)
}