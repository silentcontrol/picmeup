import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import PopupContainer from "./PopupContainer";

const TableRow = ({ product, getProductInfo }) => {
  const price = `\$${(product.price_in_cents / 100).toFixed(2)}`;

  return (
    <tr onClick={() => getProductInfo(product)}>
      <td>{product.id}</td>
      <td>{product.product_name}</td>
      <td>{price}</td>
    </tr>
  );
};
class CatalogueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null,
      allProducts: null
    };
  }
  componentDidMount() {
    fetch("/products", {
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

  _generateTableRow = () => {
    return this.state.allProducts.map(product => {
      return (
        <TableRow
          getProductInfo={this._getProductInfo}
          key={product.id}
          product={product}
        />
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
    this.setState({ query: value });
  };

  searchProduct = () => {
    var productName = this.state.query;

    fetch("/search", {
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
    const {} = this.props;

    const popup = this.state.showPopup ? (
      <PopupContainer
        open={this.state.showPopup}
        product={this.state.chosenProduct}
        closeModal={this._closeModal}
        addToCart={this.props.addToCart}
      />
    ) : null;

    const renderProductList = this.state.allProducts
      ? this._generateTableRow()
      : null;

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
            <tbody className="productlist"> {renderProductList}</tbody>
          </table>
        </section>

        {popup}
      </div>
    );
  }
}

export default CatalogueDisplay;
