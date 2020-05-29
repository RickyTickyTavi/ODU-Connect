import React, { Component } from 'react';
import MakeBalloon from './balloonmaker.js';
import Dropdown from 'react-bootstrap/Dropdown';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';
import Top10 from './top10';
import Top25 from './top25';
import "./App.css";
import { useSpring, animated } from 'react-spring';

function Home() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2750 } })

  return (
    <div className="maxwidth">

      <Dropdown>

        <Dropdown.Toggle className="filterDrop" variant="success" id="dropdown-basic" size="lg" drop="right">
          Filter
            </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Top 5</Dropdown.Item>

          <Dropdown.Item >
            <Router>
              <li><Link to={'/top10'}>Top 10</Link></li>
              <Switch>
                <Route path='/top10' component={Top10} />
              </Switch>
            </Router>
          </Dropdown.Item>

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

        <MakeBalloon top='5' />

      </animated.div>
    </div>
  );
}

export default Home;
