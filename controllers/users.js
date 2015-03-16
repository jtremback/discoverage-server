var mongoose = require('mongoose')
var User = mongoose.model('User')

// Fake data
User.findOneAndRemove({ _id: '550648a8fa6b8286095dd5ce' })
.exec(function (err) {
  var jehan = new User({
    _id: '550648a8fa6b8286095dd5ce',
    name: 'jehan',
    email: 'jehan.tremback@gmail.com'
  })
  jehan.save()
})

exports.getAll = function (req, res) {
  User.find({}, function (err, users) {
    return res.json(users)
  })
}

exports.getById = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    return res.json(user)
  })
}

exports.save = function (req, res, next) {
  var user = new User(req.body)
  user.save(function (err, user) {
    if (err) { return next(err) }
    res.json(user)
  })
}

  // User.update(
  //   { _id: req.params.id },
  //   { $set: req.body },
  //   { upsert: true },
  //   function (err, user) {
  //     console.log('OOSER', user)
  //   }
  // )