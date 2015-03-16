var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: { type: String, default: '' },
  name: { type: String, default: '' }
})

module.exports = mongoose.model('User', userSchema)