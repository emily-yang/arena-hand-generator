import React, {Component} from 'react';

class Hand extends Component {

	render() {
		let i = 1;
		return (
			<div className="hand">
				{this.props.hand.map(card => (
					<img src={card.img} key={`card${i++}`} alt={card.name} />
				))}
			</div>
		);
	}
}

export default Hand;