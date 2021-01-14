import './App.css';
import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Routes from './Routes';
import AppContext from './AppContext';
import {logout} from "./services/userWs";
import Landing from './Landing';
import NavbarCM from "./components/NavbarCM";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeCM from './components/pages/HomeCM';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import RegisterT from './components/pages/RegisterT';



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



              <Navbar user={state.user}></Navbar>
              <Routes></Routes>
              
              <p className="pstyle">Esta va a ser la Landing Page</p>
              
              <br/>
              <br/>
              <br/>
            </div>
          </AppContext.Provider>

          <div>
            <Router>
              <NavbarCM/>
              <Switch>
                <Route path='/' exact component={HomeCM}/>
                <Route path='/services' component={Services}/>
                <Route path='/products' component={Products}/>
                <Route path='/sing-up' component={SignUp}/>
                <Route path='/inscription' component={RegisterT}/>
              </Switch>

            </Router>
            
            
          </div>

      </div>
    );
  }
}


export default App;

