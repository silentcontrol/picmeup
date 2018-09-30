import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Popup from "reactjs-popup";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";

import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import classNames from "classnames";

class HomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
      open: false
    };
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="display">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={event => this.openModal()}
        >
          Sign In
        </Button>
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
                {/* <Input
                  id="input-with-icon-username"
                  defaultValue="Enter Your Username"
                  startAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                /> */}
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-username">Username</InputLabel>
                  <Input
                    id="adornment-username"
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

                {/* <Input
                  id="input-with-icon-password"
                  defaultValue="Enter Your Password"
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  }
                /> */}
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={event => this.handleClick(event)}
              >
                Submit
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
