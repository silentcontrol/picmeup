import React from 'react';

import './OrdersTable.css';
import OrderBody from './OrderBody'

const OrderTable = ({ orders, getOrderId }) => {
  return(
      <table className="table-orders">
        <thead>
          <tr>
            <th>Order #</th>
            <th>User Email</th>
            <th className="last">Total Price</th>
          </tr>
        </thead>
        <OrderBody getOrderId={getOrderId} orders={orders}/>
      </table>
  )
}

export default OrderTable;