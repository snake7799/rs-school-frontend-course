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

	checkMonthDate(currentMonth, currentDate) {
		let month = currentMonth + 1;
		let date = currentDate;

		if (currentMonth < 10) month = `0${month}`;
		if (date < 10) date = `0${date}`;

		return [month, date];
	}

	getEvent(item) {
		const [month, date] = this.checkMonthDate(this.context.month, item);

		return this.props.events.find(event =>
			event.start.slice(0, 10) === `${this.context.year}-${month}-${date}`);
	}

	isItCurrentDate(item) {
		const [month, date] = this.checkMonthDate(this.context.month, item);
		const [currentMonth, currentDate] = this.checkMonthDate(this.context.dateObject.getMonth(), this.context.dateObject.getDate());

		if (`${this.context.year}-${month}-${date}` === `${this.context.dateObject.getFullYear()}-${currentMonth}-${currentDate}`) return true;

		return false;
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
									<div className={(this.isItCurrentDate(item)) ? 'day current-date' : 'day'}>
										{(item < 10) ? `0${item}` : item}
									</div>
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
	dateObject: PropTypes.object,
	month: PropTypes.number,
	year: PropTypes.number,
	daysInMonth: PropTypes.number,
	onSelect: PropTypes.func
};
