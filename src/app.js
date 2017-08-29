import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import store from '_settings/store';


import '_settings/main.css';


import Playlist from '_pages/Playlist';

ReactDOM.render((
  <Provider store={store}>
    <Playlist />
  </Provider>
), document.getElementById('root'));
