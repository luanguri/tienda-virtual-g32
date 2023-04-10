const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const message = document.getElementById("txtMessage")
const url = "https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message"

function crearMessage(){
  var myHeaders = new Headers();
  myHeaders.append("Accept", "js");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": id.value,
    "messagetext": message.value
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
          alert("Se creo el mensaje con id: " + id.value)
      }
      else{
          alert("Fallo al crear el mensaje: "+ id.value)
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function obtenerMessage(){
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
                <td>${element.messagetext}</td>
                <td><button onclick="obtenerPorIdMessage(${element.id})">Detalles</button></td>
                <td><button onclick="eliminarMessage(${element.id})">Eliminar</button></td>

            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));    
}

function actualizarMessage(){
  var myHeaders = new Headers();
  myHeaders.append("Accept", "js");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": id.value,
    "messagetext": message.value
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
          alert("Se actualizo el mensaje con id: " + id.value )
      }
      else{
          alert("Fallo al actualizar el mensaje con id: " + id.value )
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function eliminarMessage(selected_id){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch(url + "?id=" + selected_id, requestOptions)
    .then(response => {
      if(response.status == 204){
          alert("Se elimino el mensaje con id: " + selected_id )
      }
      else{
          alert("Fallo eliminar el mensaje con id: " + selected_id )
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function obtenerPorIdMessage(selected_id){

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  
  var raw = "";
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message/" + selected_id, requestOptions)
  .then(response => response.json())
  .then(result => {
        const datos = result.items
        datos.forEach(element => {
          alert("Detalle message \n Id:"+element.id+"\n texto del message:"+element.messagetext+"\n")
    })
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

obtenerMessage()