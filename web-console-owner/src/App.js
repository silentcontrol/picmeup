import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import './App.css';

import LeftNavBar from './components/left_navbar/LeftNavBar'
import Orders from './components/orders_table/Orders'

class App extends Component {
  render() {
    return (
      <div className="body-container">
        <LeftNavBar />
        <Orders />
      </div>
    );
  }
}

export default App;
