var express = require('express')
var app = express()
const {getMovie, refreshDb} = require('./api')

app.get('/movie/:moviename', getMovie)

app.post('/refresh-db', refreshDb)

app.listen(3000, function () {
  console.log('App listening on http://localhost:3000/')
})