const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const brand = document.getElementById("txtBrand")
const model = document.getElementById("txtModel")
const categoryId = document.getElementById("txtCategoryId")
const url = "https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car"

function crearCar(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "js");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": id.value,
      "brand": brand.value,
      "model": model.value,
      "category_id": categoryId.value
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
            alert("Se creo el carro")
        }
        else{
            alert("Fallo al crear el carro")
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}

function obtenerCar(){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var raw = "";
    
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
                <td>${element.brand}</td>
                <td>${element.model}</td>
                <td>${element.category_id}</td>
                <td><button onclick="obtenerPorIdCar(${element.id})">Detalles</button></td>
                <td><button onclick="eliminarCar(${element.id})">Eliminar</button></td>
            </tr>
            `
      });
    })
    .catch(error => console.log('error', error));

}
function actualizarCar(){
  var myHeaders = new Headers();
  myHeaders.append("Accept", "js");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": id.value,
    "brand": brand.value,
    "model": model.value,
    "category_id": categoryId.value
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
          alert("Se actualizo el carro con id: " + id.value )
      }
      else{
          alert("Fallo al actualizar el carrocon id: " + id.value )
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function eliminarCar(selected_id){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch(url + "?id=" + selected_id, requestOptions)
    .then(response => {
      if(response.status == 204){
          alert("Se elimino el carro con id: " + selected_id )
      }
      else{
          alert("Fallo al actualizar el carro con id: " + selected_id )
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function obtenerPorIdCar(selected_id){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var raw = "";
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car/" + selected_id, requestOptions)
    .then(response => response.json())
    .then(result => {
          const datos = result.items
          datos.forEach(element => {
            alert("Detalle carro \n Id:"+element.id+"\n Brand:"+element.brand+"\n Model:"+element.model+"\n Category:"+ element.category_id)
      })
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

//Llamada de las funciones
obtenerCar()
//crearCar()