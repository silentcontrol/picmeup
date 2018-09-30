import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import axios from "axios";
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

class CartDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    cart.forEach(item => {
      var row = document.createElement("tr");
      var dataName = document.createElement("td");
      var dataPrice = document.createElement("td");
      var dataQty = document.createElement("td");
      var dataLineTotal = document.createElement("td");

      dataName.appendChild(document.createTextNode(item.product.product_name));
      const price = (item.product.price_in_cents / 100).toFixed(2);
      console.log("price:", price);
      console.log("quantity:", item.quantity);
      dataPrice.appendChild(document.createTextNode(`\$${price}`));
      dataQty.appendChild(document.createTextNode(item.quantity));
      dataLineTotal.appendChild(
        document.createTextNode(`\$${price * item.quantity}`)
      );

      row.appendChild(dataName);
      row.appendChild(dataPrice);
      row.appendChild(dataQty);
      row.appendChild(dataLineTotal);
      row.setAttribute("id", item.product.id);
      row.onclick = () => {
        this._getProductInfo(item);
      };

      document.querySelector(".productlist").appendChild(row);
    });
  }

  _submitOrder = () => {
    const { cart } = this.props;

    axios
      .post("/orders", {
        orders: cart,
        user_ID: 2
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
      cart
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    const popup = this.state.showPopup ? (
      <PopupContainer
        open={this.state.showPopup}
        product={this.state.chosenProduct}
        closeModal={this._closeModal}
      />
    ) : null;
    console.log("cart is", cart);
    return (
      <div className="display">
        <section className="product">
          <table>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Total</th>
              </tr>
            </thead>
            <tbody className="productlist" />
          </table>
        </section>
        <button className="button button__submit" onClick={this._submitOrder}>
          Submit
        </button>
      </div>
    );
  }
}

export default SpeechRecognition(CartDisplay);
