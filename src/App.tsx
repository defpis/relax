import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home, Abort, Panel } from './pages';

export const App: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/abort">
          <Abort />
        </Route>
        <Route path="/panel">
          <Panel />
        </Route>
        <Route exact path="/">
          <Redirect to="/panel" />
        </Route>
      </Switch>
    </Router>
  );
};
