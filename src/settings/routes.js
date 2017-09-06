import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '_pages/App';
import Entrance from '_pages/Entrance';
import SetUp from '_pages/SetUp';
import Feed from '_pages/Feed';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Entrance} />
    <Route path="/setup" component={SetUp} />
    <Route path="/feed" component={Feed} />
  </Route>
);

export default routes();
