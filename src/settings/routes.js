import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '_pages/App';
import Entrance from '_pages/Entrance';
import SetUp from '_pages/SetUp';
import Playlist from '_pages/Playlist';
import Player from '_pages/Player';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Entrance} />
    <Route path="/setup" component={SetUp} />
    <Route path="/playlist" component={Playlist} />
    <Route path="/player" component={Player} />
  </Route>
);

export default routes();
