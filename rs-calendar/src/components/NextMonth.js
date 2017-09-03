import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class NextMonth extends React.Component {
	getNextDates() {
		const nextDates = [];
		let lastOfMonthDay = this.context.lastOfMonth.getDay();

		if (lastOfMonthDay === 0) lastOfMonthDay = 7;

		for (let i = 1; i <= 7 - lastOfMonthDay; i += 1) {
			nextDates.push(`0${i}`);
		}
		return nextDates;
	}

	getEvent(item) {
		let year = this.context.year;
		let month = this.context.month + 2;

		if (month < 10) month = `0${month}`;
		if (this.context.month === 11) {
			year += 1;
			month = '01';
		}

		return this.props.events.find(event =>
			event.start.slice(0, 10) === `${year}-${month}-${item}`);
	}

	render() {
		const nextDates = this.getNextDates();
		return (
			<div className="next-month-dates">
				{nextDates.map((item) => {
					const event = this.getEvent(item);
					return (
						<div className="modal-container" key={item}>
							<Button
								className="cell"
								key={item}
								onClick={() => {
									if (event) this.props.cellClickHandler(event);
								}}
							>
								<div className="cell" key={item}>
									<div className="day">{item}</div>
									<br/>
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

NextMonth.contextTypes = {
	month: PropTypes.number,
	year: PropTypes.number,
	lastOfMonth: PropTypes.instanceOf(Date)
};
