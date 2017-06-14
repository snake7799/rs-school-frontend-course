import React from 'react';
import LoadingIndicator from  'react-loading-indicator';
import { Button } from 'react-bootstrap';

import PreviousMonth from './PreviousMonth';
import CurrentMonth from './CurrentMonth';
import NextMonth from './NextMonth';
import ModalWindow from './ModalWindow';

export default class MonthDates extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = { 
            showModal: false,
            event: null,
            trainersId: null, 
        };
		
        this.getTrainers = this.getTrainers.bind(this);
		this.cellClickHandler = this.cellClickHandler.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    getTrainers(speakers) {
        let trainer = {};
        let eventTrainers = [];
        
        for (let i = 0; i < speakers.length; i += 1) {
            trainer = this.props.trainers.find(speaker => {
                return speaker.id === speakers[i];
            });
            eventTrainers.push(trainer);
        }

        this.setState({
            eventTrainers: eventTrainers,
        });
    }
	
	cellClickHandler(event) {
		this.setState({
			showModal: true,
			event: event,
			trainersId: event.speakers,
		});
		this.getTrainers(event.speakers);
	}
	
    closeModal() {
        this.setState({
            showModal: false,
        });
    }

    render() {
		if (!this.props.events) {
            return <LoadingIndicator
					   className="loading-indicator"
					   segmentLength={50} 
					   segmentWidth={20} 
					   spacing={20}
					/>
        }
        return(
            <div>         
				<PreviousMonth
                    events={this.props.events}
					cellClickHandler={this.cellClickHandler}
                />

				<CurrentMonth
					events={this.props.events}
					cellClickHandler={this.cellClickHandler}
				/>

                <NextMonth
					events={this.props.events}
					cellClickHandler={this.cellClickHandler}
				/>

                <ModalWindow
                    event={this.state.event}
                    trainers={this.state.eventTrainers}
                    showModal={this.state.showModal}
                    close={this.closeModal}
                />
            </div>
        )  
    }
}
