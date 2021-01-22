import './App.css';
import React, { Component } from 'react';
import AppContext from './AppContext';
import {logout} from "./services/userWs";
import NavbarCM from "./components/NavbarCM";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeCM from './components/pages/HomeCM';
import SignUp from './components/pages/SignUp';
import RegisterT from './components/pages/RegisterT';
import Tournaments from './components/pages/Tournaments';
import Login from './components/pages/Login';
import ReadProducts from './components/pages/ReadProducts';
import UpdateProducts from './components/pages/UpdateProducts';
import DeleteProducts from './components/pages/DeleteProducts';
import AddVideogame from './components/AddVideogame';
import Signup from './components/signupform/Signup';




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

      <div>
          <AppContext.Provider
          value={{setUser}}>
            
          <div>
            <Router>
              <NavbarCM user={state.user}/>
              <Switch>
                <Route path='/' exact component={HomeCM}/>
                <Route path='/tournaments' component={Tournaments}/>
                <Route path='/register' component={RegisterT}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>

                {/* Rutas para el CRUD */}
                <Route path='/addvideogame' component={AddVideogame}/> 
                <Route path='/tournaments' component={Tournaments}/>
                <Route path='/updateproducts' component={UpdateProducts}/>
                <Route path='/deleteproducts' component={DeleteProducts}/>
                

              </Switch>

            </Router>
          </div>
          </AppContext.Provider>

      </div>
    );
  }
}


export default App;

