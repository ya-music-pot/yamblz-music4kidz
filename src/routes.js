import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from '_pages/App';
import Entrance from '_pages/Entrance';
import SetUp from '_pages/SetUp';

const routes = (
  <Switch>
    <App>
      <Route exact path="/" component={Entrance} />
      <Route path="/setup" component={SetUp} />
    </App>
  </Switch>
);

export default routes;
