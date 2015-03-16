var mongoose = require('mongoose')
var BananaTree = mongoose.model('BananaTree')

// Fake data
BananaTree.findOneAndRemove({ _id: '550648a8fa6b8286095ed5ce' })
.exec(function (err) {
  var theBananaTree = new BananaTree({
    _id: '5399a1ae13a2d700003bded8',
    location: [37.777777, 122.222222]
  })
  theBananaTree.save()
})

exports.getAll = function (req, res) {
  BananaTree.find({}, function (err, bananaTrees) {
    return res.json(bananaTrees)
  })
}

exports.getById = function (req, res) {
  BananaTree.findOne({ _id: req.params.id }, function (err, bananaTree) {
    return res.json(bananaTree)
  })
}

exports.save = function (req, res, next) {
  var bananaTree = new BananaTree(req.body)
  bananaTree.save(function (err, bananaTree) {
    if (err) { return next(err) }
    return res.json(bananaTree)
  })
}