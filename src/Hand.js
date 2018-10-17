import React, {Component} from 'react';

class Hand extends Component {

/*					{(this.props.hand).map(card => 
					<img src={card} key={card} alt="" />
				)}*/

	render() {
		let i = 1;
		return (
			<div className="hand">
				{(this.props.hand).map(img =>
					<img src={img} key={`card${i++}`} alt="" />
				)}
			</div>
		);
	}
}

export default Hand;