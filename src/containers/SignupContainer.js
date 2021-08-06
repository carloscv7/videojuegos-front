import React, { Component } from 'react';
import AppContext from "../AppContext";

class SignupContainer extends Component {
    static contextType = AppContext;

    state={
        data: {},
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
        this.context.signup(this.state.data).then(()=>{
            this.setState({data:{}, error: ""});
            history.push("/login");
        }).catch((errorMsg)=>{
            this.setState({error: errorMsg[0]});
        }
        );

    }

    render() {
        const {handleChange, onSubmit} = this;
        const {data, error} = this.state;

        return (
            <div>
                <h1>Registrate</h1>
                <form onSubmit={onSubmit}>
                    <label for="email">
                        Email:
                    </label>
                    <input type="email" name="email" onChange={handleChange}
                    value={data["email"] ? data["email"] : ""}></input>
                    <label for="username">
                        Usuario:
                    </label>
                    <input type="text" name="username" onChange={handleChange}
                    value={data["username"] ? data["username"] : ""}></input>
                    <label for="password">
                        Contraseña:
                    </label>
                    <input type="password" name="password" onChange={handleChange}
                    value={data["password"] ? data["password"] : ""}></input>
                    <label for="confirmPassword">
                        Confirmar contraseña:
                    </label>
                    <input type="password" name="confirmPassword" onChange={handleChange}
                    value={data["confirmPassword"] ? data["confirmPassword"] : ""}></input>
                    <button>Registrarse</button>
                </form>
                {error?<div className="error">{error}</div>:""}
            </div>
        );
    }
}

export default SignupContainer;