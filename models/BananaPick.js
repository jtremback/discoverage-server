var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bananaPickSchema = new Schema({
  bananaTree: { type: Schema.Types.ObjectId, ref: 'BananaTree' },
  picker: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Number, default: Date.now() }
})

module.exports = mongoose.model('BananaPick', bananaPickSchema)