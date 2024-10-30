const formC = document.querySelector('#form-create')
const formL = document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const noti = document.querySelector('.notification')
const loginInput = document.querySelector('#login-input')


formC.addEventListener('submit', async e=>{ 
    e.preventDefault() //evita que se recargue la pagina
    //console.log(!createInput.value)
    const respuesta = await fetch('http://localhost:3000/usuario',{
        method: 'GET' 
    }) 
 
    const users = await respuesta.json()
    //console.log(users)
    //validar
    const user = users.find(user=>user.username===createInput.value) //find es buscar
    //console.log(user)
 
    if(!createInput.value){
        //si el campo esta vacio 
        console.log('campos vacios')
        noti.innerHTML =  'El campo no puede estar vacio'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)
    }else if(user){
        noti.innerHTML =  'El usuario ya existe'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)

    }else{
        //si no existe el usuario, vamos a agg
        //se puede usar como plantilla

        await fetch('http://localhost:3000/usuario',{
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json' //este es para registrar
            },
            body: JSON.stringify({username:createInput.value})
            //si quiero agg muchos, se agg aqui en el body, adentro 
        })

        const newUser = {
            username: createInput.value
        }
        const response = await axios.post('/api/users',newUser)
        //axios es otra forma de conectarme como el fecht, y en este caso se pone de ruta el backend
        //mejor manejo de errores que fecht
        //para usar axios neceito instalarlo en el html
        console.log(response)
        noti.innerHTML =  `El usuario ${createInput.value} se ha creado satisfactoriamente`
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)

        createInput.value = ""
    }

})

formL.addEventListener('submit',async e=>{
    e.preventDefault()

    //consulta
    const respuesta = await fetch('http://localhost:3000/usuario',{
        method: 'GET' 
    })
    const users = await respuesta.json()
    //console.log(users)
    //validar
    const user = users.find(user=>user.username===loginInput.value)
    //console.log(user)
    
    if(!user){
        noti.innerHTML =  'El usuario no existe'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)
    }else{
        localStorage.setItem('user',JSON.stringify(user))
        window.location.href = '/tareas'
    }
})