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
		imgSrc: null
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
			const url = "https://api.scryfall.com/cards/mtgo/68509"
			 fetch(url, {
				method: "GET",
				format: "image",
				redirect: "follow",
			})
			 .then(response => response.json())
			 .catch(err => console.error(err))
			 .then(response => {
			 	const cardImg = response.image_uris.small;
			 	this.setState( {imgSrc: cardImg})
			 });*/

			
		} catch (err) {
			console.error(err);
		}

		// testing
		this.generateDeck();

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
			this.setState( {deck} )
		}
	}

	drawCards = (num) => {
		
	}


	render() {
		return (
			<div className="wrapper">
				<LogReader ref={this.fileRef} getLogPath={this.getLogPath} />
				<img src={this.state.imgSrc} alt="" className="card" ref={this.imgRef} />
				<Hand text={this.state.logFileText}/>
			</div>
			);
	}
}

export default App;
