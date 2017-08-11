'use strict'

const userModel = require('../models/userModel')

let UserCtrl = {}

UserCtrl.getUsers = (req, res, next) => {
    userModel.getModelUsers((err, users) => {
        if (err) return res.status(500).send({message : `Error al obtener los Usuarios. ${err}`})
        if (users.length <= 0) return res.status(404).send({message: `No existen usuarios.`})

        return res.status(200).send({ users })
    })
}

UserCtrl.insertUser = (req, res, next) => {
    userModel.insertModelUser()

}


module.exports = UserCtrl