import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import About from './about';
import Contact from './contact';
import Profile from './profile';
import Profiles from './profiles';
import Login from './login';
import ODUConnectCalendar from './calendar';
import ProjectTable from './projectTable';
import UserTable from './userTable';
import ODU_connect from './images/ODU_connect.png';
import apiTest from './apiTest';
import './App.css';
import EditProfile from './editprofile';
import top10 from './top10';
import top25 from './top25';
import OpportunityForm from './opportunityForm';
import createBalloon from './createBalloon';
import { useAppContext } from "./context";


function MyNav() {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return (
      <Router>
        <div >
          <nav className="navbar navbar-expand-xl navbar-dark monarchBlue" >
            <ul className="navbar-nav ">
              <li><img src={ODU_connect} style={{ width: 40, height: 40 }} /></li>
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/projects'} className="nav-link nav-right">Projects</Link></li>
              <li><Link to={'/calendar'} className="nav-link ">Calendar</Link></li>
              <li><Link to={'/about'} className="nav-link">About</Link></li>
              <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
              <li><Link to={'/login'} className="nav-link nav-right">Log In</Link></li>


            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/apiTest' component={apiTest} />
            <Route path='/calendar' component={ODUConnectCalendar} />
            <Route path='/editprofile' component={EditProfile} />
            <Route path='/profiles' component={Profiles} />
            <Route path='/top10' component={top10} />
            <Route path='/top25' component={top25} />
            <Route path='/opportunityForm' component={OpportunityForm} />
            <Route path='/createBalloon' component={createBalloon} />
            <Route path='/projects' component={ProjectTable} />
            <Route path='/people' component={UserTable} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div >
          <nav className="navbar navbar-expand-xl navbar-dark monarchBlue" >
            <ul className="navbar-nav mr-auto">
              <li><img src={ODU_connect} style={{ width: 40, height: 40 }} /></li>
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/projects'} className="nav-link nav-right">Projects</Link></li>
              <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
              <li><Link to={'/about'} className="nav-link">About</Link></li>
              <li><Link to={'/calendar'} className="nav-link ">Calendar</Link></li>
              <li><Link to={'/people'} className="nav-link nav-right">People</Link></li>
              <li><Link to={'/profile'} className="nav-link">Profile</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/apiTest' component={apiTest} />
            <Route path='/calendar' component={ODUConnectCalendar} />
            <Route path='/editprofile' component={EditProfile} />
            <Route path='/profiles' component={Profiles} />
            <Route path='/top10' component={top10} />
            <Route path='/top25' component={top25} />
            <Route path='/opportunityForm' component={OpportunityForm} />
            <Route path='/createBalloon' component={createBalloon} />
            <Route path='/projects' component={ProjectTable} />
            <Route path='/people' component={UserTable} />
          </Switch>
        </div>
      </Router>
    );
  }

}

// Use state to show different div style based on toggle?
//            <li><Link to={'/profile'} className="nav-link ">Profile</Link></li>

export default MyNav;
