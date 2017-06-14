import React from 'react';

export default class Header extends React.Component {
    render() {
        return(
			<div>
				<div className="month-name">
					{this.props.monthNames[this.props.month]} {this.props.year}    
				</div>
				<div className="navigation">
					<div className="prev-month" onClick={this.props.onPrev} role='button'>prev</div>
					<div className="next-month" onClick={this.props.onNext} role='button'>next</div>
				</div>
            </div>
        )
    }
}
