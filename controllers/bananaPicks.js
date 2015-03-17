var mongoose = require('mongoose')
var BananaPick = mongoose.model('BananaPick')

// Fake data
BananaPick.findOneAndRemove({ _id: '5399a1ae13a2d700003bded8' })
.exec(function () {
  var theBananaPick = new BananaPick({
    _id: '5399a1ae13a2d700003bded8',
    bananaTree: '550648a8fa6b8286095ed5ce',
    timestamp: '1426485627563',
    picker: '550648a8fa6b8286095dd5ce'
  })
  theBananaPick.save()
})

exports.getAll = function (req, res) {
  BananaPick.find(req.query)
  .populate(['bananaTree', 'picker'])
  .exec(function (err, bananaPicks) {
    return res.json(bananaPicks)
  })
}

exports.getById = function (req, res) {
  BananaPick.findOne({ _id: req.params.id })
  .populate(['bananaTree', 'picker'])
  .exec(function (err, bananaPick) {
    return res.json(bananaPick)
  })
}

exports.save = function (req, res, next) {
  if (!req.user) { return res.status(401).send('Please log in.')}
  if (req.user._id.toString() !== req.body.picker) {
    return res.status(403).send('You can pick your friends, and you can pick your bananas, but you can\'t pick your friend\'s bananas.')
  }
  var bananaPick = new BananaPick(req.body)
  bananaPick.save(function (err, bananaPick) {
    BananaPick.findOne({ _id: bananaPick._id })
    .populate(['bananaTree', 'picker'])
    .exec(function (err, bananaPick) {
      if (err) { return next(err) }
      return res.json(bananaPick)
    })
  })
}