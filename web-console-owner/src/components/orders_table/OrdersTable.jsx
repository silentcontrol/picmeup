import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './OrdersTable.css';

import OrderRow from './OrderRow';
import OrderInfo from './OrderInfo';

const Loading = () => {
  return(
    <tr>
      <td className="span-all">Loading</td>
    </tr>
  )
}

class Orders extends Component {
  constructor(){
    super()
    this.state = {
      orders: [],
      loading: true
    }
  }

  componentDidMount(){
    this.setState({
      orders:[
        {
          id: 1,
          total_cents: 999,
          user_email: 'kyla_yugi@yahoo.com'
        },
        {
          id: 2,
          total_cents: 1000,
          user_email: 'kyla.palos@gmail.com'
        },
        {
          id: 3,
          total_cents: 999,
          user_email: 'kyla_yugi@yahoo.com'
        },
        {
          id: 4,
          total_cents: 1000,
          user_email: 'kyla.palos@gmail.com'
        }
      ],
      loading: false
    });
  }

  render(){
    const ordersState = this.state.orders;
    // pass down a function that will set the show of orderinfo to true
    const orders = this.state.loading ? <Loading /> :
                      ordersState.map(order => {
                        return <OrderRow key={order.id} order={order} />
                      });
    return(
      <div className="orders-container">
        <div className="orders-header">
          <h1>Orders</h1>
        </div>
        <hr/>
          <table className="table-orders">
            <thead>
              <tr>
                <th>Order #</th>
                <th>User Email</th>
                <th className="last">Total Price</th>
              </tr>
            </thead>
            <tbody>
              { orders }
            </tbody>
          </table>
          <Switch>
            <Route path="orders/:id" component={OrderInfo}/>
          </Switch>

      </div>
    )
  }
}

export default Orders;

