import React, { Component } from 'react';
import AppContext from "../AppContext";

class LoginContainer extends Component {
    static contextType = AppContext;

    state = {
        data:{},
        errorMsg: ""
    }

    handleChange = (event)=>{
        const { value, name} = event.target;
        let { data } = this.state;

        data[name] = value;

        this.setState({ data });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("Enviando datos");
        this.context.login(this.state.data).then(()=>{
            this.setState({ data:{}});
            this.props.history.push("/");
        }).catch((errorMsg)=>{
            this.setState({errorMsg});
        });
    }

    render() {
        const {handleChange, onSubmit} = this;
        const {data, errorMsg} = this.state;
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" onChange={handleChange} value={data["email"]?data["email"]:""}></input>
                    <input type="password" name="password" onChange={handleChange} value={data["password"]?data["password"]:""}></input>
                    <button>Entrar</button>
                    {errorMsg?<div className="error">{errorMsg}</div>:""}
                </form>
            </div>
        );
    }
}

export default LoginContainer;