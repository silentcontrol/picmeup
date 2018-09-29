import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";
import Popup from "reactjs-popup";
var base64ToImage = require("base64-to-image");
var fs = require("file-system");

const API_HOST = "http://localhost:3001";
const API_NAMESPACE = "/annotations";
const BASEURL = `${API_HOST}${API_NAMESPACE}`;

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default class CameraDisplayRevTwo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null, open: false, result: null };
  }

  onTakePhoto(dataUri) {
    // Do stuff with the photo...

    console.log("takePhoto");
    console.log(dataUri);
    document.querySelector("#camera--output").src = dataUri;
    //document.querySelector("#camera--output--inputBox").src = dataUri;
    this.setState({ selectedFile: dataUri });
  }

  onCameraError(error) {
    console.error("onCameraError", error);
  }

  onCameraStart(stream) {
    console.log("onCameraStart");
    console.log(this.state.selectedFile);
  }

  onCameraStop() {
    console.log("onCameraStop");
    console.log(this.state.selectedFile);
  }

  onSubmitDataUriToServer = () => {
    console.log("Submit button pressed.");
    console.log(document.querySelector("#camera--output").src);

    let imgData = document.querySelector("#camera--output").src;

    const formData = new FormData();
    formData.append("image", imgData);

    axios.post("/annotations", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };
  renderPopup = () => {
    if (this.state.result === "not found") {
      return (
        <div className="pop-up">
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Not Found</div>
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
      );
    } else if (this.state.result === "found") {
      return (
        <div className="pop-up">
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Found</div>
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
      );
    }
  };
  uploadHandler = () => {
    console.log("uploadHandler is clicked.");
    console.log(this.state.selectedFile);

    var file = dataURLtoFile(this.state.selectedFile, "hello.jpeg");

    console.log("file is,", file);

    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("/annotations", formData)
      .then(result => {
        console.log("result is,", result.data.type);

        return result.data.type;
      })
      .then(result => {
        if (result === "not found") {
          console.log(result);

          this.setState({ open: true, result: "not found" });
        } else if (result === "found") {
        }
      });
  };

  openModal = () => {
    console.log("openModal.");
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="display">
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
          onCameraError={error => {
            this.onCameraError(error);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{ width: 1080, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={false}
          isImageMirror={false}
          isDisplayStartCameraError={true}
          sizeFactor={1}
          onCameraStart={stream => {
            this.onCameraStart(stream);
          }}
          onCameraStop={() => {
            this.onCameraStop();
          }}
        />

        <div style={{ display: "flex" }}>
          <img src="//:0" alt="" id="camera--output" className="taken" />

          <button onClick={this.uploadHandler}>Upload!</button>
        </div>

        <Popup
          open={this.state.open}
          modal
          closeOnDocumentClick
          contentStyle={{
            width: "auto",
            background: "none",
            border: "none"
          }}
        >
          {this.renderPopup}
        </Popup>
      </div>
    );
  }
}
