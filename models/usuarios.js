//el nombre que usaremos es del db.json pero en que yo hice esta en username
const mongoose = require('mongoose')

//conexion a la bd



//definir el esquema para usuarios //schema siginifica esquema
const usuarioSchema = new mongoose.Schema({
    username: String
})

//configurar la respuesta del usuario en el esquema
//

usuarioSchema.set('toJSON',{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

//seleccionar un nombre para registrar el modelo
const User = mongoose.model('User',usuarioSchema)

//se exporta como modulo
module.exports = User


//PLANTILLA, DOCUMENTACION PAGINA DE MOOONGOSE JS.COM 

//POR CADA MODELO UN CONTROLADOR