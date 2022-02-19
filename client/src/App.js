import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './components/Dashboard';
import Main from './components/Main';
import NewExpense from './components/NewExpense';
import NewGroup from './components/NewGroup';
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
          <Route path="/addexpense">
            <NewExpense />
          </Route> 
          <Route path="/newgroup">
            <NewGroup />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}