import React, { Component } from 'react'
import OrderInfo from './products_table/OrderInfo'
import SearchForm from './search_components/SearchForm'
import Resource from '../../models/resource';
import Headers from './headers/Headers'
import ErrorMessage from './error_component/ErrorMessage'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentOrder: null,
      allOrders: Resource(this.props.resource),
      loading: true,
      error: null
    }
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  _clearOrderInfo = () => {
    this.setState({
      currentOrder: null,
      error: null
    })
  }

  _getOrderId = (id) => {
    const AllOrders = this.state.allOrders;
    AllOrders.find(id).then(result => {
      if(result.length > 0){
        this.setState({
          currentOrder: result,
          error: null
        })
      } else {
        this.setState({
          error: "Order ID does not exist."
        })
      }
    }).catch(err => {
      console.error('Search._getOrderId:', err)
      this.setState({
        error: "Server Error: Cannot get details for specified order ID."
      })
    })

  }

  render(){
    const { currentOrder, error } = this.state;
    const orderRender = currentOrder ? <OrderInfo order={currentOrder} /> : null;
    const errorMessage = error ? <ErrorMessage message={error} /> : null;
    return(
      <div className="search-container">
        <Headers resource={this.props.resource} />
        <SearchForm clearOrderInfo={this._clearOrderInfo}
          getOrderId={this._getOrderId}/>
        {orderRender}
        {errorMessage}
      </div>
    )
  }
}