import React, { Component, useState, useEffect } from 'react';
import blueBalloon from './images/Blue.png';
import darkBlueBalloon from './images/Dark_blue.png';
import grayBalloon from './images/Gray.png';
import lightBlueBalloon from './images/Light_Blue.png';
import Button from 'react-bootstrap/Button';
import './App.css';
import Moment from 'react-moment';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSpring, animated } from 'react-spring';
import Popup from 'reactjs-popup';

const rImages = [blueBalloon, grayBalloon, lightBlueBalloon, darkBlueBalloon];
const interp = i => r => `translate3d(0, ${25 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`

function Balloon(props) {

  const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 2 * Math.PI })
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true,
  })

  function randomImage() {
    var randomInt = Math.floor(Math.random() * rImages.length) //for random img
    var rImage = rImages[randomInt]

    return (rImage)
  };

  return (

    <div>
      <Popup modal trigger={
        <animated.div style={{ transform: radians.interpolate(interp(2)) }}>
          <Button data-tip data-for={props.ProjectName} style={{ backgroundColor: "white" }} variant="light" >
            <img src={randomImage()} style={{ width: 162.6, height: 450 }} />
          </Button><div className="centered">{props.ProjectName}</div>

        </animated.div>}>


        {close => (

          <div className='Mymodal'>
            <a className='close' onClick={close} >
              &times;
              </a>

            <div className="header">{props.ProjectName}</div>
            <div className="content">
              <p><b>Organization:</b> {props.Organization}</p>
              <b>Progress:</b>
              <p><ProgressBar striped variant="info" now={props.PercentComplete} label={`${props.PercentComplete}%`} /></p>
              <b>Event Date:</b> <Moment>{props.eventDateTime}</Moment><br /><br />
              <b>Description:</b> {props.ProjectDescription}<br /><br />
              <b>Location:</b> {props.ProjectLocation}<br /><br />
              For more information contact {props.CreatedBy}. {props.ContactInfo}.
              </div>
          </div>)}
      </Popup>
    </div>
  )
}

export default Balloon;