import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'

import './main.scss' // webpack must be configured to do this

/*
Calendar Documentation:
https://fullcalendar.io/docs/react

Event Documentation:
https://fullcalendar.io/docs/event-object
*/

const API = "https://411yellows20.cs.odu.edu/joe";

class ODUConnectCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {

                let tmpArray = []
                for (var i = 0; i < data.results.length; i++) {
                    tmpArray.push({
                        title: data.results[i].ProjectName,
                        date: (data.results[i].EventDateTime),
                        organization: data.results[i].Organization,
                        location: data.results[i].ProjectLocation,
                        contact: data.results[i].Contact,
                        createdby: data.results[i].CreatedBy,
                        desc: data.results[i].ProjectDescription
                    })
                }

                this.setState({ events: tmpArray })
            });
    }

    render() {
        const { events } = this.state

        console.log(events)


        return (
            <div className='ODUConnect-app'>
                <div className='ODUConnect-app-top'>
                </div>
                <div className='ODUConnect-app-calendar'>

                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={this.state.events}
                        eventClick={
                            function (info) {
                                Swal.fire({
                                    title: info.event.title,
                                    html: info.event.extendedProps.organization
                                        + "<br /> <br />  Where: "  + info.event.extendedProps.location
                                        + "<br />" + "<br />" + info.event.extendedProps.desc
                                        + "<br />" + "<br />" + 'Project Leader: ' + info.event.extendedProps.createdby
                                        + "<br />" + "<br />" + 'Contact : ' + info.event.extendedProps.contact
                                })
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default ODUConnectCalendar;
