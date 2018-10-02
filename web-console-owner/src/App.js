import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import LeftNavBar from './components/left_navbar/LeftNavBar'
import Orders from './components/orders/Orders'
import Search from './components/orders/Search'
import AddProduct from './components/orders/AddProduct'

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
        <LeftNavBar/>
          <div className="orders-container">
            <Route exact path={"/orders"} component={()=><Orders resource="orders"/>} />
            <Route exact path={"/history"} component={()=><Orders resource="history"/>} />
            <Route exact path={"/search"} component={() => <Search resource="search" />} />
            <Route exact path={"/addProduct"} component={() => <AddProduct resource="addProduct" />} />
          </div>
      </div>
    );
  }
}

export default App;
