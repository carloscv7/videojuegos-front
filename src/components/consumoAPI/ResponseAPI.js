//Importaciones
import React from 'react'


//Funciones o clases
const ResponseAPI = ({resultado}) => {
    
    //Extraer los valores
    const {player, platform} = resultado;

    //Prevenir que cargue o ejecute el componente de la app si no hay un nombre
    if(!player) return null;

    //Pasar de grados kelvin
    const kelvin = 275.15; 

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {player} es:</h2>
                <p className="temperatura">
                    {platform}
                </p>

            </div>
        </div>
                
    )

    }
//Exportaciones
export default ResponseAPI; 
