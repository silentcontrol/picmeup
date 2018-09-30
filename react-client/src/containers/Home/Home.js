import React, { Component } from "react";
import HomeDisplay from "../../components/Display/HomeDisplay";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    const {} = this.props;
    console.log("Home");
    return (
      <Fragment>
        <HomeDisplay />
      </Fragment>
    );
  }
}
