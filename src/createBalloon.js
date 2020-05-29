import React, { Component } from 'react';
import { userService } from './_services';
import axios from 'axios';
import Popup from 'reactjs-popup';


class createBalloon extends Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            ProjectName: '',
            ProjectDescrition: '',
            eventDateTime: '',
            selectedOption: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            PercentComplete: '',
            CreatedBy: '',
            submitted: false,
            loading: false,
            error: [],
            user: {},
            httpStatus: '',
            open: false,
            open2: false,
            err: '',
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal2 = this.openModal2.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isErr = this.isErr.bind(this);
        

    }

    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }

    openModal2() {
        this.setState({ open2: true });
    }
    closeModal2() {
        this.setState({ open2: false });
    }

        sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    isErr() {
        const {err} = this.state;
        if (!err) {
            this.setState({ open2: true})
        }
    }

    

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {ProjectName, ProjectDescription, eventDate, eventTime, address, city, state, zip, PercentComplete, error, selectedOption, open2, user } = this.state;

        // stop here if form is invalid
        if (!(ProjectName && ProjectDescription && eventDate && eventTime && address && city && state && zip && PercentComplete)) {
            return;
        }

        this.setState({ loading: true });
       axios.post('https://411yellows20.cs.odu.edu/createproject/' + ProjectName + '/' + eventDate + ' ' + eventTime + '/' + selectedOption + '/' + ProjectDescription + '/' + address + '/' + city + '/' + state + '/' + zip + '/bobphelps/' + PercentComplete)
            .catch(err => this.setState({ open: true, err}, console.log(err)))
            .then(this.setState({error, loading: false, ProjectName: '', ProjectDescription: '', eventDate: '', eventTime: '', selectedOption: '', address: '', city: '', state: '', zip: '', PercentComplete: ''}));

        
            this.sleep(1000).then(this.isErr); 
       
    }

    render() {
        const { ProjectName, ProjectDescription, eventDate, eventTime, selectedOption, address, city, state, zip, PercentComplete, submitted, loading, error } = this.state;
        return (
            <div className="login-center">

                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >

                    <div className="Mymodal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
            </a>
            Error: You have tried to create an event at the same day and time as another event.
            You can't be in two places at once!
          </div>
                </Popup>

                <Popup
                    open={this.state.open2}
                    closeOnDocumentClick
                    onClose={this.closeModal2}
                >

                    <div className="Mymodal">
                        <a className="close" onClick={this.closeModal2}>
                            &times;
            </a>
            Event successfully created!
          </div>
                </Popup>

                <h1>Create a new opportunity!</h1>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !ProjectName ? ' has-error' : '')}>
                        <label htmlFor="ProjectName">Project Name</label>
                        <input type="text" className="form-control" name="ProjectName" value={ProjectName} onChange={this.handleChange} />
                        {submitted && !ProjectName &&
                            <div className="help-block">A name for the project is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !ProjectDescription ? ' has-error' : '')}>
                        <label htmlFor="ProjectDescription">Project Description</label>
                        <input type="text" className="form-control" name="ProjectDescription" value={ProjectDescription} onChange={this.handleChange} />
                        {submitted && !ProjectDescription &&
                            <div className="help-block">A description of the project is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !eventDate ? ' has-error' : '')}>
                        <label htmlFor="eventDate">Project Date(MM-DD-YYYY)</label>
                        <input type="text" className="form-control" name="eventDate" value={eventDate} onChange={this.handleChange} />
                        {submitted && !eventDate &&
                            <div className="help-block">A start Date is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !eventTime ? ' has-error' : '')}>
                        <label htmlFor="eventTime">Project Time(HH:MM)</label>
                        <input type="text" className="form-control" name="eventTime" value={eventTime} onChange={this.handleChange} />
                        {submitted && !eventTime &&
                            <div className="help-block">A start Time is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !selectedOption ? ' has-error' : '')}>
                        <label htmlFor="selectedOption">Organization</label>

                        <select value={selectedOption} name="selectedOption" className="form-control" id="selectedOption" onChange={this.handleChange}>
                            <option value="select">Select Organization...</option>
                            <option value="Roc Solid Foundation">Roc Solid Foundation</option>
                            <option value="Old Dominion University">Old Dominion University</option>
                            <option value="American Civil Liberties Union">American Civil Liberties Union</option>
                            <option value="American Jewish World Service">American Jewish World Service</option>
                            <option value="Center for Constitutional Rights">Center for Constitutional Rights</option>
                            <option value="Human Rights Watch">Human Rights Watch</option>
                            <option value="L3Harris">L3Harris</option>
                            <option value="FTI">FTI</option>
                            <option value="Mitre">Mitre</option>
                            <option value="Alion">Alion</option>
                            <option value="Alion">Alion</option>
                            <option value="Anthem">Anthem</option>
                            <option value="IBM">IBM</option>
                            <option value="Amplified IT">Amplified IT</option>
                        </select>

                        {/*submitted && !selectedOption &&
                    <div className="help-block">An organization is required</div>
                }*/}
                    </div>

                    <div className={'form-group' + (submitted && !address ? ' has-error' : '')}>
                        <label htmlFor="address">address</label>
                        <input type="text" className="form-control" name="address" value={address} onChange={this.handleChange} />
                        {submitted && !address &&
                            <div className="help-block">A Location is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !city ? ' has-error' : '')}>
                        <label htmlFor="city">city</label>
                        <input type="text" className="form-control" name="city" value={city} onChange={this.handleChange} />
                        {submitted && !city &&
                            <div className="help-block">A Location is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !state ? ' has-error' : '')}>
                        <label htmlFor="state">state</label>
                        <input type="text" className="form-control" name="state" value={state} onChange={this.handleChange} />
                        {submitted && !state &&
                            <div className="help-block">A Location is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !zip ? ' has-error' : '')}>
                        <label htmlFor="zip">zip</label>
                        <input type="text" className="form-control" name="zip" value={zip} onChange={this.handleChange} />
                        {submitted && !zip &&
                            <div className="help-block">A Location is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !PercentComplete ? ' has-error' : '')}>
                        <label htmlFor="PercentComplete">Progress (please only enter a number for completion percentage)</label>
                        <input type="text" className="form-control" name="PercentComplete" value={PercentComplete} onChange={this.handleChange} />
                        {submitted && !PercentComplete &&
                            <div className="help-block">A percent complete is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Create</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>

            </div>
        );
    }
}

export default createBalloon;