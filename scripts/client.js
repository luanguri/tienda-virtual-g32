const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const name = document.getElementById("txtName")
const email = document.getElementById("txtEmail")
const age = document.getElementById("txtAge")

const url = "https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client"

function crearClient(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "js");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": id.value,
      "name": name.value,
      "email": email.value,
      "age": age.value
    });
    
    var requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => {
        if(response.status == 201){
            alert("Se creo el cliente con id: " + id.value)
        }
        else{
            alert("Fallo al crear el cliente")
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}

function obtenerClient(){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.age}</td>
                <td><button onclick="obtenerPorIdClient(${element.id})">Detalles</button></td>
                <td><button onclick="eliminarClient(${element.id})">Eliminar</button></td>

            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function actualizarClient(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "js");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": id.value,
      "name": name.value,
      "email": email.value,
      "age": age.value
    });
    
    var requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => {
        if(response.status == 201){
            alert("Se actualizo el cliente con id: " + id.value )
        }
        else{
            alert("Fallo al actualizar el cliente con id: " + id.value )
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

function eliminarClient(selected_id){
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(url + "?id=" + selected_id, requestOptions)
      .then(response => {
        if(response.status == 204){
            alert("Se elimino el cliente con id: " + selected_id )
        }
        else{
            alert("Fallo eliminar el cliente con id: " + selected_id )
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  }

  function obtenerPorIdClient(selected_id){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var raw = "";
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client/" + selected_id, requestOptions)
    .then(response => response.json())
    .then(result => {
          const datos = result.items
          datos.forEach(element => {
            alert("Detalle Cliente \n Id:"+element.id+"\n Name:"+element.name+"\n Email:"+element.email+"\n Age:"+ element.age)
      })
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

obtenerClient()