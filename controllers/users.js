var mongoose = require('mongoose')
var User = mongoose.model('User')
var sanitize = require('../sanitize.js')
var async = require('async')
var Animal = mongoose.model('Animal')

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

User.findOneAndRemove({ _id: '550648a8fa6b8286095ww5ce' })
.exec(function () {
  var will = new User({
    _id: '550648a8fa6b8286095ww5ce',
    name: 'will',
    email: 'wfw@gmail.com',
    bananaCount: 2,
    password: 'pokemon'
  })
  will.save()
})

exports.getAll = function (req, res) {
  User.find(req.query)
  .exec(function (err, users) {
    return res.json(sanitize(users))
  })
}

exports.getById = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    return res.json(sanitize(user))
  })
}

exports.update = function (user, id, doc, callback) {
  if (!user) { return callback({ status: 401, message: 'Please log in.' })}
  if (user._id.toString() !== id) {
    return callback({ status: 403, message: 'You can only modify your own account.' })
  }
  User.findOneAndUpdate({ _id: id }, doc)
  .exec(function (err, user) {
    if (err) { return callback(err) }
    return callback(null, user)
  })
}

exports.save = function (req, res, next) {
  var user = new User(req.body)
  user.save(function (err, user) {
    if (err) { return next(err) }
    return res.json(sanitize(user))
  })
}

exports.login = function (req, res, next) {
  User.findOne({ email: req.body.email })
  .exec(function (err, user) {

    if (err) { return next(err) }
    if (!user) { return res.status(401).json({ code: 401, error: 'No user with that email.' }) }

    user.comparePassword(req.body.password, function (err, matches) {
      if (err) { return next(err) }
      if (!matches) { return res.status(401).json({ code: 401, error: 'Incorrect password.' }) }

      if (!user.token || user.token.length === 0) {
        var token = parseInt(Math.random() * 10000000000000) + ''
        user.token = token
        user.save()
      }

      return res.json(user)
    })
  })
}

exports.auth = function (req, res, next) {
  if (!req.body.token) { return res.status(401).json({ code: 401, error: 'Please log in.' }) }
  User.findOne({ token: req.body.token })
  .exec(function (err, user) {
    if (err) { next(err) }
    if (!user) { return res.status(401).json({ code: 401, error: 'Please log in.' }) }
    delete req.body.token
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

exports.ranked = function (callback) {
  Animal.aggregate([
    {
      $group: {
        _id: '$owner',
        totalHealth: {
          $sum: '$health'
        }
      }
    },
    {
      $match: {
        _id: { $ne: null }
      }
    },
    {
      $sort: {
        totalHealth: 1
      }
    }
  ], function (err, users) {
    if (err) { return callback(err) }
    async.map(
      users,
      function(result, cb) {
        User.findById(result._id)
        .exec(cb)
      },
      function(err, results) {
        return callback(err, results)
      }
    )
  })
}