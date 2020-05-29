import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userService } from './_services';

class OpportunityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            time: '',
            organization: '',
            location: '',
            description: ''
        };
    }

    handleSubmit = e => {
        
    }

render() {
    const {title, date, time, organization, location, description} = this.state;
    return (
            <div>
                <h1> Opportunity Form </h1>
            <div className="OpportunityForm">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST" className="form-editContainer">
            
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" value={title} />
            </div>
            
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" className="form-control" name="date" value="2020-04-25"
                    min="2020-04-01" max="2020-12-31"/>
            </div>
            
            <div className="form-group">
                <label htmlFor="time">Time</label>
                <input type="time" className="form-control" name="time" value={time} min="00:00" max="24:00" />
            </div>
            
            <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input type="text" className="form-control" name="organization" value={organization}/>
            </div>
            
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control" name="location" value={location}/>
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" name="description" value={description}/>
            </div>
            
            <div className="button-div">
                <br />
                <button type="submit" className="btn btn-primary">Upload</button>
            </div>
            
            </form>
            </div>
            </div>
            );
}
}

export default OpportunityForm;
