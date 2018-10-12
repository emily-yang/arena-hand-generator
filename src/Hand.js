import React, {Component} from 'react';

class Hand extends Component {
	render() {
		return (
			<div className="hand">
				<p className="placeholder">{this.props.text}</p>
			</div>
		);
	}
}

export default Hand;