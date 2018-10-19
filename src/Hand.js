import React, {Component} from 'react';
import DragSortableList from 'react-drag-sortable';

class Hand extends Component {

	onSort = (sortedList, dropEvent) => {
		console.log('sortedList: ', sortedList, dropEvent);
	}
	render() {
		let i = 1;
		const cards = this.props.hand.map(img => {
			return {content: (<img src={img} key={`card${i++}`} alt="" />), classes:["card"]}
		});
		console.log(cards);
		return (
			<div className="hand">
				<DragSortableList items={cards} type="horizontal" />
			</div>
		);
	}
}

export default Hand;