const eval = require("./evaluator/evaluator.js");
/**
 *
 * @param {Array<Array<[string, string]>>} cards - 5 cards given as [rank, suit]
 * @returns {number}
 */

function evaluate5cards(cards) {
	cards = cards.map(eval.exchangecard);
	return eval.evaluate5cardsbin(...cards);
}

/**
 *
 * @param {Array<Array<[string, string]>>} cards - 7 cards given as [rank, suit]
 * @returns {number}
 */
function evaluate7cards(cards) {
	cards = cards.map(eval.exchangecard);
	const perms = [
		[0, 1, 2, 3, 5],
		[0, 1, 2, 3, 6],
		[0, 1, 2, 4, 5],
		[0, 1, 2, 4, 6],
		[0, 1, 2, 5, 6],
		[0, 1, 3, 4, 5],
		[0, 1, 3, 4, 6],
		[0, 1, 3, 5, 6],
		[0, 1, 4, 5, 6],
		[0, 2, 3, 4, 5],
		[0, 2, 3, 4, 6],
		[0, 2, 3, 5, 6],
		[0, 2, 4, 5, 6],
		[0, 3, 4, 5, 6],
		[1, 2, 3, 4, 5],
		[1, 2, 3, 4, 6],
		[1, 2, 3, 5, 6],
		[1, 2, 4, 5, 6],
		[1, 3, 4, 5, 6],
		[2, 3, 4, 5, 6]
	];

	let bestscore = eval.evaluate5cardsbin(
		cards[0],
		cards[1],
		cards[2],
		cards[3],
		cards[4]
	);
	perms.forEach((perm) => {
		let score = eval.evaluate5cardsbin(
			cards[perm[0]],
			cards[perm[1]],
			cards[perm[2]],
			cards[perm[3]],
			cards[perm[4]]
		);
		bestscore = Math.min(bestscore, score);
	});
	return bestscore;
}

/**
 * Converts a handrank to the type of hand in english
 * @param {number} handrank
 * @returns {string}
 */
function cardtype(handrank) {
	if (handrank > 6185) return "High card";
	if (handrank > 3325) return "One pair";
	if (handrank > 2467) return "Two pair";
	if (handrank > 1609) return "Three of a kind";
	if (handrank > 1599) return "Straight";
	if (handrank > 322) return "Flush";
	if (handrank > 166) return "Full house";
	if (handrank > 10) return "Four of a kind";
	if (handrank === 1) return "Royal Flush";
	else return "Straight flush";
}

module.exports = {
	evaluate5cards,
	evaluate7cards,
	cardtype
};

// constructors
module.exports.evaluate5cardsbin = eval.evaluate5cardsbin;
module.exports.exchangecard = eval.exchangecard;
module.exports.gethash = eval.gethash;
