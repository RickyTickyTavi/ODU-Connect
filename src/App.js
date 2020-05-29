import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { AppContext } from "./context.js";
import MyNav from './mynavbar.js';




function App() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (

    <div className="App">

      {/* <MyNav isAuth={loggedIn}/> */}
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <MyNav />
      </AppContext.Provider>


    </div>
  );
}



export default App;
