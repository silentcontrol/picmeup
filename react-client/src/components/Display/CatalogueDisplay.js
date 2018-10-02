import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import PopupContainer from "./PopupContainer";

import {
  Typography,
  Paper,
  withStyles,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar
} from "@material-ui/core";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
class CatalogueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null,
      allProducts: null,
      hover: false
    };
  }
  componentDidMount() {
    fetch("http://www.toqianren.com/products", {
      headers: new Headers({
        "x-access-token": document.cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    })
      .then(dataWrappedByPromise => {
        console.log("dataWrappedByPromise", dataWrappedByPromise);
        return dataWrappedByPromise.json();
      })
      .then(productList => {
        console.log(productList);
        this.setState({ allProducts: productList });
      })
      .catch(error => console.error(error));
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  _generateTableRow = () => {
    const { classes } = this.props;

    let linkStyle;
    if (this.state.hover) {
      linkStyle = {
        width: "100%",
        backgroundImage:
          "linear-gradient(to right bottom, rgb(63, 81, 181, 0.85), rgb(63, 81, 181, 0.85))"
      };
    } else {
      linkStyle = {
        width: "100%",
        backgroundImage:
          "linear-gradient(to right bottom, rgb(84, 105, 228,0.75), rgb(84, 105, 228,0.75))"
      };
    }

    return this.state.allProducts.map((product, index) => {
      const price = `\$${(product.price_in_cents / 100).toFixed(2)}`;
      return (
        <Card
          className={classes.card}
          style={{
            width: "100%",
            minWidth: "initial",
            marginTop: "1rem"
          }}
          key={index}
          onClick={() => this._getProductInfo(product)}
        >
          <CardActionArea
            style={linkStyle}
            onMouseEnter={() => this.toggleHover}
            onMouseLeave={() => this.toggleHover}
            key={index}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
              key={index}
            >
              <Typography
                variant="display2"
                component="h2"
                style={{ color: "white" }}
                key={index}
              >
                {product.product_name}
              </Typography>
              <Typography
                variant="display2"
                component="h2"
                style={{ color: "white" }}
                key={index}
              >
                {price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  };

  _getProductInfo = product => {
    console.log("row clicked");
    console.log(product);
    this.setState({
      showPopup: true,
      chosenProduct: product
    });
  };

  setQuery = value => {
    console.log(value);
    if (value.length === 0) {
      fetch("http://www.toqianren.com/products", {
        headers: new Headers({
          "x-access-token": document.cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        })
      })
        .then(dataWrappedByPromise => {
          console.log("dataWrappedByPromise", dataWrappedByPromise);
          return dataWrappedByPromise.json();
        })
        .then(productList => {
          console.log(productList);
          this.setState({ allProducts: productList });
        })
        .catch(error => console.error(error));
    }
    this.setState({ query: value });
  };

  searchProduct = () => {
    var productName = this.state.query;

    fetch("http://www.toqianren.com/search", {
      method: "POST",
      headers: {
        "x-access-token": document.cookie,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ product: productName }) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(product => {
        if (product.length === 0) {
          alert("product cannot be found");
        } else {
          this.setState({ allProducts: product });
          /* var productList = document.querySelector(".productlist");

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

          console.log("inside search product, product is:", product[0]);
          row.onclick = () => {
            this._getProductInfo(product[0]);
          };

          productList.appendChild(row); */
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
    const { classes } = this.props;
    const popup = this.state.showPopup ? (
      <PopupContainer
        open={this.state.showPopup}
        product={this.state.chosenProduct}
        closeModal={this._closeModal}
        addToCart={this.props.addToCart}
      />
    ) : null;

    const renderProductList = this.state.allProducts
      ? this._generateTableRow(classes)
      : null;

    return (
      <div className="display">
        <AppBar
          position="static"
          style={{ backgroundColor: "#3f51b5", color: "white" }}
        >
          <Toolbar>
            <Typography variant="display1" color="inherit">
              CATAOGUE
            </Typography>
          </Toolbar>
        </AppBar>
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
        <section
          className="product"
          style={{
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
            height: "100%",
            marginTop: "2rem"
          }}
        >
          <Paper
            style={{
              boxShadow: "none",
              width: "75%"
            }}
          >
            {renderProductList}
          </Paper>
        </section>

        {popup}
      </div>
    );
  }
}

export default withStyles(styles)(CatalogueDisplay);
