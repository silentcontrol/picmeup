import React, { Component } from "react";
import { Link } from "react-router-dom";
import CameraDisplay from "../../components/Display/CameraDisplay";
import Navigation from "../../components/Navigation/Navigation";

const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    const {} = this.props;
    console.log("Camera");
    return (
      <Fragment>
        <CameraDisplay />
        <Navigation activeButton={"camera"} />
      </Fragment>
    );
  }
}
