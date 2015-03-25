var mongoose = require('mongoose')

var spriteses = require('./sprites.json')
var names = require('./names.json')

var radius = 2

function toTitleCase (str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function name (str) {
  return toTitleCase(str.match(/_(.*)/)[1].replace(/\_/, ' '))
}

var users = names.map(function (name) {
  var user = {}

  user.name = name
  user._id = mongoose.Types.ObjectId()
  user.email = name.toLowerCase() + '@hotmail.com'
  user.bananaCount = Math.random() * 20
  user.password = 'pass'

  return user
})

var animals = spriteses.map(function (sprites) {
  var animal = {}

  animal._id = mongoose.Types.ObjectId()

  animal.sprites = sprites
  animal.names = sprites.map(function (sprite) {
    return name(sprite)
  })

  animal.sprite = animal.sprites[0]
  animal.name = animal.names[0]

  if (Math.random() > 0.5) {
    animal.owner = users[parseInt(Math.random() * users.length)]._id
    animal.health = parseInt(Math.random() * 10)
  } else {
    animal.health = 3
  }

  animal.location = [
    122.0312 + ((Math.random() - 0.5) * radius),
    37.3318 + ((Math.random() - 0.5) * radius)
  ]

  return animal
})

var bananaTrees = []
for (var i = 0; i < 150; i++) {
  bananaTrees.push(makeBTree())
}

function makeBTree () {
  var bTree = {}

  bTree._id = mongoose.Types.ObjectId()
  bTree.location = [
    122.0312 + ((Math.random() - 0.5) * radius),
    37.3318 + ((Math.random() - 0.5) * radius)
  ]

  return bTree
}

console.log(JSON.stringify(
  {
    bananaTrees: bananaTrees,
    animals: animals,
    users: users
  },
  null,
  2
))