'use strict'

const mysql = require('mysql')
const conf = require('./db-conf')

const myConnection = mysql.createConnection(conf.mysql);

myConnection.connect((err) => {
        return (err) ? console.log(`Error al conectarse a la Base de Datos ${err}`) : console.log(`Conexión establecida exitosamente Nº: ${myConnection.threadId}`)
})

module.exports = myConnection