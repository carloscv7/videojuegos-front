import React from "react";
import {Switch, Route} from "react-router-dom"
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import PublishProductContainer from "./containers/PublishProductContainer";
import SearchResults from "./containers/SearchResults";
import SignupContainer from "./containers/SignupContainer";
import ProductsContainer from "./containers/ProductsContainer";
import ProductContainer from "./containers/ProductContainer";
import AccountContainer from "./containers/AccountContainer";
import SalesContainer from "./containers/SalesContainer";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeContainer}/>
        <Route exact path="/search/:pagenumber/:name?" component={SearchResults}/>
        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/signup" component={SignupContainer}/>
        <Route exact path="/publish-product" component={PublishProductContainer}/>
        <Route exact path="/products/:pagenumber/:name?" component={ProductsContainer}/>
        <Route exact path="/product/:id" component={ProductContainer} />
        <Route exact path="/account" component={AccountContainer} />
        <Route exact path="/sales" component={SalesContainer} />
    </Switch>
);

export default Routes;