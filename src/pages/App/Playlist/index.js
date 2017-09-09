import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TrackInfo from '_components/TrackInfo';

import style from './style.styl';

class Playlist extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div>
        <h3 className={style.title}>Что сейчас играет</h3>
        <div className={style.list}>
          { playlist.map((item) => (
            <TrackInfo
              key={item.id}
              className={style.item}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
  player: state.player,
}))(Playlist);

Playlist.propTypes = {
  playlist: PropTypes.object,
};
