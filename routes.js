var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.get('/animals', animals.getAll)
  // app.get('/animals/near', animals.near)
  // app.get('/animals/user/:id', animals.user)
  app.get('/animals/:id', animals.getById)
  app.post('/animals', animals.save)

  app.get('/users', users.getAll)
  app.get('/users/:id', users.getById)
  app.post('/users', users.save)

  // app.post('/users/:id', users.update)

  // app.get('/bananapicks/:id')
  // app.get('/bananapicks/user/:id')

  // app.get('/bananatrees/:id')
  // app.get('/bananatrees/near', function (req, res) {

  // })
}