var bananaPicks = require('./bananaPicks.js')
var animals = require('./animals.js')
var bananaTrees = require('./bananaTrees.js')
var users = require('./users.js')
var async = require('async')
var _ = require('lodash')
var sanitize = require('../sanitize.js')

exports.updates = function (req, res, next) {
  async.parallel({
    animals: async.apply(async.map, req.body.animals, function (item, callback) {
      var upd = _.omit(item, '_id')
      animals.update(req.user, item._id, upd, callback)
    }),
    users: async.apply(async.map, req.body.users, function (item, callback) {
      var upd = _.omit(item, '_id')
      users.update(req.user, item._id, upd, callback)
    }),
    bananaPicks: async.apply(async.map, req.body.bananaPicks, function (item, callback) {
      bananaPicks.save(req.user, item, callback)
    })
  }, function (err, results) {
    if (err) { return next(err) }
    return res.json(sanitize(results))
  })
}

exports.near = function (query, callback) {
  async.parallel({
    animals: async.apply(animals.near, query),
    bananaTrees: async.apply(bananaTrees.near, query)
  }, function (err, results) {
    if (err) { return callback(err) }
    return callback(null, sanitize(results))
  })
}