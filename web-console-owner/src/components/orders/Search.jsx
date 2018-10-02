import React, { Component } from 'react'
import OrderInfo from './products_table/OrderInfo'
import SearchForm from './search_components/SearchForm'
import Resource from '../../models/resource';
import Headers from './headers/Headers'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentOrder: null,
      allOrders: Resource(this.props.resource),
      loading: true
    }
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  _clearOrderInfo = () => {
    this.setState({
      currentOrder: null
    })
  }

  _getOrderId = (id) => {
    const AllOrders = this.state.allOrders;
    AllOrders.find(id).then(result => {
      this.setState({
        currentOrder: result
      })
    }).catch(err => console.error('Search._getOrderId:', err))

  }

  render(){
    const orderRender = this.state.currentOrder ? <OrderInfo order={this.state.currentOrder} /> : null;
    return(
      <div className="search-container">
        <Headers resource={this.props.resource} />
        <SearchForm clearOrderInfo={this._clearOrderInfo}
          getOrderId={this._getOrderId}/>
        {orderRender}
      </div>
    )
  }
}