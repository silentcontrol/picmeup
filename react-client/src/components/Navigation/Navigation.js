import React, { Component } from "react";

export default class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="camera active">
          <div className="header__secondary">Cam</div>
        </div>
        <div className="catalogue">
          <div className="header__secondary">Cata</div>
        </div>
        <div className="shopping-cart">
          <div className="header__secondary">Cart</div>
        </div>
      </section>
    );
  }
}
