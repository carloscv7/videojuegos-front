import React, {Fragment, useState, useEffect} from 'react';


export default function PruebaConsumo() {
  
  const consultar=true;
    //Usar useEffect para detectar los cambios que se realizen en el formulario y realizar funcion
  // en este caso se controla cuando cambie el [consultar]
    useEffect(() => {
    
    //Funcion para consultar API
   
    const consultarAPI = async () => {
      
      if(consultar){

        fetch("https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/swat%20kryxthyamv/xbl", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "5326965d19msh9d535da580c112ep12cd4fjsn562bca426c7b",
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
	    }
      })
      .then(async response => {
          
          const resultado = await response.json();
          console.log('esta es la respuesta del API',resultado)

      })
      .catch(err=>{
          console.log(err);
      }) 
    
      }
    }
    consultarAPI()
    }, [consultar]);

   
    return (
        <div>
            <p>Prueba de conexion con Prueba de Consumo</p>
        </div>
    )
}

