import React from 'react';

const OrderInfo = ({ order }) => {
  return(
    <div className="order-details">
      <h1>Order #{order.id}</h1>
    </div>
  )
}

export default OrderInfo;