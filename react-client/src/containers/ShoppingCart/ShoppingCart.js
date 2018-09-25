import React, { Component } from "react";
import Display from "../../components/Display/Display";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class ShoppingCart extends Component {
  render() {
    console.log("ShoppingCart");
    return (
      <Fragment>
        <Display />
        <Navigation />
      </Fragment>
    );
  }
}
