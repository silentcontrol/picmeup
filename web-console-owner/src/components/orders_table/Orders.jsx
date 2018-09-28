import React, { Component } from 'react';
import OrderTable from './OrderTable'
import OrderInfo from './OrderInfo'

const Loading = () => {
  return(
    <tr>
      <td className="span-all">Loading</td>
    </tr>
  )
}

export default class Orders extends Component {
  constructor(){
    super()
    this.state = {
      orders: [],
      loading: true,
      showOrder: false,
      currentOrder: null
    }
  }

  componentDidMount(){
    this.setState({
      orders: [
        {
          id: 1,
          total_cents: 999,
          user_email: 'kyla_yugi@yahoo.com'
        },
        {
          id: 2,
          total_cents: 1000,
          user_email: 'kyla.palos@gmail.com'
        },
        {
          id: 3,
          total_cents: 999,
          user_email: 'kyla_yugi@yahoo.com'
        },
        {
          id: 4,
          total_cents: 1000,
          user_email: 'kyla.palos@gmail.com'
        }
      ],
      loading: false
    });
  }

  _getOrderId = (id) => {
    this.setState({
      currentOrder: this.state.orders[0],
      showOrder: true
    })
  }

  render(){
    const orderTable = this.state.loading ? (<Loading />) :
      <OrderTable getOrderId={this._getOrderId} orders={this.state.orders} />
    const orderDetails = (this.state.showOrder && !this.state.loading) ?
                          (<OrderInfo order={this.state.orders[0]} />) :
                          (null);
    return(
      <div className="orders-container">
        <div className="orders-header">
          <h1>Orders</h1>
        </div>
        <hr />
        <div className="orders-content">
          {orderTable}
          {orderDetails}
        </div>
      </div>
      )
  }

}