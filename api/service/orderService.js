'use strict';

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
function calculateTotalProfitableOrders(orders) {
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
function calculateTotalLostOrders(orders) {
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

/**
 * This function is called to calculate the absolute draw down based on a given trading summary.
 * @param tradingOrderSummary, the trading summary that contains historically opened trades.
 * @returns {string}
 */
function calculateAbsoluteDrawDown(tradingOrderSummary) {
	let accountLowestBalance = tradingOrderSummary.startingBalance;
	const orders = tradingOrderSummary.orders;

	if (orders && orders.length > 0) {
		let currentEquity = tradingOrderSummary.startingBalance;

		for (const order of orders) {
			currentEquity += order.profit;

			if (currentEquity < accountLowestBalance) {
				accountLowestBalance = currentEquity;
			}
		}
	}

	return Number(tradingOrderSummary.startingBalance - accountLowestBalance).toFixed(2);
}

/**
 * This function is called to calculate the total consecutive winning trades (max) that occurred in a row.
 * @param orders, the trading history orders makes it able for this function to calculate the max consecutive winning trades in a row.
 * @returns {number}
 */
function calculateConsecutiveWins(orders) {
	let consecutiveWins = 0;

	if (orders && orders.length > 0) {
		for (let index = 0; index < orders.length; index ++) {
			let tail = index - 1;
			let currentOrderIsProfitable = orders[index].profit > 0;
			let currentConsecutiveWins = 0;

			if (currentOrderIsProfitable) {
				currentConsecutiveWins = 1;
				let previousOrder = orders[tail];
				let previousOrderIsProfitable = previousOrder && previousOrder.profit > 0;

				while (previousOrderIsProfitable) {
					tail --;
					currentConsecutiveWins += 1;
					previousOrder = orders[tail];
					previousOrderIsProfitable = previousOrder && previousOrder.profit > 0;
				}
			}

			if (currentConsecutiveWins > consecutiveWins) {
				consecutiveWins = currentConsecutiveWins;
			}
		}
	}

	return consecutiveWins;
}

/**
* This function is called to calculate the total consecutive losing trades (max) that occurred in a row.
* @param orders, the trading history orders makes it able for this function to calculate the max consecutive losing trades in a row.
* @returns {number}
*/
function calculateConsecutiveLosses(orders) {
	let consecutiveLosses = 0;

	if (orders && orders.length > 0) {
		for (let index = 0; index < orders.length; index ++) {
			let currentConsecutiveLosses = 0;
			let tail = index - 1;
			let currentOrderIsLoss = orders[index].profit < 0;

			if (currentOrderIsLoss) {
				currentConsecutiveLosses = 1;
				let previousOrder = orders[tail];
				let previousOrderIsLoss = previousOrder && previousOrder.profit < 0;

				while (previousOrderIsLoss) {
					tail --;
					currentConsecutiveLosses += 1;
					previousOrder = orders[tail];
					previousOrderIsLoss = previousOrder && previousOrder.profit < 0;
				}
			}

			if (currentConsecutiveLosses > consecutiveLosses) {
				consecutiveLosses = currentConsecutiveLosses;
			}
		}
	}

	return consecutiveLosses;
}

module.exports = {
	orderService: {
		appendTradingOrderHistoryToFile: function (tradingOrderSummary) {
			let pair = tradingOrderSummary.pair;
			let orders = tradingOrderSummary.orders;

			let totalNetProfit = calculateAccountNetProfit(tradingOrderSummary);
			let absoluteDrawDown = calculateAbsoluteDrawDown(tradingOrderSummary);
			let totalProfitableOrders = calculateTotalProfitableOrders(orders);
			let totalLostOrders = calculateTotalLostOrders(orders);
			let consecutiveWins = calculateConsecutiveWins(orders);
			let consecutiveLosses = calculateConsecutiveLosses(orders);

			console.log("------------------------------------------------------------");
			console.log("totalNetProfit >> " + totalNetProfit);
			console.log("absoluteDrawDown >> " + absoluteDrawDown);
			console.log("totalProfitableOrders >> " + totalProfitableOrders);
			console.log("totalLostOrders >> " + totalLostOrders);
			console.log("consecutiveWins >> " + consecutiveWins);
			console.log("consecutiveLosses >> " +  consecutiveLosses);
			console.log("------------------------------------------------------------");


			//console.log('year >> ' + fileName.getFullYear());
			//console.log('date >> ' + fileName.getDate());
			//console.log('month >> ' + fileName.getMonth());
		}
	}
};
