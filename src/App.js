import React, { Component } from 'react';
import LogReader from './LogReader';
import Hand from './Hand';
import { parseLog } from './parser';
import './App.css';

class App extends Component {

	fileRef = React.createRef();

	state = {
		cards: null,
		logFileText: "empty",
		deck: null,
		hand: [],
		handSize: 7
	}

	getLogPath = async event => {
		event.preventDefault();

		const path = this.fileRef.current.pathRef.current;
		const file = path.files[0];

		try {
			const contents = await this.fetchResults(file);
			this.setState({
				logFileText: contents
			});
			const cards = parseLog(this.state.logFileText);
			this.setState( {cards} );
		} catch (err) {
			console.error(err);
		}

		// testing
		this.generateDeck();
		this.drawCards(7);

	}

	fetchResults = file => {
		const fileReader = new FileReader();

		return new Promise((resolve, reject) => {
			fileReader.readAsText(file);

			fileReader.onerror = () => {
				fileReader.abort();
				reject(new DOMException("Could not parse log"));
			}

			fileReader.onload = () => {
				resolve(fileReader.result);
			}

		})
	}

	generateDeck = () => {
		const cardList = this.state.cards;
		if (!cardList) {
			console.error("No cards found");
			return;
		}
		else {
			const deck = [];
			const keys = Object.keys(cardList);
			keys.forEach(card => {
				let count = cardList[card];
				while (count > 0) {
					deck.push(card);
					count--;
				}
			});
			this.setState( {deck} );
		}
	}

	drawCards = async num => {
		const deck = this.state.deck;
		if (deck === null) {
			console.error('Cannot generate hand without deck. Please select log files first');
			return;
		}
		let hand = [];
		const drawnSet = new Set();
		while (hand.length < num) {
			const card = Math.floor(Math.random() * deck.length);
			if (!drawnSet.has(card)) {
				drawnSet.add(card);
				hand.push(deck[card]);
			}
		}
		hand = await Promise.all(hand.map(async id => await this.getCardImg(id)));
		this.setState( {hand})
		console.log('hand: ', hand);

	}

	handleNewDraw = async () => {
		await this.setState( {handSize: 7} );
		this.drawCards(this.state.handSize);
	}

	handleMulligan = async () => {
		const handSize = this.state.handSize - 1;
		await this.setState( {handSize} );
		this.drawCards(handSize);
	}

	getCardImg = async id => {
		const url = `https://api.scryfall.com/cards/mtgo/${id}`;
		try {
			const response = await fetch(url, {
				method: "GET",
				format: "image",
				redirect: "follow"
			});
			const json = await response.json();
			return json.image_uris.small;
		} catch(e) {
			console.error(e);
		}
	}


	render() {
		return (
			<div className="wrapper">
				<LogReader ref={this.fileRef} getLogPath={this.getLogPath} />
				<Hand text={this.state.logFileText} hand={this.state.hand} />
				<button className="button" onClick={this.handleNewDraw}>Reset hand</button>
				<button className="button" onClick={this.handleMulligan} >Mulligan</button>
			</div>
			);
	}
}

export default App;
