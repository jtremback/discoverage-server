var mongoose = require('mongoose')
var Animal = mongoose.model('Animal')
var sanitize = require('../sanitize.js')

// Fake data
Animal.findOneAndRemove({ _id: '550632455b692503008e659f' })
.exec(function () {
  var charizard = new Animal({
    _id: '550632455b692503008e659f',
    name: 'Charizard',
    sprite: '1_charizard',
    health: 5,
    location: [35.3343, 121.2223],
    owner: '550648a8fa6b8286095dd5ce'
  })
  charizard.save()
})

exports.getAll = function (req, res, next) {
  Animal.find(req.query)
  .populate('owner')
  .exec(function (err, animals) {
    if (err) { return next(err) }
    return res.json(sanitize(animals))
  })
}

exports.getById = function (req, res, next) {
  Animal.findOne({ _id: req.params.id })
  .populate('owner')
  .exec(function (err, animal) {
    if (err) { return next(err) }
    return res.json(sanitize(animal))
  })
}

exports.save = function (req, res, next) {
  var animal = new Animal(req.body)
  animal.save(function (err, animal) {
    Animal.findOne({ _id: animal._id })
    .populate('owner')
    .exec(function (err, animal) {
      if (err) { return next(err) }
      return res.json(sanitize(animal))
    })
  })
}

exports.update = function (user, id, doc, callback) {
  if (!user) { return callback({ status: 401, message: 'Please log in.' })}
  Animal.findOneAndUpdate({ _id: id, owner: user._id.toString() }, doc)
  .populate('owner')
  .exec(function (err, animal) {
    if (err) { return callback(err) }
    if (!animal) {
      return callback({ status: 403, message: 'You do not own an animal with that id.' })
    }
    return callback(null, animal)
  })
}

exports.near = function (req, res, next) {
  var distance = req.query.dist / 6371
  Animal.find({
      'location': {
        $near: [req.query.lon, req.query.lat],
        $maxDistance: distance
      }
    }
  )
  .populate('owner')
  .exec(function (err, animals) {
    if (err) { return next(err) }
    return res.json(sanitize(animals))
  })
}