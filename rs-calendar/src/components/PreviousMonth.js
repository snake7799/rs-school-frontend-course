import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class PreviousMonth extends React.Component {
	getPreviousDates() {
		let prevDates = [];
		let firstOfMonthDay = this.context.firstOfMonth.getDay();

		if (firstOfMonthDay === 0) firstOfMonthDay = 7;

		for (let i = 1; i < firstOfMonthDay; i += 1) {
			prevDates.unshift(this.context.daysInPrevMonth - i + 1);
		}
		return prevDates;
	}

	getEvent(item) {
		let year = this.context.year;
		let month = this.context.month;
		
		if (this.context.month === 0) year = this.context.year - 1;
		if (this.context.month === 11) year = this.context.year + 1;

		if (this.context.month === 0) month = '12';
		if (this.context.month < 10) month = '0' + this.context.month;
		
		return this.props.events.find(event => {
			return event.start.slice(0, 10) === `${year}-${month}-${item}`;
		});
	}
	
	render() {
		const prevDates = this.getPreviousDates();
		return( 
            <div className="prev-month-dates">
				{prevDates.map(item => {
					const event = this.getEvent(item);
                    return(
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
                                        {event ? `${event.type}:`  : ''}
                                        <br/>
                                        {event ? event.title  : ''}
                                    </div>
                                </div>
                            </Button>
                        </div>
                    )
                })}
		  	</div>
        )
	}
}

PreviousMonth.contextTypes = {
	month: PropTypes.number, 
	year: PropTypes.number,
	firstOfMonth: PropTypes.instanceOf(Date),
	daysInPrevMonth: PropTypes.number,
};
