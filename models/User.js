var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: { type: String, default: '' },
  username: { type: String, default: '' }
})

module.exports = mongoose.model('User', userSchema)