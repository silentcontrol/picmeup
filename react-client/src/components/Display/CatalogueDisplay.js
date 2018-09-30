import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import PropTypes from "prop-types";
import PopupContainer from "./PopupContainer";
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
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null
    };
  }

  componentDidMount() {
    fetch("/products")
      .then(dataWrappedByPromise => {
        console.log(dataWrappedByPromise);
        return dataWrappedByPromise.json();
      })
      .then(productList => {
        productList.forEach(product => {
          var row = document.createElement("tr");
          var dataName = document.createElement("td");
          var dataPrice = document.createElement("td");

          dataName.appendChild(document.createTextNode(product.product_name));
          const price = `\$${(product.price_in_cents / 100).toFixed(2)}`;
          dataPrice.appendChild(document.createTextNode(price));

          row.appendChild(dataName);
          row.appendChild(dataPrice);
          row.setAttribute("id", product.id);
          row.onclick = () => {
            this._getProductInfo(product);
          };

          document.querySelector(".productlist").appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }

  _getProductInfo = product => {
    console.log("row clicked");
    this.setState({
      showPopup: true,
      chosenProduct: product
    });
  };

  setQuery = value => {
    console.log(value);
    this.setState({ query: value });
  };

  searchProduct = () => {
    var productName = this.state.query;

    fetch("/search", {
      method: "POST",
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
          row.setAttribute("id", product.id);
          console.log("inside search product, product is:", product[0]);
          row.onclick = () => {
            this._getProductInfo(product[0]);
          };

          productList.appendChild(row);
        }
      })
      .catch(error => console.error(error));
  };

  _closeModal = () => {
    this.setState({
      showPopup: false,
      chosenProduct: null
    });
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

    const popup = this.state.showPopup ? (
      <PopupContainer
        open={this.state.showPopup}
        product={this.state.chosenProduct}
        closeModal={this._closeModal}
        addToCart={this.props.addToCart}
      />
    ) : null;

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
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody className="productlist" />
          </table>
        </section>

        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>

        {popup}
      </div>
    );
  }
}

export default SpeechRecognition(CatalogueDisplay);
