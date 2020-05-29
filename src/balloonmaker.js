import React, { Component, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import events from './jsonFiles/events.json';
import './App.css';
import { useSpring, animated } from 'react-spring';
import Balloon from './balloon';

const API = "https://411yellows20.cs.odu.edu/get";



function MakeBalloon(props) {



  const [Projects, setProjects] = useState([]);
  const [IsLoaded, setIsLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const topNumber = props.top;

  async function fetchData() {

    const res = await fetch(API + topNumber);

    res
      .json()
      .then(res => setProjects(res.results), setIsLoaded(true))
      .catch(err => setError(err))
  }

  useEffect(() => {
    /*this.setState({projects: events.opportunities}); //projects: events.opportunities is accessing the JSON text file.*/
    fetchData();
  }, []);



  if (hasError) {
    return <div>Error: {hasError.message}</div>;
  }
  else if (!IsLoaded) {
    return <div>Loading...</div>
  }
  else {

    return (

      <div className="maxwide">
        {Projects.map(project =>
          <div key={project.ProjectName} className="container">

            <Balloon
              ProjectName={project.ProjectName}
              ProjectDescription={project.ProjectDescription}
              eventDateTime={project.EventDateTime}
              Organization={project.Organization}
              ProjectLocation={project.ProjectLocation}
              PercentComplete={project.PercentComplete}
              CreatedBy={project.CreatedBy}
              ContactInfo={project.Contact}
            />

            <ReactTooltip id={project.ProjectName} className='customTheme' place="right">
              <span>
                Organization: {project.Organization} <br /><br />
            Description: {project.ProjectDescription}<br /><br />
            Location: {project.ProjectLocation}
              </span>
            </ReactTooltip>
          </div>
        )}
      </div>
    )
  }
}


export default MakeBalloon;
