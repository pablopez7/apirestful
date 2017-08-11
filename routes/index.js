'use strict'

const express = require('express')
const api = express.Router()

const UserCtrl = require('../controllers/userController')


api.get('/users', UserCtrl.getUsers)
api.post('/', UserCtrl.insertUser)

module.exports = api