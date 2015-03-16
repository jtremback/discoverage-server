var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')
var bananaPicks = require('./controllers/bananaPicks.js')
var bananaTrees = require('./controllers/bananaTrees.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  // app.get('/animals/user/:id', animals.user)
  app.get('/animals', animals.getAll)
  app.get('/animals/near', animals.near)
  app.get('/animals/:id', animals.getById)
  app.post('/animals', animals.save)

  app.get('/users', users.getAll)
  app.get('/users/:id', users.getById)
  app.post('/users', users.save)

  // app.post('/users/:id', users.update)

  app.get('/bananapicks', bananaPicks.getAll)
  app.get('/bananapicks/:id', bananaPicks.getById)
  app.post('/bananapicks', bananaPicks.save)

  app.get('/bananatrees', bananaTrees.getAll)
  app.get('/bananatrees/near', bananaTrees.near)
  app.get('/bananatrees/:id', bananaTrees.getById)
  app.post('/bananatrees', bananaTrees.save)
}