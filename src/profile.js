import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import EditProfile from './editprofile';
import Balloon_group from './images/Balloon_group.png';
import Button from 'react-bootstrap/Button';
import { useAppContext } from "./context.js";
import CreateBalloon from './createBalloon';


//change number at end of api link to get different profile info
const API = "https:////411yellows20.cs.odu.edu/getuser/";
const APIKeyword = "https://411yellows20.cs.odu.edu/getuserkeywords/";

function Profile() {
  const { userHasAuthenticated } = useAppContext();

  const [hasError, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [userKeywords, setUserKeywords] = useState([]);
  const [contact, setContactMethod] = useState();

  async function fetchData(username, password) {
    const res = await fetch(API + localStorage.getItem('localuser'));

    res
      .json()
      .then(res => setUser(res.results))
      .catch(err => setError(err))
  }

  async function fetchKeywords() {
    const res2 = await fetch(APIKeyword + localStorage.getItem('localuser'));
    console.log(localStorage.getItem('localuser'));

    res2
      .json()
      .then(res2 => setUserKeywords(res2.results))
      .catch(err2 => setError(err2))
  }

  useEffect(() => {
    fetchData();
    fetchKeywords();
  }, []);

  const handleLogout = e => {
    localStorage.removeItem('user');
    localStorage.removeItem('localuser');
    userHasAuthenticated(false);
  }

  function processContactMethod(userCM) {
    if (userCM === "M") {
      return "Mobile Phone";
    } else if (userCM === "H") {
      return "Home Phone";
    } else if (userCM === "O") {
      return "Office Phone";
    } else {
      return "Email";
    }
  }

  if (hasError) {
    return <div>Error: {hasError.message}</div>;
  } else {
    return (
      <div>
        <h1> User Profile </h1>
        <div class="profile">
          <Button style={{ float: 'right' }} variant='primary' >
            <Link to={'/createBalloon'} style={{ color: '#FFF' }}>Create Opportunity!</Link>
          </Button>
          {user.map(user =>
            <div> <img src={Balloon_group} class="profileAvatar" /><div class="profileName" >{user.UserFirstName} {user.UserLastName} </div>
              <p><b>Title:</b> {user.Title}<br />
                <b>Organization:</b> {user.Organization}<br />
                <b>Email:</b> {user.UserEmailAddress}<br />
                <b>Office Phone:</b> {user.UserOfficePhone}<br />
                <b>Mobile Phone:</b> {user.UserMobilePhone}<br />
                <b>Home Phone:</b> {user.UserHomePhone}<br />
                <b>Preferred Contact Method:</b> {processContactMethod(user.DefaultContactMethod)}<br />
                <b>Address:</b> {user.UserAddressLine1} {user.UserAddressLine2}, {user.UserCity}, {user.UserState} {user.UserzipCode}<br />
                <b>Keywords:</b> <br /></p>
            </div>
          )}
          <div class="keywords">
            {userKeywords.map(keywords =>
              <div class="keyword">
                {keywords.Keyword}
              </div>
            )}
          </div>

          {/* <h2>Notification Settings</h2>
                <div className="profile">
                    Settings go here.
                </div> */}
          <br />
          <br />
          

          <Link to={'/editprofile'}>Edit Profile</Link>
          <Button style={{ float: 'right' }} onClick={handleLogout}>
            <Link to={'/login'} style={{ color: '#FFF' }}>Logout</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;