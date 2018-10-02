import React, { Component } from 'react';
import ProductTable from './ProductTable';

class OrderInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      order: null,
    }
  }

  _onClick = (e) => {
    e.preventDefault()
    this.props.finishOrder(this.state.order[0].id)
  }

  _renderOrder = (order) => {
    return <ProductTable order={order} />
  }

  render(){
    const order = this.props.order;
    const buttonDone = this.props.finishOrder  ?
      (<button className="order-info-button" id={order.id} onClick={this._onClick}>Done</button>) :
      null;

    return(
      <div className="order-details">
        <h1>Order #{order[0].id}</h1>
        {this._renderOrder(this.props.order)}
        {buttonDone}
      </div>
    )
  }
}

export default OrderInfo;