var mongoose = require('mongoose')
var BananaTree = mongoose.model('BananaTree')

// Fake data
BananaTree.findOneAndRemove({ _id: '5399a1ae13a2d700003bded8' })
.exec(function () {
  var theBananaTree = new BananaTree({
    _id: '5399a1ae13a2d700003bded8',
    location: [ 37.77777, 122.223333 ]
  })
  theBananaTree.save()
})

exports.getAll = function (req, res) {
  BananaTree.find()
  .exec(function (err, bananaTrees) {
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

exports.near = function (req, res, next) {
  var distance = parseFloat(req.query.dist) / 6371
  BananaTree.find({
      'location': {
        $near: [req.query.lon, req.query.lat],
        $maxDistance: distance
      }
    }
  )
  .exec(function (err, docs) {
    if (err) { return next(err) }
    return res.json(docs)
  })
}