import './App.css';
import React, { Component } from 'react';
import Navbar from "./components/Navbar"
import Routes from './Routes';
import AppContext from './AppContext';
import {logout} from "./services/userWs"

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

  setUser = (user) => {
    this.setState({user})
  }

  render() {
    const {setUser, state} = this;
    return (
      <AppContext.Provider
      value={{setUser}}>
        <div>
          <Navbar user={state.user}></Navbar>
          <Routes></Routes>
          <p>Prueba CM Conexión</p>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;

