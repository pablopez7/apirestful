'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, () => {
    console.log(`API RESTFull corriendo en http://localhost:${port}`)
})