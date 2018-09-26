module.exports = function (knex) {
  return {
    // products table helpers
    getAllProducts: async () => {
      return await
        knex('products')
          .orderBy('id', 'asc')
          .then(res => res).catch(function (e) {
            return 'cannot get product list';
          })
    },
    searchProductByName: async (name) => {
      let normalizedName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
      return await
        knex('products')
          .where('product_name', normalizedName)
          .then(res => res).catch(function (e) {
            return 'product name cannot be found';
          })
    },
    getProductPriceById: async (productId) => {
      return await
        knex('products')
          .where('id', productId)
          .select('price_in_cents')
          .then(res => res[0].price_in_cents).catch(function (e) {
            return 'product id cannot be found';
          })
    },
    getProductNameById: async (productId) => {
      return await
        knex('products')
          .where('id', productId)
          .select('product_name')
          .then(res => res[0].product_name).catch(function (e) {
            return 'product id cannot be found';
          })
    },
    getProductIdByName: async (name) => {
      let normalizedName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
      return await
        knex('products')
          .where('product_name', normalizedName)
          .select('id')
          .then(res => res[0].id).catch(function (e) {
            return 'product name cannot be found';
          })
    },
    // users table helpers
    getFirstNameById: async (userId) => {
      return await
        knex('users')
          .where('id', userId)
          .select('first_name')
          .then(res => res[0].first_name).catch(function (e) {
            return 'user id cannot be found';
          })
    },
    getLastNameById: async (userId) => {
      return await
        knex('users')
          .where('id', userId)
          .select('last_name')
          .then(res => res[0].last_name).catch(function (e) {
            return 'user id cannot be found';
          })
    },
    getEmailById: async (userId) => {
      return await
        knex('users')
          .where('id', userId)
          .select('email')
          .then(res => res[0].email).catch(function (e) {
            return 'user id cannot be found';
          })
    },
    // orders table helper
    getOrderStatusById: async (orderId) => {
      return await
        knex('orders')
          .where('id', orderId)
          .select('order_completed')
          .then(res => res[0].order_completed).catch(function (e) {
            return 'order id cannot be found';
          })
    },
    getUserById: async (orderId) => {
      return await
        knex('orders')
          .where('id', orderId)
          .select('user_id')
          .then(res => res[0].user_id).catch(function (e) {
            return 'order id cannot be found';
          })
    },
    getOrderCreateDateById: async (orderId) => {
      return await
        knex('orders')
          .where('id', orderId)
          .select('created_at')
          .then(res => res[0].created_at).catch(function (e) {
            return 'order id cannot be found';
          })
    },
    getOrderUpdateDateById: async (orderId) => {
      return await
        knex('orders')
          .where('id', orderId)
          .select('updated_at')
          .then(res => res[0].updated_at).catch(function (e) {
            return 'order id cannot be found';
          })
    },
    getOpenOrders: async () => {
      return await
        knex('orders')
          .where('order_completed', false)
          .select('id')
          .then(res => res)
    },
    getClosedOrders: async () => {
      return await
        knex('orders')
          .where('order_completed', true)
          .select('id')
          .then(res => res)
    },
    getOrderDetailsById: async (orderId) => {
      return await
        knex('orders')
          .join('line_items', { 'orders.id': 'line_items.order_id' })
          .join('products', { 'line_items.product_id': 'products.id' })
          .where('order_id', orderId)
          .then(res => res)
    },
    getOrderValueById: async (orderId) => {
      return await
        knex('orders')
          .join('line_items', { 'orders.id': 'line_items.order_id' })
          .where('order_id', orderId)
          .sum('line_total')
          .then(res => res[0].sum)
    }
  };
}