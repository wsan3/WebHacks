import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './components/Dashboard';
import Main from './components/Main';
// import './firebase'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}