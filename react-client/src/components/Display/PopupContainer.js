import React, { Component } from "react";
import Popup from "reactjs-popup";

export default class PopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  _addItemToCart = () => {
    console.log("PopupContainer _addItemToCart");
    const { addToCart, product } = this.props;
    const item = {
      quantity: this.state.quantity,
      product
    };
    addToCart(item);
    this.props.closeModal();
  };

  _increaseQuantity = () => {
    const newQuantity = this.state.quantity + 1;
    this.setState({
      quantity: newQuantity
    });
  };

  _decreaseQuantity = () => {
    let newQuantity = this.state.quantity;
    if (newQuantity > 1) {
      newQuantity--;
      this.setState({
        quantity: newQuantity
      });
    }
  };

  renderPopup = () => {
    if (!this.props.product) {
      return (
        <div className="pop-up">
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Not Found</div>
          </div>

          <div className="pop-up__bottom-row">
            <div
              className="button button__cancel"
              onClick={this.props.closeModal}
            >
              Cancel
            </div>
          </div>
        </div>
      );
    } else if (this.props.product) {
      const product = this.props.product ? this.props.product : null;
      const quantity = this.state.quantity;
      return (
        <div className="pop-up">
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">{product.product_name}</div>
            <div className="pop-up__product-price">
              ${product.price_in_cents / 100}
            </div>
          </div>
          <div className="pop-up__middle-row">
            <div className="pop-up__label">qty</div>
            <div className="button__container">
              <div
                className="button button__minus"
                onClick={this._decreaseQuantity}
              >
                -
              </div>
              <div className="pop-up__quantity">{quantity}</div>
              <div
                className="button button__plus"
                onClick={this._increaseQuantity}
              >
                +
              </div>
            </div>
          </div>
          <div className="pop-up__bottom-row">
            <div
              className="button button__cancel"
              onClick={this.props.closeModal}
            >
              Cancel
            </div>
            <div className="button button__add" onClick={this._addItemToCart}>
              Add
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <Popup
        open={this.props.open}
        modal
        onClose={this.props.closeModal}
        closeOnDocumentClick
        contentStyle={{
          width: "auto",
          background: "none",
          border: "none"
        }}
      >
        {this.renderPopup}
      </Popup>
    );
  }
}
