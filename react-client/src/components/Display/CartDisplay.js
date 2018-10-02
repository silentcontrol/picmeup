import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  withStyles,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Button
} from "@material-ui/core";

import { Add, Delete } from "@material-ui/icons";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgb(84, 105, 228)",
    color: theme.palette.common.white,
    fontSize: "1.6rem"
  },
  body: {
    fontSize: "1.2rem"
  },
  root: { textAlign: "center", padding: "0" }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  table: {
    width: "100%"
  }
});

class CartDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      showPopup: false,
      chosenProduct: null,
      currentCart: [],
      loading: true,
      hover: false
    };
  }

  componentDidMount() {
    this.setState({
      currentCart: this.props.cart,
      loading: false
    });
  }
  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  _submitOrder = () => {
    const { cart } = this.props;
    if (cart.length > 0) {
      axios({
        url: "/orders",
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
    const { currentCart } = this.state;

    const newCart = currentCart.filter(
      item => item.product.product_name !== cartItem.product.product_name
    );

    this.props.updateCart(newCart);
  };

  _closeModal = () => {
    this.setState({
      showPopup: false,
      chosenProduct: null
    });
  };

  _increaseQuantity = event => {
    const id = event.target.id;

    let oldCart = [...this.state.currentCart];
    let oldQuantity = oldCart[id].quantity;

    let newQuantity = oldQuantity + 1;
    oldCart[id].quantity = newQuantity;
    let updatedCart = oldCart;
    this.setState({
      currentCart: updatedCart
    });
  };

  _decreaseQuantity = event => {
    const id = event.target.id;
    let oldCart = [...this.state.currentCart];
    let oldQuantity = oldCart[id].quantity;
    if (oldQuantity > 1) {
      let newQuantity = oldQuantity - 1;
      oldCart[id].quantity = newQuantity;
      let updatedCart = oldCart;

      this.setState({
        currentCart: updatedCart
      });
    }
  };

  render() {
    const { classes } = this.props;

    let linkStyle;
    if (this.state.hover) {
      linkStyle = {
        backgroundColor: "rgb(63, 81, 181)",
        width: "30rem"
      };
    } else {
      linkStyle = {
        backgroundColor: "rgb(84, 105, 228)",
        width: "30rem"
      };
    }

    return (
      <Fragment>
        <Paper className="display">
          <AppBar
            position="static"
            style={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            <Toolbar>
              <Typography variant="display1" color="inherit">
                SHOPPING CART
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Product</CustomTableCell>
                  <CustomTableCell numeric>Price</CustomTableCell>
                  <CustomTableCell numeric>Quantity</CustomTableCell>
                  <CustomTableCell numeric>Unit Total</CustomTableCell>
                  <CustomTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.currentCart.map((cartItem, index) => {
                  return (
                    <TableRow className={classes.row}>
                      <CustomTableCell component="th" scope="row">
                        {cartItem.product.product_name}
                      </CustomTableCell>
                      <CustomTableCell numeric>
                        ${(cartItem.product.price_in_cents / 100).toFixed(2)}
                      </CustomTableCell>
                      <CustomTableCell
                        numeric
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          paddingBottom: "1rem",
                          paddingTop: "1rem"
                        }}
                      >
                        <Button
                          variant="fab"
                          mini
                          aria-label="Minus"
                          className={classes.button}
                          id={index}
                          onClick={this._increaseQuantity}
                        >
                          <Add style={{ color: "white" }} />
                        </Button>
                        {cartItem.quantity}
                        <Button
                          variant="fab"
                          mini
                          aria-label="Add"
                          className={classes.button}
                          id={index}
                          onClick={this._decreaseQuantity}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path fill="white" d="M19 13H5v-2h14v2z" />
                          </svg>
                        </Button>
                      </CustomTableCell>
                      <CustomTableCell numeric>
                        $
                        {(
                          (cartItem.product.price_in_cents / 100).toFixed(2) *
                          cartItem.quantity
                        ).toFixed(2)}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          onClick={() => this._deleteItem(cartItem)}
                        >
                          <Delete className={classes.rightIcon} />
                        </Button>
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          {this.state.currentCart.length > 0 ? (
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "2rem",
                paddingTop: "2rem"
              }}
            >
              <Button
                variant="extendedFab"
                aria-label="Place Order"
                className={classes.button}
                style={linkStyle}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this._submitOrder}
              >
                <Typography
                  variant="headline"
                  component="h2"
                  style={{
                    margin: "initial",
                    color: "white"
                  }}
                >
                  Place Order
                </Typography>
              </Button>
            </CardActions>
          ) : null}
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CartDisplay);
