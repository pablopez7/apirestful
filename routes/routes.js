'use strict'

const express = require('express')
const api = express.Router()

const UserCtrl = require('../controllers/userController')


api.get('/users', UserCtrl.getUsers)
api.post('/user', UserCtrl.insertUser)

module.exports = api