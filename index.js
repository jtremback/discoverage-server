var app = require('./app.js').app

app.listen(process.env.PORT)
console.log("listening on " + process.env.PORT)
