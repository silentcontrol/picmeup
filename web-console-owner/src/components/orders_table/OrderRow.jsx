import React, { Component } from 'react';

export default class OrderRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderId: this.props.order.id
    }
  }

  _onClickHandler = () => {
    console.log(this.state.orderId)
    this.props.getOrderId(this.state.orderId);
  }

  render(){
    const order = this.props.order;
    return(
      <tr id={order.id} onClick={this._onClickHandler}>
        <td>{order.id}</td>
        <td>{order.email}</td>
        <td className="last">${(order.order_total / 100).toFixed(2)}</td>
      </tr>
    )
  }
}