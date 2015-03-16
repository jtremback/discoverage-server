var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: { type: String, default: '' },
  name: { type: String, default: '' },
  bananaCount: { type: Number, default: 0 }
})

module.exports = mongoose.model('User', userSchema)