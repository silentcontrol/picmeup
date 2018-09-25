import React, { Component } from "react";
import Camera from "./containers/Camera/Camera";
import Catalogue from "./containers/Catalogue/Catalogue";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path={"/camera"} component={Camera} />
          <Route exact path={"/catalogue"} component={Catalogue} />
          <Route exact path={"/shoppingcart"} component={ShoppingCart} />
        </div>
      </Router>
    );
  }
}
