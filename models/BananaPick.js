var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bananaPickSchema = new Schema({
  _bananaTree: { type: Schema.Types.ObjectId, ref: 'BananaTree' },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: {  }
})

module.exports = mongoose.model('BananaPick', bananaPickSchema)