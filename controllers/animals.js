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
    owner: '550648a8fa6b8286095dd5ce'
  })
  charizard.save()
})

exports.getAll = function (req, res) {
  Animal.find({})
  .populate('owner')
  .exec(function (err, animals) {
    return res.json(animals)
  })
}

exports.getById = function (req, res) {
  Animal.findOne({ _id: req.params.id })
  .populate('owner')
  .exec(function (err, animal) {
    return res.json(animal)
  })
}