var test = require('tape')
var app = require('../app.js').app
var mongoose = require('../app.js').mongoose
var User = mongoose.model('User')
var request = require('supertest')
var _ = require('lodash')

setTimeout(function () { // this gives it a chance to create the fake docs

  test('get all animals', function (t) {
    request(app)
    .get('/animals')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body[0], ['_id', 'name', 'health', 'sprite'])

      t.deepEqual({
        _id: '550632455b692503008e659f',
        name: 'Charizard',
        sprite: '1_charizard',
        health: 5
      }, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body[0].owner._id)

      t.end()
    });
  })

  test('get animal by id', function (t) {
    request(app)
    .get('/animals/550632455b692503008e659f')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body, ['_id', 'name', 'health', 'sprite'])

      t.deepEqual({
        _id: '550632455b692503008e659f',
        name: 'Charizard',
        sprite: '1_charizard',
        health: 5
      }, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body.owner._id)

      t.end()
    });
  })

  // test('get all users', function (t) {

  // })

  // test('get user by id', function (t) {

  // })

  test('save new user', function (t) {
    var user = {
      name: 'aditya',
      email: 'adit99@gmail.com'
    }

    request(app)
    .post('/users')
    .send(user)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      var resUser = _.pick(res.body, ['name', 'email'])
      t.deepEqual(user, resUser)

      User.findOne({ name: 'aditya' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        var foundUser = _.pick(found, ['name', 'email'])
        t.deepEqual(user, foundUser)

        t.end()
      })
    });
  })

  // test('update user', function (t) {
  //   request(app)
  //   .post('/user')
  //   .send({})
  //   .end(function(err, res){
  //     t.error(err)
  //     t.end()
  //   });
  // })

  test('end', function (t) {
    mongoose.connection.db.executeDbCommand(
      { dropDatabase: 1 },
      function(err, result) {
        if (err) { throw err }
        t.end()
        process.exit()
      }
    )
  })
}, 100)