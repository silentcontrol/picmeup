import React from 'react';
import './ProductTable.css';

const ProductRow = ({ product }) => {
  return (<tr>
    <td>{product.product_name}</td>
    <td>{product.price_in_cents / 100}</td>
    <td>{product.quantity}</td>
    <td>{product.line_total}</td>
  </tr>)

}

const ProductTable = ({ order }) => {
  const productsRender = order.map((product, index) => {
    return <ProductRow key={index} product={product}/>
  })
  return(
    <table className="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Unit Total</th>
        </tr>
      </thead>
      <tbody>
        {productsRender}
      </tbody>
    </table>
  )
}

export default ProductTable;