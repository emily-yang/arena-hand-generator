import React, {Component} from 'react';

class LogReader extends Component {
	pathRef = React.createRef();
	resultsRef = React.createRef();

	render() {
		return (
			<div className="container">
				<form>
					<label> Select the path to the log file:
						<input 
						type="file" 
						ref={this.pathRef} 
						placeholder="Enter file location" 
						onChange={this.props.getLogPath}
						/>
					</label>
				</form>
				<div className="results" ref={this.resultsRef}></div>
			</div>
			);
	}
}

export default LogReader;

