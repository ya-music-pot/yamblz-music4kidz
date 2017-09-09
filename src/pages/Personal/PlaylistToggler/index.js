import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import CardList from '_components/CardList';
import style from './style.styl';

export default class PlaylistToggler extends Component {
  state = {
    position: PlaylistToggler.playlist,
  };

  _handleToggle = (id) => {
    this.setState({
      position: id,
    });
  }

  render() {
    const { position } = this.state;
    const { className } = this.props;

    return (
      <div className={style[className]}>
        <div className={style.filter}>
          <div
            className={
              cl(style.filterItem, position === PlaylistToggler.playlist && style.filterItemActive)
            }
            onClick={this._handleToggle.bind(this, PlaylistToggler.playlist)}
          >
            Мои подборки
          </div>
          <div
            className={
              cl(style.filterItem, position === PlaylistToggler.music && style.filterItemActive)
            }
            onClick={this._handleToggle.bind(this, PlaylistToggler.music)}
          >
            Мои песни
          </div>
        </div>
        <div className={style.container}>
          <CardList />
        </div>
      </div>
    );
  }
}

PlaylistToggler.propTypes = {
  className: PropTypes.string,
};

PlaylistToggler.playlist = 'playlist';
PlaylistToggler.music = 'music';
