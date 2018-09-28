import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class CatalogueDisplay extends Component {
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="display">
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
      </div>
    );
  }
}

export default SpeechRecognition(CatalogueDisplay);
