const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('./database/database')()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/api')(app)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})