import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

// Components
import Header from './components/header/Header';
import Graph from './components/graph/Graph';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/graph" component={Graph} />
        <Redirect exact from="/" to="/graph" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
