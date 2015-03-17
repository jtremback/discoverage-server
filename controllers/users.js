var mongoose = require('mongoose')
var User = mongoose.model('User')
var _ = require('lodash')

// Fake data
User.findOneAndRemove({ _id: '550648a8fa6b8286095dd5ce' })
.exec(function () {
  var jehan = new User({
    _id: '550648a8fa6b8286095dd5ce',
    name: 'jehan',
    email: 'jehan.tremback@gmail.com',
    bananaCount: 5,
    password: 'pokemon'
  })
  jehan.save()
})

exports.getAll = function (req, res) {
  User.find(req.query)
  .exec(function (err, users) {
    return res.json(users)
  })
}

exports.getById = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    return res.json(user)
  })
}

exports.update = function (req, res, next) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
  .exec(function (err, user) {
    if (err) { return next(err) }
    return res.json(user)
  })
}

exports.save = function (req, res, next) {
  var user = new User(req.body)
  user.save(function (err, user) {
    if (err) { return next(err) }
    return res.json(user)
  })
}

exports.login = function (req, res, next) {
  User.findOne({ email: req.body.email })
  .exec(function (err, user) {

    if (err) { return next(err) }
    if (!user) { return res.status(401).send('No user with that email.') }

    user.comparePassword(req.body.password, function (err, matches) {
      if (err) { return next(err) }
      if (!matches) { return res.status(401).send('Incorrect password.') }
      var token = parseInt(Math.random() * 10000000000000) + ''
      user.token = token
      user.save()

      return res.json(token)
    })
  })
}

exports.auth = function (req, res, next) {
  User.findOne({ token: req.query.token })
  .exec(function (err, user) {
    if (err) { next(err) }
    if (!user) { return res.status(401).send('Please log in.') }
    req.user = user
    next()
  })
}

exports.logout = function (req, res, next) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' })
  .exec(function (err) {
    if (err) { return next(err) }
    return res.send('Logged out.')
  })
}
