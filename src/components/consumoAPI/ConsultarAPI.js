import React, {Fragment, useState, useEffect} from 'react';
import ResponseAPI from './ResponseAPI';
import Error from './Error'

export default function ConsultarAPI() {
   
   //Usar el state para busqueda y guardar busqueda
  const [busqueda, guardarBusqueda] = useState({
    player:'',
    platform:''
    });
   
   //Controlar cuando el usuario ingrese parametros de busqueda para hacer una sola consulta a la API
  const [consultar, guardarConsultar] = useState(false);

  //Usar el state para mostrar el resultado
    const [resultado, guardarResultado] = useState({});
  
  //Usar el state para mostrar error cuando no encuentra la ciudad
   const [error, guardarError]= useState(false);
  
  //Extraer del state
    const { player, platform} = busqueda;
  
  //Usar useEffect para detectar los cambios que se realizen en el formulario y realizar funcion
  // en este caso se controla cuando cambie el [consultar]
    useEffect(() => {
    
    //Funcion para consultar API
   
    const consultarAPI = async () => {
      
      if(consultar){
        //se debe estructurar por partes para llegar al link de la peticion
      
  
      //1. API Key
      const appId ='5326965d19msh9d535da580c112ep12cd4fjsn562bca426c7b';
        const idPlayerOne = 'Chob%252321309' //hay que cambiar el # por %2523
        const platform = 'uno' //Activision ID

      //2. URL
      const url = `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${idPlayerOne}/${platform}",{
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "5326965d19msh9d535da580c112ep12cd4fjsn562bca426c7b",
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
        }
    })` 


      //3. Respuesta
      const respuesta = await fetch(url).then(response => {
          console.log(response)
      })
      .catch(err=>{
          console.log(err);
      }) 
      const resultado = await respuesta.json();
      
      console.log(url)
      console.log(resultado)
      //se guarda el resultado en el state
      guardarResultado(resultado);
      //se retorna a false para realizar multiples consultas
      guardarConsultar(false);
  
      //Mostrar error si no encuentra la ciudad 
        if(resultado.cod === "404") {
        guardarError(true);
        }else{
        guardarError(false);
        }
      }
    }
    consultarAPI()
    }, [consultar]);
  
    //Mostrar un componente opcional si hay error (carga condicional de componentes)
    let componente; 
    if(error) {
      componente = <Error mensaje="No hay resultados" />
    } else {
      componente = <ResponseAPI 
                    resultado={resultado}
                   />
    }
  

   
   
    return (
        <div>
            {componente}
        </div>
    )
}

