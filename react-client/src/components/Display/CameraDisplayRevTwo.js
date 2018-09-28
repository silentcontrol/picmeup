import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class CameraDisplayRevTwo extends Component {
  onTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    console.log(dataUri);
    document.querySelector("#camera--output").src = dataUri;
  }

  onCameraError(error) {
    console.error("onCameraError", error);
  }

  onCameraStart(stream) {
    console.log("onCameraStart");
  }

  onCameraStop() {
    console.log("onCameraStop");
  }

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
          idealResolution={{ width: 640, height: 480 }}
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

          <button id="camera--submit__photo">Submit</button>
        </div>
      </div>
    );
  }
}

export default CameraDisplayRevTwo;
