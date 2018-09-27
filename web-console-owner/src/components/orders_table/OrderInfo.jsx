import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrderPopup from './OrderPopup';

export default class OrderInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      orderID: this.props.match.params.id || null,
      order: {},
      show: false,
      redirect: ''
    }
  }

  componentDidMount(){

  }

  _hide = () => {
    this.setState({ show: false, redirect: '/orders' })
  }

  render(){
    if( this.state.redirect ) return <Redirect to={ this.state.redirect }/>

    const order = this.state.orderID ? (
      <OrderPopup show={ this.state.show }
                  onHide={ this._hide }
                  title={`Order#${this.state.orderID}`}>
                  <p>hello</p>
      </OrderPopup>
    ) : null;
    return(
      <div>
        { order }
      </div>
    )
  }
}