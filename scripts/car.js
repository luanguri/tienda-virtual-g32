const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const brand = document.getElementById("txtBrand")
const model = document.getElementById("txtModel")
const categoryId = document.getElementById("txtCategoryId")

function crearCar(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "js");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": id,
      "brand": brand,
      "model": model,
      "category_id": categoryId
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
      .then(response => response.text())
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
    
    fetch("https://g83f793b0502475-ffqtshzem73l4y6a.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
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
                <td><button>Detalles</button></td>
                <td><button>Eliminar</button></td>
            </tr>
            `
      });
    })
    .catch(error => console.log('error', error));

}
function actualizarCar(){}
function eliminarCar(){}
function obtenerPorIdCar(){}

//Llamada de las funciones
obtenerCar()