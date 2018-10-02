import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";
import { Redirect, BrowserRouter } from "react-router";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import SearchBar from "material-ui-search-bar";

import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";

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
  withStyles
} from "@material-ui/core";
import axios from "axios";
import classNames from "classnames";

class HomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      password: "",
      email: "",
      weight: "",
      weightRange: "",
      showPassword: false,
      open: false,
      redirect: false,
      register: false
    };
  }

  componentDidMount() {
    fetch("/products")
      .then(dataWrappedByPromise => {
        console.log(dataWrappedByPromise);
        return dataWrappedByPromise.json();
      })
      .then(productList => {
        productList.slice(9).forEach(product => {
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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  userSignIn = () => {
    console.log("userSignIn");
    console.log("email is,", this.state.email);
    console.log("password is,", this.state.password);

    axios
      .post("http://www.toqianren.com/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        document.cookie = response.data.token;
        this.setState({ redirect: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  redirectToRegister = () => {
    this.setState({ register: true });
  };

  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const { redirect, register } = this.state;

    if (redirect) {
      return <Redirect to="/catalogue" />;
    } else if (register) {
      this.setState({ register: false });
      return <Redirect to="/register" />;
    }
    return (
      <div className="display display__home">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={event => this.openModal()}
        >
          Sign In
        </Button>

        <h1 className="header__primary">Welcome.</h1>
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
              width: "100%"
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
            <tbody className="productlist"> </tbody>
          </table>
        </section>
        <Popup
          open={this.state.open}
          modal
          onClose={this.closeModal}
          closeOnDocumentClick
          contentStyle={{
            width: "auto",
            background: "none",
            border: "none"
          }}
        >
          <MuiThemeProvider>
            <div className="pop-up__signin">
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    SIGN IN
                  </Typography>
                </Toolbar>
              </AppBar>
              <FormControl
                className={classes.margin}
                style={{ position: "initial", padding: "1rem" }}
              >
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-email">Email</InputLabel>
                  <Input
                    id="adornment-email"
                    onChange={this.handleChange("email")}
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle style={{ marginRight: "1.2rem" }} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={event => this.userSignIn(event)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={event => this.redirectToRegister(event)}
              >
                Register
              </Button>
            </div>
          </MuiThemeProvider>
        </Popup>
      </div>
    );
  }
}
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
export default withStyles(styles)(HomeDisplay);
