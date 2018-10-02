import React, { Component } from 'react';
import OrderTable from './orders_table/OrderTable';
import OrderInfo from './products_table/OrderInfo';
import Loading from './loading/Loading'
import Headers from './headers/Headers'
import ErrorMessage from './error_component/ErrorMessage'

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
      allOrders: Resource(this.props.resource),
      error: null
    }
  }

  componentDidMount(){
    const AllOrders = this.state.allOrders
    AllOrders.findAll()
      .then(result => {
        this.setState({
          orders: result,
          loading: false,
          error: null
        })
      })
      .catch(error => {
        console.error('Errors:', error)
        this.setState({
          loading: false,
          error: "Server Error: Cannot get all products."
        })
      })
  }

  _getOrderId = (id) => {
    const AllOrders = this.state.allOrders;
    AllOrders.find(id)
      .then(result => {
        this.setState({
          currentOrderId: id,
          showOrder: true,
          orderDetails: result,
          error: null
        })
      }).catch(err => {
        console.error(err)
        this.setState({
          error: "Server Error: Cannot get details of selected order."
        })
      })
  }

  _finishOrder = (id) => {
    const AllOrders = this.state.allOrders
    AllOrders.update(id)
      .then(() => {
        const unfinishedOrders = _removeOrder(this.state.orders, id);
        this.setState({
          orders: [...unfinishedOrders],
          showOrder: false,
          orderDetails: null,
          error: null
        })
      })
      .catch(err => {
        console.error('Error:', err)
        this.setState({
          error: "Server Error: Cannot set order status to done."
        })
    });
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
    const { loading, error } = this.state;
    const orderTable = loading ? (<Loading />) :
      <OrderTable getOrderId={this._getOrderId} orders={this.state.orders} />
    const orderDetails = this._renderOrderDetails();
    const orderHeader = <Headers resource={this.props.resource} />
    const errorMessage = error ? <ErrorMessage message={error} /> : null;
    return(
      <div>
        {orderHeader}
        <div className="orders-content">
          {orderTable}
          {orderDetails}
        </div>
        {errorMessage}
      </div>
      )
  }

}

const _removeOrder = (orders, id) => {
  return orders.filter(order => order.id !== id);
}
