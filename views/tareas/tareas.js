const user = JSON.parse(localStorage.getItem('user'))
const formulario = document.querySelector('#form-todos')
const lista = document.querySelector('#todos-list')
const inputF = document.querySelector('#form-input')
const cerrarBTN = document.querySelector('#cerrar-btn')

const listaA = document.querySelector('#todos-list')


if(!user){
    //no existe,  no ha iniciado sesion
    //enviarlo para el home
    window.location.href = '/'
}

const obtenerLista = async () => {
    const respuesta = await fetch('http://localhost:3000/tareas', { method: 'GET' });
    const list = await respuesta.json();
    const userList = list.filter(lista => lista.user === user.username);
    console.log(userList);

    userList.forEach(lista => {
        const listado = document.createElement('li');
        listado.innerHTML = 
        `<li id=${lista.id} class="todo-item">
            <button class="delete-btn">&#10060;</button>
            <p class="${lista.checked ? 'check-todo' : ''}">${lista.text}</p>
            <button class="check-btn">&#10003;</button> 
        </li>`
        listaA.appendChild(listado);
        inputF.value= '';

})
}
obtenerLista();


formulario.addEventListener('submit', async e=>{
    e.preventDefault()
    limpiarHTML()
    
     await fetch('http://localhost:3000/tareas',{
        method: 'POST', //el get porque solo har una consulta, aqui hay otros tambien como el post
        //para hacer post, debemos colocar el atributo header y header es un objeto
        headers:{
            'Content-Type': 'application/json' //este es para registrar, pero hay mas content-Type
        },
        body: JSON.stringify({text:inputF.value,user:user.username})
        //body solo acepta string por eso se transforma el json
        //si quiero agg muchos, se agg aqui en el body, adentro 
})
obtenerLista()
//const users = await respuesta.json()
    //console.log(users)
//validar 
   //const user = users.find(i=>i.nombre===loginInput.value)
    //console.log(user)\
    
})


lista.addEventListener('click', async e=>{
    
    if(e.target.classList.contains('delete-btn')){
        const id = e.target.parentElement.id;
        //console.log(id)

        await fetch(`http://localhost:3000/tareas/${id}`,{
            method: 'DELETE'})
            e.target.parentElement.remove();
    }else if(e.target.classList.contains('check-btn')){
        const id = e.target.parentElement.id;

        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo p')?false:true})
        })
        const response = await respuestaJSON.json();
        e.target.parentElement.classList.toggle('check-todo p')
    }
})



cerrarBTN.addEventListener('click', async e=>{
    localStorage.removeItem('user');
    window.location.href = '/'
})

function limpiarHTML(){
    while(listaA.firstChild){
        listaA.removeChild(listaA.firstChild)
    }
}