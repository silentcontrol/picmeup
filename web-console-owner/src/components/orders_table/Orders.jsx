import React, { Component } from 'react';
import OrderTable from './OrderTable';
import OrderInfo from './OrderInfo';

import Resource from '../../models/resource';

const AllOrders = Resource('orders');

const Loading = () => {
  return(
    <tr>
      <td className="span-all">Loading</td>
    </tr>
  )
}

export default class Orders extends Component {
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      loading: true,
      showOrder: false,
      currentOrderId: null
    }
  }

  componentDidMount(){
    AllOrders.findAll()
      .then(result => {
        console.log('result:' ,result)
        this.setState({
          orders: result,
          loading: false
        })
      })
      .catch(error => {
        console.error('Errors:', error)
      })
  }

  _getOrderFromState = () => {
    const allOrders = this.state.orders;
    let thisOrder = null;
    for( let order of allOrders){
      if (order.id === this.state.currentOrderId){
        thisOrder = order;
        break;
      }
    }

    return thisOrder;
  }

  _getOrderId = (id) => {
    console.log('_getOrderId:', id);
    this.setState({
      currentOrderId: id,
      showOrder: true
    })
  }

  render(){
    const orderTable = this.state.loading ? (<Loading />) :
      <OrderTable getOrderId={this._getOrderId} orders={this.state.orders} />
    const orderDetails = (this.state.showOrder && !this.state.loading) ?
                          (<OrderInfo order={this._getOrderFromState()} />) :
                          (null);
    return(
      <div>
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