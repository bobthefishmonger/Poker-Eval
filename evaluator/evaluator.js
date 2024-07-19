const lookup = require("./lookuptable.js");

const suitsval = {
	Clubs: 0x8000,
	Diamonds: 0x4000,
	Hearts: 0x2000,
	Spades: 0x1000
};

const rankval = {
	2: 0,
	3: 0x100,
	4: 0x200,
	5: 0x300,
	6: 0x400,
	7: 0x500,
	8: 0x600,
	9: 0x700,
	10: 0x800,
	J: 0x900,
	Q: 0xa00,
	K: 0xb00,
	A: 0xc00
};

const bitindicatorrankval = {
	2: 0x10000,
	3: 0x20000,
	4: 0x40000,
	5: 0x80000,
	6: 0x100000,
	7: 0x200000,
	8: 0x400000,
	9: 0x800000,
	10: 0x1000000,
	J: 0x2000000,
	Q: 0x4000000,
	K: 0x8000000,
	A: 0x10000000
};

const primerankval = {
	2: 2,
	3: 3,
	4: 5,
	5: 7,
	6: 11,
	7: 13,
	8: 17,
	9: 19,
	10: 23,
	J: 29,
	Q: 31,
	K: 37,
	A: 41
};
/**
 * Converts the 5 card lookup index into a hash lookup index
 * @param {number} u
 * @returns {number}
 */
function gethash(i) {
	let a, b, r;
	i += 0xe91aaa35;
	i ^= i >>> 16;
	i += i << 8;
	i ^= i >>> 4;
	b = (i >>> 8) & 0x1ff;
	a = (i + (i << 2)) >>> 19;
	r = a ^ lookup.HASHAJUST[b];
	return r;
}
/**
 * Converts the card given as ["rank", "suit"] into a number
 * @param {Array<[string, string]>} card
 * @returns
 */
function exchangecard(card) {
	return (
		bitindicatorrankval[card[0]] |
		suitsval[card[1]] |
		rankval[card[0]] |
		primerankval[card[0]]
	);
}
/**
 * Converts the 5 exchanged cards into the hands rank
 * @param {number} c1
 * @param {number} c2
 * @param {number} c3
 * @param {number} c4
 * @param {number} c5
 * @returns number
 */
function evaluate5cardsbin(c1, c2, c3, c4, c5) {
	let i = (c1 | c2 | c3 | c4 | c5) >>> 16;
	if (c1 & c2 & c3 & c4 & c5 & 0xf000) {
		return lookup.FLUSHHANDS[i];
	}
	let handval = lookup.NONFLUSHHANDS[i];
	if (handval) return handval;
	i = (c1 & 0xff) * (c2 & 0xff) * (c3 & 0xff) * (c4 & 0xff) * (c5 & 0xff);
	return lookup.HASHVALUES[gethash(i)];
}

module.exports = {
	exchangecard,
	evaluate5cardsbin,
	gethash
};
