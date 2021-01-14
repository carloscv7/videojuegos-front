import React, {Fragment, useState} from 'react';

const FormInscription = () => {


    const [datos, setDatos] = useState({
        teamName: '',
        playerOne: '',
        playerTwo: '',
        playerThree: '',
        playerFour: '',
    })

    const handleInputChange =(event) => {
        setDatos({
            ...datos, 
            [event.target.name]: event.target.value //se configura con el nombre del input

        })
    }

    const enviarDatos =(event) => {
        event.preventDefault();
        console.log(datos.teamName + datos.playerOne + datos.playerTwo + datos.playerThree + datos.playerFour)

    }

    return (
        <Fragment>
        
        <div className="container mt-5">
            
            <h2>Formulario</h2>

            <form className="row .col-form-label-lg row g-3" onSubmit={enviarDatos}>

            <div className="col-md-3">
                    <input
                    placeholder="Team's Name"
                    className="form-control"
                    type="text"
                    name="teamName"
                    onChange={handleInputChange}
                    />
                
                
                <div className="col-md-3">
                    <input
                    placeholder="Activision ID Player One"
                    className="form-control"
                    type="text"
                    name="playerOne"
                    onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-3">
                    <input
                    placeholder="Activision ID Player Two"
                    className="form-control"
                    type="text"
                    name="playerTwo"
                    onChange={handleInputChange}
                    />    
                </div>

                <div className="col-md-3">
                    <input
                    placeholder="Activision ID Player Three"
                    className="form-control"
                    type="text"
                    name="playerThree"
                    onChange={handleInputChange}
                    />    
                </div>

                <div className="col-md-3">
                    <input
                    placeholder="Activision ID Player Four"
                    className="form-control"
                    type="text"
                    name="playerFour"
                    onChange={handleInputChange}
                    />    
                </div>

                <div className="col-md-3">
                    <button className="btn btn-primary" type="submit">Save Team</button>
                </div>

            </div>
                
            </form>

        </div>


        </Fragment>
            
    )
}

export default FormInscription
