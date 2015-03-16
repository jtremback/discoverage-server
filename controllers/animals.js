var mongoose = require('mongoose')
var Animal = mongoose.model('Animal')

// Fake data
Animal.findOneAndRemove({ _id: '550632455b692503008e659f' })
.exec(function (err) {
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
  Animal.find({})
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