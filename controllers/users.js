var mongoose = require('mongoose')
var User = mongoose.model('User')

// Fake data
User.find({ name: 'jehan' }, function (err, users) {
  if (users.length === 0) {
    var jehan = new User({
      _id: '550648a8fa6b8286095dd5ce',
      name: 'jehan',
      email: 'jehan.tremback@gmail.com'
    })
    jehan.save()
  }
})

exports.all = function (req, res) {
  User.find({}, function (err, users) {
    return res.json(users)
  })
}

exports.id = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    return res.json(user)
  })
}