import React from "react";
import Popup from "reactjs-popup";

// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };

// Access the device camera and stream to cameraView
function cameraStart() {
  navigator
    .getUserMedia(constraints)
    .then(function(stream) {
      let track = stream.getTracks()[0];
      document.querySelector("#camera--view").srcObject = stream;
    })
    .catch(function(error) {
      console.error("Oops. Something is broken.", error);
    });
}

// Start the video stream when the window loads
function loadWindow() {
  window.addEventListener("load", cameraStart(), false);
}

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

  cameraTriggerClicked = () => {
    document.querySelector("#camera--sensor").width = document.querySelector(
      "#camera--view"
    ).videoWidth;
    document.querySelector("#camera--sensor").height = document.querySelector(
      "#camera--view"
    ).videoHeight;
    document
      .querySelector("#camera--sensor")
      .getContext("2d")
      .drawImage(document.querySelector("#camera--view"), 0, 0);
    document.querySelector("#camera--output").src = document
      .querySelector("#camera--sensor")
      .toDataURL("image/webp");
    document.querySelector("#camera--output").classList.add("taken");
    document.querySelector("#camera--submit__photo").style.display = "block";
    document.querySelector("#camera--submit__photo").style["align-self"] =
      "center";
  };

  render() {
    return (
      <div className="display">
        <main id="camera">
          {/* <!-- Camera sensor --> */}
          <canvas id="camera--sensor" style={{ display: "none" }} />

          {/* <!-- Camera view --> */}
          <video id="camera--view" autoPlay playsInline />
          {loadWindow()}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {/* <!-- Camera output --> */}
            <img src="//:0" alt="" id="camera--output" />

            {/* <!-- Camera trigger --> */}
            <button id="camera--submit__photo" style={{ display: "none" }}>
              Submit
            </button>
          </div>

          {/* <!-- Camera trigger --> */}
          <button id="camera--trigger" onClick={this.cameraTriggerClicked}>
            Take a picture
          </button>
        </main>
        <Popup
          /*  trigger={
            <button className="button" style={{ gridRow: 3 }}>
              {" "}
              Open Modal{" "}
            </button>
          } */
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
