var mongoose = require('mongoose')
var Animal = mongoose.model('Animal')

Animal.find({ name: 'Charizard' }, function (err, animals) {
  if (animals.length === 0) {
    var charizard = new Animal({ name: 'Charizard', sprite: '1_charizard', health: 0.3 })
    charizard.save()
  }
})

exports.all = function (req, res) {
  Animal.find({}, function (err, animals) {
    return res.json(animals)
  })
}

exports.id = function (req, res) {
  Animal.findOne({ _id: req.params.id }, function (err, animal) {
    return res.json(animal)
  })
}