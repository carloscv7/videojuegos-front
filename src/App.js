import './App.css';
import {withRouter} from "react-router-dom"
import React, { Component } from 'react';
import NavbarI from "./components/NavbarI"
import Routes from './Routes';
import AppContext from './AppContext';
import {logout} from "./services/userWs";
import {signup} from "./services/userWs";
import {login} from "./services/userWs";

class App extends Component {
  state = {
    user : JSON.parse( localStorage.getItem("user")   )  || {}
  }

  logout = () => {
    const { history } = this.props;
    logout().then(() => {
      localStorage.removeItem("user");
      this.setState({ user: {} });
      history.push("/");
    });
  }

  signup = (data) =>{
    return new Promise((resolve, reject)=>{
      signup(data)
              .then(response=>{
                  console.log("Felicidades ", response);
                   resolve();
              }).catch(error=>{
                  let errorMsg = [];
                  if(error.response.data.e?.keyValue != undefined){
                      if(error.response.data.e.keyValue.email != undefined){
                          errorMsg.push("El email ya tiene una cuenta asociada");
                      }else if(error.response.data.e.keyValue.username != undefined){
                          errorMsg.push("El usuario ya tiene una cuenta asociada");
                      }
                  }
                  if(error.response.data.e?.errors != undefined){
                      if(error.response.data.e.errors.email != undefined){
                        errorMsg.push("Debes ingresar un email");
                      }else if(error.response.data.e.errors.username != undefined){
                        errorMsg.push("Debes ingresar un usuario");
                      }
                  }
                  if(error.response.data.msg === "Las contraseñas no coinciden"){
                    errorMsg.push(error.response.data.msg);
                  }
                  reject(errorMsg);
              });
    });
  } 
  login = (data) =>{
    return new Promise((resolve, reject) =>{
      login(data).then((response)=>{
        localStorage.setItem( "user",JSON.stringify( response.data.user ) );
        console.log(response.data);
        this.setUser(response.data.user)
        resolve();
      }).catch((error)=>{
        console.log("hay un error",error.response)
        if(error.response.data){
            reject(error.response.data.msg);
        }
      });

    });
    
  }

  setUser = (user) => {
    this.setState({user})
  }

  render() {
    const {setUser, logout, signup, login} = this;
    const {user} = this.state;
    return (
      <AppContext.Provider
      value={{setUser, logout, signup, login, user}}>
        <div>
          <NavbarI user={user}></NavbarI>
          <Routes></Routes>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);

