'use strict'

const userModel = require('../models/userModel')
const util = require('util')

let UserCtrl = {}

UserCtrl.getUsers = (req, res) => {
    userModel.getModelUsers((err, users) => {
        if (err) return res.status(500).send({message : `Error al obtener los Usuarios. ${err}`})
        if (users.length <= 0) return res.status(404).send({message: `No existen usuarios.`})

        return res.status(200).send({ users })
    })
}

UserCtrl.insertUser = (req, res, next) => {

    let user = {
        email : req.body.email,
        password : req.body.password
    }

    console.log(user)

    req.checkBody('email', 'El formato de correo es invalido').isEmail()
    req.checkBody('password', 'La contraseña no es valida')
        .isLength({min: 6})
        .withMessage('El password debe tener al menos 6 caracteres.')
        .equals(req.body.confirmPassword).withMessage('El password no coincide.')

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            console.log(util.inspect(result.array()))
            res.status(400).send(`Se han producido uno o varios errores de validación: ${util.inspect(result.array())}`)
            return
        }
        res.json({ user })
    })
/*
    let err = req.validationErrors()
    //let error = err[0].msg

    console.log(err)

    if (err) return res.status(500).send({message : `Upss!!. ${err}`})

    res.status(200).send({ user })
*/


    //userModel.insertModelUser()

}


module.exports = UserCtrl