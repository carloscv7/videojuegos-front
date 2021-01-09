import React from "react";
import {Switch, Route} from "react-router-dom"
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import SearchResults from "./containers/SearchResults";
import SignupContainer from "./containers/SignupContainer";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeContainer}/>
        <Route exact path="/search" component={SearchResults}/>
        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/signup" component={SignupContainer}/>
    </Switch>
);

export default Routes;