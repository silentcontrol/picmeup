import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  withStyles,
  Card,
  CardContent,
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

/* const TableRow = ({ cartItem, deleteItem }) => {
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
}; */

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgb(84, 105, 228)",
    color: theme.palette.common.white,
    fontSize: "1.6rem"
  },
  body: {
    fontSize: "1.2rem"
  },
  root: { paddingRight: "1rem", textAlign: "center" }
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
/* 
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
]; */
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
    const { classes } = this.props;
    /*   const tableRows = this.state.loading
      ? null
      : this.state.currentCart.map(cartItem => {
          return (
            <TableRow
              key={cartItem.product.id}
              cartItem={cartItem}
              deleteItem={this._deleteItem}
            />
          );
        }); */
    let linkStyle;
    if (this.state.hover) {
      linkStyle = {
        backgroundColor: "rgb(63, 81, 181)"
      };
    } else {
      linkStyle = {
        backgroundColor: "rgb(84, 105, 228)"
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
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.currentCart.map(cartItem => {
                  return (
                    <TableRow className={classes.row} key={cartItem.product.id}>
                      <CustomTableCell component="th" scope="row">
                        {cartItem.product.product_name}
                      </CustomTableCell>
                      <CustomTableCell numeric>
                        ${(cartItem.product.price_in_cents / 100).toFixed(2)}
                      </CustomTableCell>
                      <CustomTableCell numeric>
                        {cartItem.quantity}
                      </CustomTableCell>
                      <CustomTableCell numeric>
                        $
                        {(
                          (cartItem.product.price_in_cents / 100).toFixed(2) *
                          cartItem.quantity
                        ).toFixed(2)}
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
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
                  marginLeft: "1rem",
                  color: "white"
                }}
              >
                Place Order
              </Typography>
            </Button>
          </CardActions>
        </Paper>
        {/* <div className="display">
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
      </div> */}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CartDisplay);
