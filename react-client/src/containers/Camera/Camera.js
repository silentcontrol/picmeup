import React, { Component } from "react";
import { Link } from "react-router-dom";
import Display from "../../components/Display/Display";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    const {} = this.props;
    console.log("Camera");
    return (
      <Fragment>
        <Display />
        <Navigation activeButton={"camera"} />
      </Fragment>
    );
  }
}
