import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "material-ui";
import Table from "material-ui/Table/Table";
import TableBody from "material-ui/Table/TableBody";
import TableRowColumn from "material-ui/Table/TableRowColumn";
import TableHeader from "material-ui/Table/TableHeader";
import TableRow from "material-ui/Table/TableRow";
import Paper from "material-ui";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

class CatalogueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { query: null };
  }
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      classes
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

          <Table className="table">
            <TableHeader>
              <TableRow>
                <TableRowColumn>Dessert (100g serving)</TableRowColumn>
                <TableRowColumn numeric>Calories</TableRowColumn>
                <TableRowColumn numeric>Fat (g)</TableRowColumn>
                <TableRowColumn numeric>Carbs (g)</TableRowColumn>
                <TableRowColumn numeric>Protein (g)</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableRowColumn component="th" scope="row">
                      {row.name}
                    </TableRowColumn>
                    <TableRowColumn numeric>{row.calories}</TableRowColumn>
                    <TableRowColumn numeric>{row.fat}</TableRowColumn>
                    <TableRowColumn numeric>{row.carbs}</TableRowColumn>
                    <TableRowColumn numeric>{row.protein}</TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
