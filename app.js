require('dotenv').config() 

const express = require('express')
const path = require('path')
const app = express()
const userRouter = require('./controllers/usuario')

//const port= process.env.PORT ||3000


//conexion mongoDB
const mongoose = require('mongoose')
 
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('estas conectado a la BD')
}catch(error){
    console.log(error)
}



//crear rutas de front end localhost
app.use('/',express.static(path.resolve('views','home')))
app.use('/tareas',express.static(path.resolve('views','tareas')))

//OJO aqui es muy importante/ esto es obligatorio para todo ya que el backend solo lee json

app.use(express.json())


//crear rutas de back end
app.use('/api/users',userRouter)


module.exports = app