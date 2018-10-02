import React, { Component } from "react";
import Popup from "reactjs-popup";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
  ListItem,
  List,
  TextField,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Paper,
  Grid,
  withStyles,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Icon,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";

import red from "@material-ui/core/colors/red";
import { Add, Navigation, AddShoppingCart } from "@material-ui/icons";

const styles = theme => ({
  card: {
    width: "100%"
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  }
});

class PopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      hover: false,
      hoverTwo: false,
      hoverThree: false
    };
  }
  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  toggleHoverTwo = () => {
    this.setState({ hoverTwo: !this.state.hoverTwo });
  };
  toggleHoverThree = () => {
    this.setState({ hoverThree: !this.state.hoverThree });
  };

  _addItemToCart = () => {
    console.log("PopupContainer _addItemToCart");
    const { addToCart, product } = this.props;
    const item = {
      quantity: this.state.quantity,
      product
    };
    addToCart(item);
    this.props.closeModal();
  };

  _increaseQuantity = () => {
    const newQuantity = this.state.quantity + 1;
    this.setState({
      quantity: newQuantity
    });
  };

  _decreaseQuantity = () => {
    let newQuantity = this.state.quantity;
    if (newQuantity > 1) {
      newQuantity--;
      this.setState({
        quantity: newQuantity
      });
    }
  };

  renderPopup = () => {
    if (!this.props.product) {
      return (
        <div className="pop-up">
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Not Found</div>
          </div>

          <div className="pop-up__bottom-row">
            <div
              className="button button__cancel"
              onClick={this.props.closeModal}
            >
              Cancel
            </div>
          </div>
        </div>
      );
    } else if (this.props.product) {
      const product = this.props.product ? this.props.product : null;
      const quantity = this.state.quantity;
      const { classes } = this.props;

      let linkStyle, linkStyleTwo, linkStyleThree;
      if (this.state.hover) {
        linkStyle = {
          backgroundColor: "rgb(63, 81, 181)",
          marginRight: "1rem"
        };
      } else {
        linkStyle = {
          backgroundColor: "rgb(84, 105, 228)",
          marginRight: "1rem"
        };
      }

      if (this.state.hoverTwo) {
        linkStyleTwo = {
          backgroundColor: "rgb(63, 81, 181)",
          marginLeft: "1rem"
        };
      } else {
        linkStyleTwo = {
          backgroundColor: "rgb(84, 105, 228)",
          marginLeft: "1rem"
        };
      }

      if (this.state.hoverThree) {
        linkStyleThree = {
          backgroundColor: "rgb(63, 81, 181)"
        };
      } else {
        linkStyleThree = {
          backgroundColor: "rgb(84, 105, 228)"
        };
      }
      return (
        <Paper
          style={{
            boxShadow: "none",
            width: "100%",
            marginTop: "1rem"
          }}
        >
          <Card
            className={classes.card}
            style={{
              width: "100%",
              minWidth: "initial",
              marginTop: "1rem"
            }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "rgb(84, 105, 228)"
              }}
            >
              <Typography
                variant="display1"
                component="h2"
                style={{
                  color: "white",
                  textTransform: "uppercase"
                }}
              >
                {product.product_name}
              </Typography>
              <Typography
                variant="display1"
                component="h2"
                style={{
                  color: "white",
                  textTransform: "uppercase"
                }}
              >
                ${(product.price_in_cents / 100).toFixed(2) * quantity}
              </Typography>
            </CardContent>

            <CardActions style={{ padding: "3rem 1.5rem 2rem" }}>
              <CardContent
                style={{
                  paddingTop: "0",
                  paddingBottom: "0",
                  display: "flex",
                  alignItems: "center",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                  boxShadow: "1px 1px 8px 1px #888888",
                  paddingLeft: "0",
                  paddingRight: "1rem",
                  borderTopLeftRadius: "1rem",
                  borderBottomLeftRadius: "1rem"
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgb(84, 105, 228)",
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    marginRight: "1rem"
                  }}
                >
                  <Typography
                    variant="display2"
                    component="h2"
                    style={{ color: "white" }}
                  >
                    QTY
                  </Typography>
                </CardContent>
                <Button
                  variant="fab"
                  mini
                  style={linkStyle}
                  onMouseEnter={this.toggleHover}
                  onMouseLeave={this.toggleHover}
                  aria-label="Add"
                  className={classes.button}
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
                <Typography
                  variant="display2"
                  component="h2"
                  style={{
                    margin: "initial"
                  }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="fab"
                  mini
                  style={linkStyleTwo}
                  onMouseEnter={this.toggleHoverTwo}
                  onMouseLeave={this.toggleHoverTwo}
                  aria-label="Minus"
                  className={classes.button}
                  onClick={this._increaseQuantity}
                >
                  <Add style={{ color: "white" }} />
                </Button>
              </CardContent>
            </CardActions>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "2rem"
              }}
            >
              <Button
                variant="extendedFab"
                aria-label="Add to shopping cart"
                className={classes.button}
                style={linkStyleThree}
                onMouseEnter={this.toggleHoverThree}
                onMouseLeave={this.toggleHoverThree}
                onClick={this._addItemToCart}
              >
                <AddShoppingCart
                  style={{
                    color: "white"
                  }}
                />
                <Typography
                  variant="headline"
                  component="h2"
                  style={{
                    margin: "initial",
                    marginLeft: "1rem",
                    color: "white"
                  }}
                >
                  Add To Cart
                </Typography>
              </Button>
            </CardActions>
          </Card>
        </Paper>
      );
    }
    /* return (
        <div className="pop-up">
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">{product.product_name}</div>
            <div className="pop-up__product-price">
              ${(product.price_in_cents / 100).toFixed(2)}
            </div>
          </div>
          <div className="pop-up__middle-row">
            <div className="pop-up__label">qty</div>
            <div className="button__container">
              <div
                className="button button__minus"
                onClick={this._decreaseQuantity}
              >
                -
              </div>
              <div className="pop-up__quantity">{quantity}</div>
              <div
                className="button button__plus"
                onClick={this._increaseQuantity}
              >
                +
              </div>
            </div>
          </div>
          <div className="pop-up__bottom-row">
            <div
              className="button button__cancel"
              onClick={this.props.closeModal}
            >
              Cancel
            </div>
            <div className="button button__add" onClick={this._addItemToCart}>
              Add
            </div>
          </div>
        </div>
      ); */
  };

  render() {
    return (
      <Popup
        open={this.props.open}
        modal
        onClose={this.props.closeModal}
        closeOnDocumentClick
        contentStyle={{
          width: "auto",
          background: "none",
          border: "none",
          top: "20%",
          left: "50%",
          transform: "translateX(-53%)",
          margin: "initial"
        }}
      >
        {this.renderPopup}
      </Popup>
    );
  }
}

export default withStyles(styles)(PopupContainer);
