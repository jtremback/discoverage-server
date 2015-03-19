var mongoose = require('mongoose')
var Animal = mongoose.model('Animal')

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
    return res.json(animals)
  })
}

exports.getById = function (req, res, next) {
  Animal.findOne({ _id: req.params.id })
  .populate('owner')
  .exec(function (err, animal) {
    if (err) { return next(err) }
    return res.json(animal)
  })
}

exports.save = function (req, res, next) {
  var animal = new Animal(req.body)
  animal.save(function (err, animal) {
    Animal.findOne({ _id: animal._id })
    .populate('owner')
    .exec(function (err, animal) {
      if (err) { return next(err) }
      return res.json(animal)
    })
  })
}

exports.update = function (req, res, next) {
  if (!req.user) { return res.status(401).json({ code: 401, error: 'Please log in.' })}
  Animal.findOneAndUpdate({ _id: req.params.id, owner: req.user._id.toString() }, req.body)
  .populate('owner')
  .exec(function (err, animal) {
    if (err) { return next(err) }
    if (!animal) {
      return res.status(403).json({ code: 403, error: 'You do not own an animal with that id.' })
    }
    return res.json(animal)
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
    return res.json(animals)
  })
}