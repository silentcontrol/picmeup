import React, { Component } from "react";

export class Display extends Component {
  render() {
    return (
      <section className="display">
        <div className="pop-up">
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Apple</div>
            <div className="pop-up__product-price">$3.99</div>
          </div>
          <div className="pop-up__middle-row">
            <div className="pop-up__label">qty</div>
            <div className="button__container">
              <div className="button button__minus">-</div>
              <div className="pop-up__quantity">1</div>
              <div className="button button__plus">+</div>
            </div>
          </div>
          <div className="pop-up__bottom-row">
            <div className="button button__cancel">Cancel</div>
            <div className="button button__cancel">Add</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Display;
