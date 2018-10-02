import React from 'react'

const AddProductInfo = ({product}) => {
  return(
    <div className="product-summary">
      <h1 className="product-info-header">Product ID # {product.id}</h1>
      <p>Name: {product.product_name}</p>
      <p>Price: ${(product.price_in_cents / 100).toFixed(2)}</p>
    </div>
  )
}

export default AddProductInfo;