'use strict'

const connect = require('../connections/mysql')

let UserModel = {}

UserModel.getUsersModel = (callback) => {
    if (connect){

        const sql = 'SELECT * FROM users'

        connect.query(sql, (err, rows) =>{
            if (err) {
                return callback(err)
            }
            return callback(null, rows)
        })
    } else {
        return callback('No se ha podido conectar')
    }
}

UserModel.insertUserModel = (data, cb) => {
    connect.query('INSERT INTO users SET ?', data, cb)
}

module.exports = UserModel