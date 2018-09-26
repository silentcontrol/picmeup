import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import './App.css';

import LeftNavBar from './components/left_navbar/LeftNavBar'

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <LeftNavBar />
        <div>
          <p>Placeholder</p>
        </div>
      </div>
    );
  }
}

export default App;
