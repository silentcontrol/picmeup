import React from 'react';
import {Link} from 'react-router-dom';

const OrderRow = ({ order }) => {
  // on click, set orderinfo's show to true
  const _onClickHandler = (e) => {
    e.preventDefault()
    alert("hello there");
    console.log(e.target)
    // window.location = `/orders/${e.target.id}`;
  }

  return (

    <tr id={order.id} onClick={_onClickHandler}>
      <td>{order.id}</td>
      <td>{order.user_email}</td>
      <td className="last">${(order.total_cents / 100).toFixed(2)}</td>
    </tr>

  )
}

export default OrderRow;
