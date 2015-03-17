var test = require('tape')
var app = require('../app.js').app
var mongoose = require('../app.js').mongoose
var User = mongoose.model('User')
var Animal = mongoose.model('Animal')
var BananaPick = mongoose.model('BananaPick')
var BananaTree = mongoose.model('BananaTree')
var request = require('supertest')
var _ = require('lodash')

mongoose.connection.on('open', function(){
  mongoose.connection.db.executeDbCommand(
    { dropDatabase: 1 },
    function() {
      // this gives it a chance to create the fake docs
      setTimeout(tests, 500)
    }
  )
})

function tests () {

  var charizard = {
    _id: '550632455b692503008e659f',
    name: 'Charizard',
    sprite: '1_charizard',
    location: [35.3343, 121.2223],
    health: 5
  }

  var animalProps = ['_id', 'name', 'health', 'sprite', 'location']

  test('get all animals', function (t) {
    request(app)
    .get('/animals')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body[0], animalProps)

      t.deepEqual(charizard, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body[0].owner._id)

      t.end()
    })
  })

  test('get animal by id', function (t) {
    request(app)
    .get('/animals/550632455b692503008e659f')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body, animalProps)

      t.deepEqual(charizard, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body.owner._id)

      t.end()
    })
  })

  test('get animals nearby', function (t) {
    request(app)
    .get('/animals/near?lon=37&lat=122&dist=1000000')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resAnimal = _.pick(res.body[0], animalProps)

      t.deepEqual(charizard, resAnimal)

      t.equal('550648a8fa6b8286095dd5ce', res.body[0].owner._id)

      t.end()
    })
  })

  var squirtle = {
    name: 'Squirtle',
    sprite: '1_squirtle',
    health: 3,
    owner: '550648a8fa6b8286095dd5ce'
  }

  test('save new animal', function (t) {
    request(app)
    .post('/animal')
    .send(squirtle)
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      function filter (animal) {
        return _.omit(_.pick(animal, animalProps), ['_id', 'owner'])
      }

      t.deepEqual(filter(squirtle), filter(res.body))
      t.equal('550648a8fa6b8286095dd5ce', res.body.owner._id)

      Animal.findOne({ name: 'Squirtle' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        t.deepEqual(filter(squirtle), filter(res.body))

        t.end()
      })
    })
  })

  test('update animal', function (t) {
    request(app)
    .post('/animal/550632455b692503008e659f')
    .send({ health: 9 })
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      t.equal(9, res.body.health)

      Animal.findOne({ name: 'Squirtle' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        t.equal(9, res.body.health)

        t.end()
      })
    })
  })

  test('get all animals filtered', function (t) {
    request(app)
    .get('/animals?name=Squirtle')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      t.equal(res.body.length, 1)
      t.end()
    })
  })






  var jehan = {
    name: 'jehan',
    email: 'jehan.tremback@gmail.com',
    bananaCount: 5
  }

  var userProps = ['name', 'email', 'bananaCount']

  test('get all users', function (t) {
    request(app)
    .get('/users')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resUser = _.pick(res.body[0], userProps)

      t.deepEqual(jehan, resUser)

      t.end()
    })
  })

  test('get user by id', function (t) {
    request(app)
    .get('/users/550648a8fa6b8286095dd5ce')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resUser = _.pick(res.body, userProps)

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
    .post('/user')
    .send(_.omit(user, 'bananaCount'))
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      var resUser = _.pick(res.body, userProps)
      t.deepEqual(user, resUser)

      User.findOne({ name: 'aditya' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        var foundUser = _.pick(found, userProps)
        t.deepEqual(user, foundUser)

        t.end()
      })
    })
  })

  test('update user', function (t) {
    request(app)
    .post('/user/550648a8fa6b8286095dd5ce')
    .send({ bananaCount: 9 })
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      t.equal(9, res.body.bananaCount)

      Animal.findOne({ name: 'jehan' })
      .exec(function (err, found) {
        console.log('FOUND', found)

        t.equal(9, res.body.bananaCount)

        t.end()
      })
    })
  })

  test('get all users filtered', function (t) {
    request(app)
    .get('/users?name=aditya')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      t.equal(res.body.length, 1)
      t.end()
    })
  })



  var theBananaPick = {
    timestamp: 1426485627563
  }

  var bananaPickProps = ['timestamp']

  test('get all bananaPicks', function (t) {
    request(app)
    .get('/bananapicks')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resBananaPick = _.pick(res.body[0], bananaPickProps)

      t.deepEqual(theBananaPick, resBananaPick)

      t.end()
    })
  })

  test('get bananaPick by id', function (t) {
    request(app)
    .get('/bananapicks/5399a1ae13a2d700003bded8')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resBananaPick = _.pick(res.body, bananaPickProps)

      t.deepEqual(theBananaPick, resBananaPick)

      t.end()
    });
  })

  test('save new bananaPick', function (t) {
    var bananaPick = {
      bananaTree: '5399a1ae13a2d700003bded8',
      timestamp: 1426485625563,
      picker: '550648a8fa6b8286095dd5ce'
    }

    request(app)
    .post('/bananaPick')
    .send(bananaPick)
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      function filter (bananaPick) {
        return _.omit(_.pick(bananaPick, bananaPickProps), ['_id', 'picker', 'bananaTree'])
      }

      t.deepEqual(filter(bananaPick), filter(res.body))
      t.equal('550648a8fa6b8286095dd5ce', res.body.picker._id)
      t.equal('5399a1ae13a2d700003bded8', res.body.bananaTree._id)

      BananaPick.findOne({ timestamp: 1426485625563 })
      .exec(function (err, found) {
        console.log('FOUND', found)

        t.deepEqual(filter(bananaPick), filter(res.body))

        t.end()
      })
    })
  })

  test('get all bananaPicks filtered', function (t) {
    request(app)
    .get('/bananaPicks?timestamp=1426485625563')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      t.equal(res.body.length, 1)
      t.end()
    })
  })






  var theBananaTree = {
    location: [ 37.77777, 122.223333 ]
  }

  var bananaTreeProps = ['location']

  test('get all bananaTrees', function (t) {
    request(app)
    .get('/bananatrees')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resBananaTree = _.pick(res.body[0], bananaTreeProps)

      t.deepEqual(theBananaTree, resBananaTree)

      t.end()
    })
  })

  test('get bananaTree by id', function (t) {
    request(app)
    .get('/bananatrees/5399a1ae13a2d700003bded8')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resBananaTree = _.pick(res.body, bananaTreeProps)

      t.deepEqual(theBananaTree, resBananaTree)

      t.end()
    });
  })

  test('get bananaTrees nearby', function (t) {
    request(app)
    .get('/bananatrees/near?lon=37&lat=122&dist=1000000')
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)
      var resBananaTree = _.pick(res.body[0], bananaTreeProps)

      t.deepEqual(resBananaTree, theBananaTree)

      t.end()
    })
  })

  test('save new bananaTree', function (t) {
    var bananaTree = {
      location: [34.444, 124.4444]
    }

    request(app)
    .post('/bananatree')
    .send(_.omit(bananaTree, 'bananaTreeCount'))
    .expect(200)
    .end(function(err, res){
      t.error(err)
      console.log('RES', res.body)

      var resBananaTree = _.pick(res.body, bananaTreeProps)
      t.deepEqual(bananaTree, resBananaTree)

      BananaTree.findOne({ location: [34.444, 124.4444] })
      .exec(function (err, found) {
        console.log('FOUND', found)

        var foundBananaTree = _.pick(found, bananaTreeProps)
        t.deepEqual(JSON.stringify(bananaTree), JSON.stringify(foundBananaTree))

        t.end()
      })
    })
  })


  test('end', function (t) {
    t.end()
    process.exit()
  })
}