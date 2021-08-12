'use strict';

const {order} = require("../model/orderModel");

/**
 * This function is called to calculate the account net profit by calculating all trading profit for a given period.
 * @param tradingOrderSummary, the model that contains the account trading history.
 * @returns number
 */
function calculateAccountNetProfit(tradingOrderSummary) {
	let accountEquity = tradingOrderSummary.startingBalance;
	const orders = tradingOrderSummary.orders;

	if (orders && orders.length > 0) {
		for (const currentOrder of orders) {
			accountEquity += currentOrder.profit;
		}
	}

	return Number(accountEquity - tradingOrderSummary.startingBalance).toFixed(2);
}

/**
 * This function is invoked to calculate the total profitable trades.
 * @param orders the array that contains all orders that was executed.
 * @returns {number}
 */
function calculateTotalProfitTrades(orders) {
	let totalProfitTrades = 0;

	if (orders) {
		for (const order of orders) {
			if (order.profit > 0) {
				totalProfitTrades += 1;
			}
		}
	}

	return totalProfitTrades;
}

/**
 * This function is invoked to calculate the total profitable trades.
 * @param orders the array that contains all orders that was executed.
 * @returns {number}
 */
function calculateTotalLostTrades(orders) {
	let totalLostTrades = 0;

	if (orders) {
		for (const order of orders) {
			if (order.profit < 0) {
				totalLostTrades += 1;
			}
		}
	}

	return totalLostTrades;
}

module.exports = {
	orderService: {
		appendTradingOrderHistoryToFile: function (tradingOrderSummary) {
			let pair = tradingOrderSummary.pair;
			let orders = tradingOrderSummary.orders;
			let totalNetProfit = calculateAccountNetProfit(tradingOrderSummary);
			let totalProfitTrades = calculateTotalProfitTrades(orders);
			let totalLostTrades = calculateTotalLostTrades(orders);

			//console.log('year >> ' + fileName.getFullYear());
			//console.log('date >> ' + fileName.getDate());
			//console.log('month >> ' + fileName.getMonth());
		}
	}
};
