import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Playground } from './pages';

const AppRouter: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/playground">
          <Playground />
        </Route>
        <Route exact path="/">
          <Redirect to="/playground" />
        </Route>
      </Switch>
    </Router>
  );
};

export const App: React.FC<{}> = () => {
  return <AppRouter />;
};
