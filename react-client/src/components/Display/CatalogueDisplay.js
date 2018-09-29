import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import PropTypes from "prop-types";
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

class CatalogueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { query: null };
  }

  /*   listProducts = () => {
    // list all products and their price
    fetch("/products")
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(productList => {
        productList.forEach(product => {
          var row = document.createElement("tr");
          var dataName = document.createElement("td");
          var dataPrice = document.createElement("td");

          dataName.appendChild(document.createTextNode(product.product_name));
          dataPrice.appendChild(
            document.createTextNode(product.price_in_cents)
          );

          row.appendChild(dataName);
          row.appendChild(dataPrice);

          document.querySelector(".productlist").appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }; */
  setQuery = value => {
    console.log(value);
    this.setState({ query: value });
  };
  searchProduct = () => {
    /*  var productName = document.getElementById("searchfield").value; */
    var productName = this.state.query;

    fetch("/search", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ product: productName }) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(product => {
        if (product.length === 0) {
          alert("product cannot be found");
        } else {
          var productList = document.querySelector(".productlist");

          // clear product list table
          while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
          }

          var row = document.createElement("tr");
          var dataName = document.createElement("td");
          var dataPrice = document.createElement("td");

          dataName.appendChild(
            document.createTextNode(product[0].product_name)
          );
          dataPrice.appendChild(
            document.createTextNode(product[0].price_in_cents)
          );

          row.appendChild(dataName);
          row.appendChild(dataPrice);

          productList.appendChild(row);
        }
      })
      .catch(error => console.error(error));
  };

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
            onChange={value => {
              console.log("onChange");
              this.setQuery(value);
            }}
            onRequestSearch={() => {
              console.log("onRequestSearch");
              this.searchProduct();
            }}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
          />
        </MuiThemeProvider>
        <section className="product">
          <table>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
            </tr>
            <tbody className="productlist" />
          </table>
        </section>

        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>
      </div>
    );
  }
}

export default SpeechRecognition(CatalogueDisplay);
