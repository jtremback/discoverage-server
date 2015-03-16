module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('hello whirled')
  })

  app.get('/animals/:id', function () {

  })
  app.get('/animals/near', function (req, res) {

  })
  app.get('/animals/user/:id', function (req, res) {

  })

  app.get('/users/:id')

  app.get('/bananapicks/:id')
  app.get('/bananapicks/user/:id')

  app.get('/bananatrees/:id')
  app.get('/bananatrees/near', function (req, res) {

  })
}