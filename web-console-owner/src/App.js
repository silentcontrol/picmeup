import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import LeftNavBar from './components/left_navbar/LeftNavBar'
import Orders from './components/orders/Orders'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentView: "orders"
    }
  }

  _getView = (view) => {
    this.setState = {
      currentView: view
    }
  }

  render() {
    return (
      <div className="body-container">
          <LeftNavBar getView={this._getView}/>
        <div className="orders-container">
          <Orders resource="orders" />
        </div>
      </div>
    );
  }
}

export default App;
