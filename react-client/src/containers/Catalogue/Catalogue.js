import React, { Component } from "react";
import Display from "../../components/Display/Display";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class Catalogue extends Component {
  render() {
    const {} = this.props;
    console.log("Catalogue");
    return (
      <Fragment>
        <Display />
        <Navigation activeButton={"catalogue"} />
      </Fragment>
    );
  }
}
