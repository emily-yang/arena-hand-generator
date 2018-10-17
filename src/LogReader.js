import React, {Component} from 'react';
import './style.css';

class LogReader extends Component {
	pathRef = React.createRef();
	resultsRef = React.createRef();

	render() {
		return (
			<div className="log-reader">
				<form>
					<label className="label"> Select log file location
						<input 
						type="file" 
						className="input button"
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

