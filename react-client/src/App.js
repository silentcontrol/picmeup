import React, { Component } from "react";
import Camera from "./containers/Camera/Camera";
import Catalogue from "./containers/Catalogue/Catalogue";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  addToCart = product => {
    const updatedCart = this.state.cart;
    updatedCart.push(product);
    this.setState({ cart: updatedCart });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Route
            exact
            path={"/camera"}
            component={() => <Camera addToCart={this.addToCart} />}
          />
          <Route
            exact
            path={"/catalogue"}
            component={() => (
              <Catalogue addToCart={this.addToCart} cart={this.state.cart} />
            )}
          />
          <Route
            exact
            path={"/shoppingcart"}
            component={() => <ShoppingCart cart={this.state.cart} />}
          />
        </div>
      </Router>
    );
  }
}
