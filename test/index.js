var test = require('tape')
var app = require('../app.js').app
var mongoose = require('../app.js').mongoose
var User = mongoose.model('User')
var Animal = mongoose.model('Animal')
var request = require('supertest')
var _ = require('lodash')

setTimeout(function () { // this gives it a chance to create the fake docs

  var charizard = {
    _id: '550632455b692503008e659f',
    name: 'Charizard',
    sprite: '1_charizard',
    health: 5
  }

  var animalPick = ['_id', 'name', 'health', 'sprite']

  test('get all animals', function (t) {
    request(app)
    .get('/animals')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body[0], animalPick)

      t.deepEqual(charizard, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body[0].owner._id)

      t.end()
    })
  })

  test('get animal by id', function (t) {
    request(app)
    .get('/animals/550632455b692503008e659f')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body, animalPick)

      t.deepEqual(charizard, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body.owner._id)

      t.end()
    })
  })

  test('save new animal', function (t) {
    var animal = {
      name: 'Squirtle',
      sprite: '1_squirtle',
      health: 3
    }

    request(app)
    .post('/animals')
    .send(animal)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      var resAnimal = _.omit(_.pick(res.body, animalPick), '_id')
      t.deepEqual(animal, resAnimal)

      Animal.findOne({ name: 'Squirtle' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        var foundAnimal = _.omit(_.pick(res.body, animalPick), '_id')
        t.deepEqual(animal, foundAnimal)

        t.end()
      })
    })
  })





  var jehan = {
    name: 'jehan',
    email: 'jehan.tremback@gmail.com',
    bananaCount: 5
  }

  var userPick = ['name', 'email', 'bananaCount']

  test('get all users', function (t) {
    request(app)
    .get('/users')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resUser = _.pick(res.body[0], userPick)

      t.deepEqual(jehan, resUser)

      t.end()
    })
  })

  test('get user by id', function (t) {
    request(app)
    .get('/users/550648a8fa6b8286095dd5ce')
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resUser = _.pick(res.body, userPick)

      t.deepEqual(jehan, resUser)

      t.end()
    });
  })

  test('save new user', function (t) {
    var user = {
      name: 'aditya',
      email: 'adit99@gmail.com',
      bananaCount: 0
    }

    request(app)
    .post('/users')
    .send(user)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      var resUser = _.pick(res.body, userPick)
      t.deepEqual(user, resUser)

      User.findOne({ name: 'aditya' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        var foundUser = _.pick(found, userPick)
        t.deepEqual(user, foundUser)

        t.end()
      })
    })
  })

  // test('update user', function (t) {
  //   request(app)
  //   .post('/user')
  //   .send({})
  //   .end(function(err, res){
  //     t.error(err)
  //     t.end()
  //   })
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