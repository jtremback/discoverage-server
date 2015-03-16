var mongoose = require('mongoose')
var Schema = mongoose.Schema

var animalSchema = new Schema({
  name: { type: String, default: '' },
  sprite: { type: String, default: '' },
  health: { type: Number, default: '' },
  location: { type: [Number], index: '2d' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Animal', animalSchema)