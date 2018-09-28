import React, { Component } from 'react';

import OrderRow from './OrderRow';

export default class OrderBody extends Component {
  constructor(){
    super()
    this.state = {
      show: false
    }
  }

  render(){
    const thisOrders = this.props.orders;
    const orders = thisOrders.map(order => {
      return (<OrderRow key={order.id} order={order} getOrderId={ this.props.getOrderId } />)
    })

    return(
      <tbody>
        { orders }
      </tbody>
    )
  }
}
