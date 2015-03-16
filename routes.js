var animals = require('./controllers/animals.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.get('/animals', animals.all)
  app.get('/animals/:id', animals.id)
  // app.get('/animals/near', animals.near)
  // app.get('/animals/user/:id', animals.user)

  // app.get('/users/:id')

  // app.get('/bananapicks/:id')
  // app.get('/bananapicks/user/:id')

  // app.get('/bananatrees/:id')
  // app.get('/bananatrees/near', function (req, res) {

  // })
}