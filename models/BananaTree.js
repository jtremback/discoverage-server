var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bananaTreeSchema = new Schema({
  location: { type: [Number], index: '2d' }
})

module.exports = mongoose.model('BananaTree', bananaTreeSchema)