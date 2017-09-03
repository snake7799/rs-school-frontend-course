import React from 'react';

export default class Conventions extends React.PureComponent {
	render() {
		return (
			<section className="conventions">
				<div className="conventions-item">
					<div className="webinar"></div> webinar
				</div>
				<div className="conventions-item">
					<div className="lecture"></div> lecture
				</div>
				<div className="conventions-item">
					<div className="workshop"></div> workshop
				</div>
				<div className="conventions-item">
					<div className="event"></div> event
				</div>
				<div className="conventions-item">
					<div className="deadline"></div> deadline
				</div>
			</section>
		);
	}
}
