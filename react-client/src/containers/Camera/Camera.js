import React, { Component } from "react";
import Display from "../../components/Display/Display";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    console.log("Camera");
    return (
      <Fragment>
        <Display />
        <Navigation />
      </Fragment>
    );
  }
}
