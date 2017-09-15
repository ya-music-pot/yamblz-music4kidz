import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '_pages/App';
import Entrance from '_pages/Entrance';
import SetUp from '_pages/SetUp';
import Feed from '_pages/Feed';
import Personal from '_pages/Personal';
import PersonalMobile from '_pages/PersonalMobile';
import ClientError from '_pages/ClientError';
import ServerError from '_pages/ServerError';

const authToken = false;
const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={authToken ? Feed : Entrance} />
    <Route path="/entrance" component={Entrance} />
    <Route path="/setup" component={SetUp} />
    <Route path="/feed" component={Feed} />
    { authToken && <Route path="/personal" component={Personal} /> }
    <Route path="/mobile/profile" component={PersonalMobile} />
    <Route path="/error" component={ServerError} />
    <Route path="*" component={ClientError} />
  </Route>
);

export default routes();
