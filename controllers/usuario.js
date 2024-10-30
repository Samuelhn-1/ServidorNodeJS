//1. hcaer el router
//router: es el que me permite hacer el, permite hacer estas funciones, POST, GET, DELETE, UPDATE//HTTP


const userRouter = require('express').Router()
//aqui siempre sera express, y se hace  un require para poder usarlo y permite generar router

//conectar al modelo:
const User = require('../models/usuarios')

//ya aqui puedo utilizar lo que buscamos en mongoose de find, actualizar y demas

//registrar la informacion que el usuario envia a traves del formulario
//request es lo que recibimos del front, cuando llaman del front y cae en request y el response es un return
userRouter.post('/', (request, response)=>{
    const {username} = request.body
    //es lo que estamos trayendo del formulario, para llegar aca, me deben llaman desde el front
    //este concolse va aparcer en la terminal de visual OJO
    console.log(username)
    //console.log(request.body)
    // se puede validar en el front, pero si hay un fastidioso desde el inspeccionar
    //pero para mas seguirdad validarlo aqui donde esta el fiscal xd
    //entonces: (validaciones a nivel de backend)

    if(!username){
        return response.status(400).json({error:'Todos los campos son obligatorios'}) //yo puedo crear mis propios status, los numeros, y el json es para el string con el error

    }else{
        //guardar en la bd
        let usuario = new User();
        usuario.username = username;

        async function guardarUsuario() {
            await usuario.save() //guardo en la bd

            const listUsuario = await User.find()
            console.log(listUsuario)
        }
        guardarUsuario().catch(console.error)

        return response.status(200).json({msj:'se a creado el nuevo usuario)'})
    }
})

//si quiero hacer un consulta por usuario o por usuarios, puedo predefinir
//si quiero hacer un consulta, puedo predefinir
//aqui agg el post, el get, el delete y asi
//aqui debo crear rutas para que cada una pueda llmar a su funcion
userRouter.get('/consultar-useer', async (request, response) => {
    const listUsuario = await User.find()
})

//obtener lista de usuaios
userRouter.get('/lista-users', async (request, response) => {
    try{
        const listado = await User.find()
        return response.status(200).json({testOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error: 'ha corrido un error'})
    }
})
module.exports = userRouter