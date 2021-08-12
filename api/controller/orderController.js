'use strict';
const {orderService} = require("../service/orderService");

exports.processOrders = function(req, resp) {
	orderService.appendTradingOrderHistoryToFile(req.body);
	resp.end();
};