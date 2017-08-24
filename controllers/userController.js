'use strict'

const userModel = require('../models/userModel')
const bcrypt = require('bcrypt-nodejs')
const util = require('util')
const changeCase = require('change-case')

let UserCtrl = {}

UserCtrl.getUsers = (req, res) => {
    userModel.getUsersModel((err, users) => {
        if (err) return res.status(500).send({message : `Error al obtener los Usuarios. ${err}`})
        if (users.length <= 0) return res.status(404).send({message: `No existen usuarios.`})

        return res.status(200).send({ users })
    })
}

UserCtrl.insertUser = (req, res, next) => {

    let user = {
        email : changeCase.lowerCase(req.body.email),
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password)
    }

    req.checkBody('email', 'El formato de correo es invalido').isEmail()
        .notEmpty().withMessage('El correo no puede quedar vacio')

    req.checkBody('username', 'El Nombre de Usuario es invalido')
        .notEmpty().withMessage('El Nombre de Usuario no puede quedar vacio')
        .isLength({min: 5}).withMessage('El Nombre de Usuario debe tener al menos 5 caracteres.')

    req.checkBody('password', 'La contraseña no es valida')
        .notEmpty().withMessage('El password no puede quedar vacio')
        .isLength({min: 6}).withMessage('El password debe tener al menos 6 caracteres.')
        .equals(req.body.confirmPassword).withMessage('El password no coincide.')

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            //console.log(util.inspect(result.array()))
            res.status(400).send(`Se han producido uno o varios errores de validación: ${util.inspect(result.array())}`)
            return
        }

        userModel.insertUserModel(user, (err) => {
            if (err) return res.status(500).send({ message : `Error al guardar al Usuario. ${err}` })

            return res.status(200).send({ message: `El usuario se guardo correctamente.` })
        })
    })
}


module.exports = UserCtrl