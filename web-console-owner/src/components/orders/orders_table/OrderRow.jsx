import React, { Component } from 'react';

export default class OrderRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderId: this.props.order.id
    }
  }

  render(){
    const order = this.props.order;
    return(
      <tr id={order.id} onClick={()=>this.props.getOrderId(order.id)}>
        <td>{order.id}</td>
        <td>{order.email}</td>
        <td className="last">${(order.order_total / 100).toFixed(2)}</td>
      </tr>
    )
  }
}