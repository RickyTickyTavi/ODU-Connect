import React, { Component } from 'react';
import MakeBalloon from './balloonmaker.js';
import Dropdown from 'react-bootstrap/Dropdown';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';
import "./App.css";
import Home from './home.js';
import Top10 from './top10';
import { useSpring, animated } from 'react-spring';

function Top25() {

  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2750 } })

  return (
    <div class="maxwidth">
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

          <Dropdown.Item >
            <Router>
              <li><Link to={'/top10'}>Top 10</Link></li>
              <Switch>
                <Route path='/top10' component={Top10} />
              </Switch>
            </Router>
          </Dropdown.Item>

          <Dropdown.Item>Top 25</Dropdown.Item>

        </Dropdown.Menu>

      </Dropdown>
      <br />
      <animated.div className="balloons" style={props}>
        <MakeBalloon top='25' />
      </animated.div>
    </div>
  );
}


export default Top25;