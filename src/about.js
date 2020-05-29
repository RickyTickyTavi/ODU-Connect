import React, { Component } from 'react';
import "./App.css";
import Confetti from 'react-confetti';

class About extends Component {


  render() {
    return (

      <div className="cf" style={{ alignItems: 'center' }} >
        <Confetti className="cf" recycle={false} numberOfPieces={3000}


        />

        <div className="aboutBox1">

          <h1 className="headerE">About ODU Connect</h1>

        </div>
        <div className="aboutBox2" >
          <div style={{ margin: 'auto', width: '1400px' }}>
            <h1 className="headerE">Mission</h1>
            <p> To provide a collaborative workspace that enables Old Dominion University and other organizations to mutually benefit from each other in their respective careers and businesses.  </p>
          </div>
        </div>


        <div className="keyFeaturesB">
          <div style={{ margin: 'auto', width: '1400px' }}>
            <h1 className="headerE">Benefits</h1>
            <p>ODU Connect is beneficial to individuals and organizations alike. By connecting ODU students with organizations, 
              this webpage helps facilitate needs for both. If you or your organization are looking for a way to acquire volunteers or mentor 
              Old Dominion University Computer Science students, join ODU Connect today. 
              Contact us at <a href="https://www.cs.odu.edu/~411yello/oduconnect/#/contact">ODU Connect.</a></p>
          </div>
        </div>

        <div className="aboutBox1">
          <div style={{ margin: 'auto', width: '1400px' }}>
            <h1 className="headerE">Product Description </h1>
            <p>
              ODU Connect facilitates a connection between ODU and AO for
              bidirectional communication. The key features of ODU Connect are its
              web portal, notification system, Opportunity data collection, and
              collaboration visualization. Its features for targeted event
              coordination are skill/keyword matching algorithms and Calendar
              Management. Research opportunities, internships, volunteerism, events,
              and other Opportunity data sets are managed and maintained through ODU
              Connect's database. Calendar Deconflicting algorithms prevent
              scheduling conflicts. ODU Connect visually represents collaboration
              efforts in the form of ODU color-based Balloons. The Balloons are
              interactive and display an organization's name, contact information,
              and Opportunity information. Fulfilled collaboration efforts pop the
              Balloon, revealing the respective organization's logo.
         </p>
          </div>
        </div>

        <div className="aboutBox2">
          <h1 className="keywordE">Key Features</h1>
          <ul className="list-par">
            <li className="opp-ri">•	Opportunity management</li>
            <li >•	Portal for Opportunity coordinators</li>
            <li className="opp-le">•	User profile search</li>
          </ul>
          <ul className="list-par">
            <li className="opp-ri">•	Calendar management</li>
            <li>•	Keyword matching</li>
          </ul>

        </div>

        <div className="keyFeaturesB">
          <h1 className="headerEM">User Manual</h1>
          <iframe className="user-man" src="https://drive.google.com/file/d/1uLxS4vpe8Ld437l9gvJU1IfdMym9vF8y/preview" width="800" height="850"></iframe>
        </div>

      </div>

    );
  }
}

export default About;
