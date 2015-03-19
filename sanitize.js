var traverse = require('traverse')

module.exports = function (obj) {
  obj = JSON.parse(JSON.stringify(obj))
  return traverse(obj).map(function (x) {
    if (this.key === 'token' || this.key === 'password' || this.key === '__v') {
      this.remove()
    }
  })
}