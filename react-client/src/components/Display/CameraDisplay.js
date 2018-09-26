import React from "react";
import Popup from "reactjs-popup";

export default class CameraDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="display">
        <Popup
          trigger={
            <button className="button" style={{ gridRow: 3 }}>
              {" "}
              Open Modal{" "}
            </button>
          }
          modal
          closeOnDocumentClick
          contentStyle={{
            width: "auto",
            background: "none",
            border: "none"
          }}
        >
          <div className="pop-up">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
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
        </Popup>
      </div>
    );
  }
}
