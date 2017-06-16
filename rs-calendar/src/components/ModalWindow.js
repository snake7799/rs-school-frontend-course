import React from 'react';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

export default class ModalWindow extends React.Component {
	render() {
		return (
			<Modal
				show={this.props.showModal}
				onHide={this.props.close}
				aria-labelledby="contained-modal-title"
			>
				<Modal.Header
					className={(this.props.event) ? this.props.event.type : ''}
					closeButton
				>
					<Modal.Title id="contained-modal-title">
						{(this.props.event) ? `${this.props.event.title}: ${this.props.event.type}` : ''}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div>
						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Start:</h4>
						<p>{(this.props.event) ? `${this.props.event.start.slice(0, 10)} ${this.props.event.start.slice(11, -1)}` : '' }</p>

						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Description:</h4>
						<p> {(this.props.event) ? this.props.event.description : '' }</p>

						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Duration:</h4>
						<p> {(this.props.event) ? this.props.event.duration : '' }</p>

						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Trainers:</h4>
						<div>
							{(this.props.event) ? this.props.trainers.map((trainer, i) =>
								<div className="trainer" key={i}>
									<div>{trainer.name}</div>
									<img src={trainer.avatar} width="100" alt=''/>
								</div>
							) : '' }
						</div>

						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Location:</h4>
						<p>{(this.props.event) ? this.props.event.location : '' }</p>

						<h4 className={(this.props.event) ? `${this.props.event.type}-underline` : ''}>Resources:</h4>
						<ul>
							{(this.props.event) ? this.props.event.resources.map((resource, i) =>
								<li key={i}>
									<h4>{resource.type}</h4>
									<div>{resource.description}</div>
									<div><a href={resource.resource} target="_blank" rel="noopener noreferrer" >Link</a></div>
								</li>
							) : ''}
						</ul>

						<h3 className="message">Leave a message</h3>
						<Form horizontal>
							<FormGroup controlId="formHorizontalName">
								<Col componentClass={ControlLabel} sm={2}>Name</Col>
								<Col sm={8}>
									<FormControl type="text" placeholder="Your full name" />
								</Col>
							</FormGroup>
							<FormGroup controlId="formControlsTextarea">
								<Col componentClass={ControlLabel} sm={2}>Message</Col>
								<Col sm={8}>
									<FormControl componentClass="textarea" placeholder="Your message" />
								</Col>
							</FormGroup>
							<FormGroup>
								<Col smOffset={2} sm={8}>
									<Button type="submit">Send</Button>
								</Col>
							</FormGroup>
						</Form>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						className={(this.props.event) ? this.props.event.type : ''}
						onClick={this.props.close}
					>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
