
export function parseLog(text) {
	let regex = /"name": "Draft Deck"([^{])*([^\]]*)/;
	const cardList= regex.exec(text)[2];

	regex = /"id": "(\d*)\D*(\d*)/g;
	const cards = {};
	let matched;
	do {
		matched = regex.exec(cardList);
		if (matched) {
			cards[matched[1]] = Number(matched[2]);
		}
	} while (matched);

	console.log(cards);
	return cards;
}
