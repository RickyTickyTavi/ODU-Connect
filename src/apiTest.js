import React, { Component, useState } from 'react';
import blueBalloon from './images/Blue.png';
import darkBlueBalloon from './images/Dark_blue.png';
import grayBalloon from './images/Gray.png';
import lightBlueBalloon from './images/Light_Blue.png';
import ReactTooltip from 'react-tooltip';
import events from './jsonFiles/events.json';
import Button from 'react-bootstrap/Button';
import './App.css';
import Moment from 'react-moment';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';


const API = "https://411yellows20.cs.odu.edu/get25";
const PokeAPI = "https://pokeapi.co/api/v2/pokemon";

class apiTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [], isLoaded: false, error: null //this is for the JSON data and the modal
        }
    }

    componentDidMount() {
        fetch(PokeAPI)
            .catch(error => this.setState({ error }))
            .then(response => response.json())
            .then(data => this.setState({ projects: data.results }))


    }

    render() {
        const { projects, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        }
        else {


            return (

                <div className="maxwide">


                    {projects.map(project =>

                        <div key={project.name} className="container">

                            <Button> {project.name} </Button>

                        </div>


                    )}


                </div>
            )


        }
    };

}

export default apiTest;
