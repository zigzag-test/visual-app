import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

// Components
import Header from './components/header/Header';
import Graph from './components/graph/Graph';
import Table from './components/table/Table';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/table" component={Table} />
        <Route path="/graph" component={Graph} />
        <Redirect exact from="/" to="/graph" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
