import React, { Component } from 'react'

export default class AddProductForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      productName: "",
      price: 0
    }
  }

  _onChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    })
  }

  _submitProduct = () => {
    const { productName, price } = this.state;
    if(productName.length > 0 && price > 0){
      const product = {
        product_name: productName.trim(),
        price_in_cents: Math.trunc(price * 100)
      }
      this.props.addProduct(product)
    } else {
      this.props.showError('Product and price are required.')
    }
  }

  render(){
    return(
      <div className="add-product-form">
        <div className="input-container">
          <label htmlFor="product_name">Name:</label>
          <input name="product_name"
            type="text"
            className="input-box"
            onChange={this._onChange("productName")}/>
        </div>
        <div className="input-container">
          <label html_for="price">Price:</label>
          <input type="number"
            name="price"
            className="input-box"
            step="0.1"
            min="0"
            placeholder="0"
            onChange={this._onChange("price")}/>
        </div>
        <button className="add-product-button" onClick={this._submitProduct}>Add Product</button>
      </div>
    )
  }
}