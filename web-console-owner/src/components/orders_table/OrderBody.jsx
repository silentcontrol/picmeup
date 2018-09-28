import React, { Component } from 'react';

import OrderRow from './OrderRow';

// const OrderRow = ({ order, getOrderId }) => {
//   const _onClickHander = (e) => {
//     getOrderId()
//   }

//   return (
//     <tr id={order.id} onClick={_onClickHander}>
//       <td>{order.id}</td>
//       <td>{order.user_email}</td>
//       <td className="last">${(order.total_cents / 100).toFixed(2)}</td>
//     </tr>
//   )
// }

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
