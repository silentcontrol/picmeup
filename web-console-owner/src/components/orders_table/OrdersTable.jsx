import React, { Component } from 'react';

class Orders extends Component {
  constructor(){
    super()
    this.state = {
      orders: [{
        id: 1,
        total_cents: 999,
        user_email: 'kyla_yugi@yahoo.com'
      }],
      loading: true
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div></div>
    )
  }
}