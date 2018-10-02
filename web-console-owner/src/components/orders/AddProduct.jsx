import React, { Component } from 'react'
import Headers from './headers/Headers'
import AddProductForm from './addproduct_component/AddProductForm'
import AddProductInfo from './addproduct_component/AddProductInfo'
import Resource from '../../models/resource'
import './addproduct_component/AddProduct.css'


export default class AddProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      showProductSummary: false,
      product: null,
      addProductResource: Resource(this.props.resource),
      error: null
    }
  }

  _addProduct = (product) => {
    const { addProductResource } = this.state;
    console.log('product:', product);
    addProductResource.create(product)
      .then(result => {
        console.log('result', result);
        this.setState({
          product: result.data[0],
          showProductSummary: true
        })
      })
      .catch(err => {
        console.error('Server error adding product:', err)
      })
  }

  _showError = (err) => {
    this.setState({
      error: err
    })
  }

  render(){
    const { showProductSummary, product, error } = this.state;
    const addProductInfo = showProductSummary ? <AddProductInfo product={product}/> : null;
    const errorFlag = error ? <p>Error: {error} </p> : null;
    return (
      <div>
        <Headers resource={"Add New Product"}/>
        <div className="add-product-container">
          <AddProductForm addProduct={this._addProduct} showError={this._showError}/>
          {addProductInfo}
          {errorFlag}
        </div>
      </div>
    )
  }
}