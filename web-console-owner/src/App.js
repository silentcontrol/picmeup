import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import LeftNavBar from './components/left_navbar/LeftNavBar'
import Orders from './components/orders_table/Orders'

class App extends Component {

  renderOrders = () => {
    return (<Orders />);
  }

  render() {
    return (
      <div className="body-container">
        <Router>
          <LeftNavBar />
        </Router>
        <div className="orders-container">
          <Route path="/orders" render={this.renderOrders}/>
        </div>
      </div>
    );
  }
}

export default App;
