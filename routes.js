var animals = require('./controllers/animals.js')
var users = require('./controllers/users.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.get('/animals', animals.all)
  // app.get('/animals/near', animals.near)
  // app.get('/animals/user/:id', animals.user)
  app.get('/animals/:id', animals.id)

  app.get('/users', users.all)
  app.get('/users/:id', users.id)

  // app.get('/bananapicks/:id')
  // app.get('/bananapicks/user/:id')

  // app.get('/bananatrees/:id')
  // app.get('/bananatrees/near', function (req, res) {

  // })
}