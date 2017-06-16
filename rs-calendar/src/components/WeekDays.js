import React from 'react';

export default class WeekDays extends React.Component {
	render() {
		return (
			<div className="weekdays">
				{this.props.weekDays.map(item => <div className="weekday" key={item}>{item}</div>)}
			</div>
		);
	}
}
