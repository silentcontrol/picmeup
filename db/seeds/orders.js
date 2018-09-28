
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('orders').insert({id: 1, user_id: 1, order_completed: true}),
        knex('orders').insert({id: 2, user_id: 1, order_completed: false}),
        knex('orders').insert({id: 3, user_id: 2, order_completed: true}),
        knex('orders').insert({id: 4, user_id: 2, order_completed: false}),
        knex('orders').insert({id: 5, user_id: 3, order_completed: true}),
        knex('orders').insert({id: 6, user_id: 3, order_completed: false}),
        knex.raw('ALTER SEQUENCE orders_id_seq RESTART WITH 7')
      ]);
    });
};
