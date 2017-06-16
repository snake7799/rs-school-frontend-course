import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class CurrentMonth extends React.Component {
	getCurrentDates() {
		const currentDates = [];
		for (let i = 1; i <= this.context.daysInMonth; i += 1) {
			currentDates.push(i);
		}
		return currentDates;
	}

	getEvent(item) {
		let itm = item;
		let month = this.context.month;

		if (month < 9) month = `0${this.context.month + 1}`;
		else month = this.context.month + 1;
		if (itm < 10) itm = `0${itm}`;

		return this.props.events.find(event =>
			event.start.slice(0, 10) === `${this.context.year}-${month}-${itm}`);
	}

	render() {
		const currentDates = this.getCurrentDates();
		return (
			<div className="current-month-dates">
				{currentDates.map((item) => {
					const event = this.getEvent(item);
					return (
						<div className="modal-container" key={item}>
							<Button
								onClick={() => {
									if (event) this.props.cellClickHandler(event);
								}}
							>
								<div
									className="cell"
									key={item}
									onClick={this.context.onSelect.bind(this, this.context.year, this.context.month, item)}
								>
									<div className="day">{(item < 10) ? `0${item}` : item}</div>
									<div className={`event-cover ${event ? event.type : ''}`}>
										{event ? `${event.type}:` : ''}
										<br/>
										{event ? event.title : ''}
									</div>
								</div>
							</Button>
						</div>
					);
				})}
			</div>
		);
	}
}

CurrentMonth.contextTypes = {
	month: PropTypes.number,
	year: PropTypes.number,
	daysInMonth: PropTypes.number,
	onSelect: PropTypes.func
};
