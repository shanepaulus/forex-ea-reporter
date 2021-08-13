'use strict';

module.exports = function (app) {
	let ordersController = require('../controller/orderController');

	// Orders Routes
	app.route('/orders')
	.post(ordersController.processOrders);
};