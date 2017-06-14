import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import WeekDays from './WeekDays';
import MonthDates from './MonthDates';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
		
        const date = new Date();
        this.state = { 
            events: null,
            trainers: null,
            month: date.getMonth(),
            year: date.getFullYear(),
            selectedMonth: null,
            selectedYear: null,
            weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstOfMonth: null,
            lastOfMonth: null,
            daysInMonth: null,
            daysInPrevMonth: null,
        };
		
        this.selectDate = this.selectDate.bind(this);
        this.calculateDates = this.calculateDates.bind(this);
        this.getPrevious = this.getPrevious.bind(this);
        this.getNext = this.getNext.bind(this);
    }

	selectDate(month, year, date, element) {    
		if (this.state.selectedElement) {
			this.state.selectedElement.classList.remove('selected');
		}
		element.target.classList.add('selected');

		this.setState({
			selectedMonth: month,
			selectedYear: year,
			selectedElement: element.target,
		});
	}
	
    calculateDates(month, year) {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth !== month || this.state.selectedYear !== year) {
                this.state.selectedElement.classList.remove('selected');
            } else {
                this.state.selectedElement.classList.add('selected');
            }
        }
        return {
            firstOfMonth: new Date(year, month, 1),
            lastOfMonth: new Date(year, month + 1, 0),
            daysInMonth: new Date(year, month + 1, 0).getDate(),
            daysInPrevMonth: new Date(year, month, 0).getDate(),
        }
    }

    getPrevious() {
        let state = {};
		
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }

        Object.assign(state, this.calculateDates.call(null, state.month, state.year));
        this.setState(state);
    }

    getNext() {
        let state = {};
		
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }

        Object.assign(state, this.calculateDates.call(null, state.month, state.year));
        this.setState(state);
    }

    getEvents() {
		fetch('http://128.199.53.150/events')
			.then(response => {
			return response.json();
		})
			.then(response => {
			this.setState({
				events: response,
			});
		});
    }

    getTrainers() {
		fetch('http://128.199.53.150/trainers')
			.then(response => {
			return response.json();
		})
			.then(response => {
			this.setState({
				trainers: response,
			});
		});
    }

    componentWillMount() {
        this.setState(this.calculateDates.call(null, this.state.month, this.state.year));
    }

    componentDidMount() {
        this.getEvents();
        this.getTrainers();
    }

	getChildContext() {
		return {
			month: this.state.month, 
			year: this.state.year,
			firstOfMonth: this.state.firstOfMonth,
			daysInPrevMonth: this.state.daysInPrevMonth,
			daysInMonth: this.state.daysInMonth,
			onSelect: this.selectDate,
			lastOfMonth: this.state.lastOfMonth,
		}
	}
	
    render() {
        return(
            <div className="calendar">
				<Header 
					monthNames={this.state.monthNames} 
					month={this.state.month} 
					year={this.state.year}
					onPrev={this.getPrevious} 
					onNext={this.getNext} 
				/>

				<WeekDays weekDays={this.state.weekDays} />

				<MonthDates 
					events={this.state.events}
					trainers={this.state.trainers}
				/>
            </div>
        );
    }
}

Calendar.childContextTypes = {
	month: PropTypes.number, 
	year: PropTypes.number,
	firstOfMonth: PropTypes.instanceOf(Date),
	daysInPrevMonth: PropTypes.number,
	daysInMonth: PropTypes.number,
	onSelect: PropTypes.func,
	lastOfMonth: PropTypes.instanceOf(Date),
};
