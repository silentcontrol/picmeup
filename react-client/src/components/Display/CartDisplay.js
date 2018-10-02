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

const TableRow = ({ cartItem, deleteItem }) => {
  const { product, quantity } = cartItem;
  const price = (product.price_in_cents / 100).toFixed(2);

  return (
    <tr>
      <td>{product.product_name}</td>
      <td>{`\$${price}`}</td>
      <td>{quantity}</td>
      <td>{(price * quantity).toFixed(2)}</td>
      <td>
        <button onClick={() => deleteItem(product)}>Remove Item</button>
      </td>
    </tr>
  );
};

class CartDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null,
      currentCart: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      currentCart: this.props.cart,
      loading: false
    });
  }

  _submitOrder = () => {
    const { cart } = this.props;
    if (cart.length > 0) {
      axios({
        url: "http://www.toqianren.com/orders",
        method: "POST",
        headers: {
          "x-access-token": document.cookie
        },
        data: {
          orders: cart,
          user_ID: 2
        }
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  _deleteItem = cartItem => {
    console.log("deleteItem cartItem", cartItem);
    const { currentCart } = this.state;
    console.log("currentCart", currentCart);
    const newCart = currentCart.filter(
      item => item.product.product_name !== cartItem.product_name
    );
    console.log("newcart", newCart);
    this.setState({
      currentCart: newCart
    });
  };

  _closeModal = () => {
    this.setState({
      showPopup: false,
      chosenProduct: null
    });
  };

  render() {
    const tableRows = this.state.loading
      ? null
      : this.state.currentCart.map(cartItem => {
          return (
            <TableRow
              key={cartItem.product.id}
              cartItem={cartItem}
              deleteItem={this._deleteItem}
            />
          );
        });

    /**
     * const popup = this.state.showPopup ? (
      <PopupContainer
        open={this.state.showPopup}
        product={this.state.chosenProduct}
        closeModal={this._closeModal}
      />
    ) : null;
     */

    // console.log("cart is", currentCart);
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
                <th scope="col" />
              </tr>
            </thead>
            <tbody className="productlist">{tableRows}</tbody>
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
