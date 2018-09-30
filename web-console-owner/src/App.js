import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
        <LeftNavBar/>
          <div className="orders-container">
            <Route exact path={"/orders"} component={()=><Orders resource="orders"/>}/>
            <Route exact path={"/history"} component={()=><Orders resource="history"/>}/>
          </div>
      </div>
    );
  }
}

export default App;
