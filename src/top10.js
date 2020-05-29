import React, { Component } from 'react';
import MakeBalloon from './balloonmaker.js';
import Dropdown from 'react-bootstrap/Dropdown';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';
import Home from './home.js';
import "./App.css";
import Top25 from './top25';
import { useSpring, animated } from 'react-spring';

function Top10() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2750 } })


  return (
    <div className="maxwidth">
      <Dropdown>

        <Dropdown.Toggle className="filterDrop" variant="success" id="dropdown-basic" size="lg" drop="right">
          Filter
            </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item>
            <Router>
              <li><Link to={'/'}>Top 5</Link></li>
              <Switch>
                <Route exact path='/' component={Home} />
              </Switch>
            </Router>
          </Dropdown.Item>

          <Dropdown.Item >Top 10</Dropdown.Item>

          <Dropdown.Item>
            <Router>
              <li><Link to={'/top25'}>Top 25</Link></li>
              <Switch>
                <Route path='/top25' component={Top25} />
              </Switch>
            </Router>
          </Dropdown.Item>

        </Dropdown.Menu>

      </Dropdown>
      <br />
      <animated.div className="balloons" style={props}>
        <MakeBalloon top='10' />
      </animated.div>

    </div>
  );
}


export default Top10;