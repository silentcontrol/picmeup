import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import axios from "axios";

class CatalogueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { query: null };
  }
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
        <MuiThemeProvider>
          <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
          />
        </MuiThemeProvider>
        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>
      </div>
    );
  }
}

export default SpeechRecognition(CatalogueDisplay);
