import React, { Component } from 'react';
import {signup} from "../services/userWs";

class SignupContainer extends Component {

    state={
        data:{},
        error: ""
    }

    handleChange = (event)=>{
        const {name, value} = event.target;
        const {data} = this.state;

        data[name]=value;
        this.setState({data});
    }

    onSubmit = (event) =>{
        event.preventDefault();
        console.log("Enviando datos");
        const {history} = this.props;
        signup(this.state.data)
            .then(response=>{
                this.setState({data:{}});
                this.setState({error:""});
                console.log("Felicidades ", response);
                history.push("/login");
            }).catch(error=>{
                this.setState({error: "Hubo un error al registrarse."});
                console.log("Hubo un error al registrarse: ", error.response);
            })
    }

    render() {
        const {handleChange, onSubmit} = this;
        const {data, error} = this.state;
        let signupError;
        if(error === ""){
            signupError = "";
        }else{
            signupError = <div className="error">Hubo un error al registrarse</div>;
        }

        return (
            <div>
                <h1>Registrate</h1>
                <form onSubmit={onSubmit}>
                    <label for="email">
                        Email:
                    </label>
                    <input type="email" name="email" onChange={handleChange}
                    value={data["email"] ? data["email"] : ""}></input>
                    <label for="password">
                        Password:
                    </label>
                    <input type="password" name="password" onChange={handleChange}
                    value={data["password"] ? data["password"] : ""}></input>
                    <label for="confirmPassword">
                        Confirm password:
                    </label>
                    <input type="password" name="confirmPassword" onChange={handleChange}
                    value={data["confirmPassword"] ? data["confirmPassword"] : ""}></input>
                    <button>Registrarse</button>
                </form>
                {signupError}
            </div>
        );
    }
}

export default SignupContainer;