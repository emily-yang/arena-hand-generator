import React, { Component } from 'react';
import LogReader from './LogReader';
import Hand from './Hand';
import { parseLog } from './parser';
import './App.css';

class App extends Component {

	fileRef = React.createRef();
	imgRef = React.createRef();

	state = {
		cards: null,
		logFileText: "empty",
		deck: null,
		imgSrc: null,
		hand: []
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

/*			// test scryfall api
			const url = "https://api.scryfall.com/cards/mtgo/68509";
			const response = await fetch(url, {
				method: "GET",
				format: "image",
				redirect: "follow"
			});
			const json  = await response.json()
			const cardImg = json.image_uris.small;
			this.setState( {imgSrc: cardImg });
*/
			
		} catch (err) {
			console.error(err);
		}

		// testing
		this.generateDeck();
		// this.drawCards(7);

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
		const indices = new Set();
		while (hand.length < num) {
			const card = Math.floor(Math.random() * deck.length);
			if (!indices.has(card)) {
				indices.add(card);
				hand.push(deck[card]);
			}
		}
		hand = await Promise.all(hand.map(async id => await this.getCardImg(id)));
		this.setState( {hand})
		console.log('hand: ', hand);

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
				<button onClick={()=> this.drawCards(7)}>Draw hand</button>
				<img src={this.state.imgSrc} alt="" className="card" ref={this.imgRef} />
				<Hand text={this.state.logFileText} hand={this.state.hand} />
			</div>
			);
	}
}

export default App;
