import React, { Component } from 'react';
import OrderTable from './orders_table/OrderTable';
import OrderInfo from './products_table/OrderInfo';
import Loading from './loading/Loading'
import Headers from './headers/Headers'

import Resource from '../../models/resource';

export default class Orders extends Component {
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      loading: true,
      showOrder: false,
      currentOrderId: null,
      orderDetails: null,
      allOrders: Resource(this.props.resource)
    }
  }

  componentDidMount(){
    const AllOrders = this.state.allOrders
    AllOrders.findAll()
      .then(result => {
        this.setState({
          orders: result,
          loading: false
        })
      })
      .catch(error => {
        console.error('Errors:', error)
      })
  }

  _requestOrderDetails = () => {
    const AllOrders = this.state.allOrders
    AllOrders.find(this.state.currentOrderId)
        .then(result =>{
          console.log('_requestOrderDetails:', result)
          this.setState({
            orderDetails: result
          })
        }).catch(error => {
          console.error(error);
        })
  }

  _getOrderId = (id) => {
    const AllOrders = this.state.allOrders
    AllOrders.find(id)
      .then(result => {
        console.log('_getOrderId:', result)
        this.setState({
          currentOrderId: id,
          showOrder: true,
          orderDetails: result
        })
      }).catch(err => console.error(err))
  }

  _finishOrder = (id) => {
    const AllOrders = this.state.allOrders
    AllOrders.update(id)
      .then(() => {
        const unfinishedOrders = _removeOrder(this.state.orders, id);
        this.setState({
          orders: [...unfinishedOrders],
          showOrder: false,
          orderDetails: null
        })
      })
      .catch(err => console.error('Error:', err));
  }

  _renderOrderDetails = () => {
    if (this.state.showOrder && !this.state.loading) {
      return this.props.resource === 'orders' ?
        (<OrderInfo order={this.state.orderDetails}
          finishOrder={this._finishOrder} />) :
        (<OrderInfo order={this.state.orderDetails}/>)
    } else {
      return null
    }

  }

  render(){
    const orderTable = this.state.loading ? (<Loading />) :
      <OrderTable getOrderId={this._getOrderId} orders={this.state.orders} />
    const orderDetails = this._renderOrderDetails();
    const orderHeader = <Headers resource={this.props.resource} />
    return(
      <div>
        {orderHeader}
        <div className="orders-content">
          {orderTable}
          {orderDetails}
        </div>
      </div>
      )
  }

}

const _removeOrder = (orders, id) => {
  return orders.filter(order => order.id !== id);
}
