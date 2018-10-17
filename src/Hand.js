import React, {Component} from 'react';

class Hand extends Component {
	render() {
		let i = 1;
		return (
			<div className="hand">
				{(this.props.hand).map(img =>
					<img className="card" src={img} key={`card${i++}`} alt="" />
				)}
			</div>
		);
	}
}

export default Hand;