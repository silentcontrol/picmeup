import React, { Component } from 'react';
import ProductTable from './products_table/ProductTable';

class OrderInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      order: this.props.order,
    }
  }

  _onClick = (e) => {
    e.preventDefault()
    this.props.finishOrder(this.state.order[0].id)
  }

  render(){
    const order = this.state.order;
    return(
      <div className="order-details">
        <h1>Order #{order[0].id}</h1>
        <ProductTable order={order} />
        <button id={order.id} onClick={this._onClick}>Done</button>
      </div>
    )
  }
}

export default OrderInfo;