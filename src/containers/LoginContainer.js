import React, { Component } from 'react';
import {login} from "../services/userWs"

class LoginContainer extends Component {

    state = {
        data:{}
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
        login(this.state.data).then((response)=>{ 
            this.setState({ data:{}})
            localStorage.setItem( "user",JSON.stringify( response.data.user ) );
            console.log(response.data);
            //this.context.setUser(response.data.user)
            this.props.history.push("/")

        }).catch((error)=>{
            console.log("hay un error",error)
        });

        
    }

    render() {
        const {handleChange, onSubmit} = this;
        const {data} = this.state;
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" onChange={handleChange} value={data["email"]?data["email"]:""}></input>
                    <input type="password" name="password" onChange={handleChange} value={data["password"]?data["password"]:""}></input>
                    <button>Entrar</button>
                </form>
            </div>
        );
    }
}

export default LoginContainer;