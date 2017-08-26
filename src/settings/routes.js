import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from '_pages/App';
import Entrance from '_pages/Entrance';
import SetUp from '_pages/SetUp';
import Mood from '_pages/Mood';
import Action from '_pages/Action';
import Playlist from '_pages/Playlist';
import Player from '_pages/Player';

const routes = (
  <Switch>
    <App>
      <Route exact path="/" component={Entrance} />
      <Route path="/setup" component={SetUp} />
      <Route path="/mood" component={Mood} />
      <Route path="/action" component={Action} />
      <Route path="/playlist" component={Playlist} />
      <Route path="/player" component={Player} />
    </App>
  </Switch>
);

export default routes;
