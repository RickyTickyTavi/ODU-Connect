import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Balloon_group from './images/Balloon_group.png';

class Profiles extends Component {

  render() {
    return (
      <div>
        <h1> User Profile </h1>
        <div className="profile">
          <img src={Balloon_group} className="profileAvatar" />
          <p class="profileName">Bob Phelps</p><br />
          <b>Title:</b> Event Cooordinator<br />
          <b>Company:</b> Old Dominion University<br />
          <b>Email:</b> phel012@odu.edu<br />
          <b>Address:</b> 5115 Hampton Boulevard Norfolk, VA 23529<br />
          <b>Keywords:</b> <br />
          <div class="keywords">
            Computer Science, Technology, Mentorship, Java
              </div>
          <br />
          <br />
          <Link to="/editprofile">Edit Profile</Link>
        </div>
      </div>
    );
  }
}

export default Profiles;