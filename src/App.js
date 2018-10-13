import React, { Component } from 'react';
import LogReader from './LogReader';
import Hand from './Hand';
import { parseLog } from './parser';
import './App.css';

class App extends Component {

	fileRef = React.createRef();

	state = {
		cards: null,
		logFileText: "empty"
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


	render() {
		return (
			<div className="wrapper">
			<LogReader ref={this.fileRef} getLogPath={this.getLogPath} />
			<Hand text={this.state.logFileText}/>
			</div>
			);
	}
}

export default App;
