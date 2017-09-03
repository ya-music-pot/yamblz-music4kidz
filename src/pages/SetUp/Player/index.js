import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPlayer from '_components/GradientPlayer';

import { saveLikesCount } from '_actions/settings';
import { playerStart } from '_actions/player';

import style from './style.styl';

class Player extends Component {
  state = {
    countChoose: 0,
    isSound: true,
  }

  componentWillMount() {
    this.props.playerStart(this.props.tracksIds[0]);
  }

  _handleLike = () => {
    this.props.saveLikesCount(this.props.likesCount + 1);
    this._handleUpdateChoose();
  }

  _handleSkip = () => {
    this._handleUpdateChoose();
  }

  _handleToggleSound = () => {
    this.setState({ isSound: !this.state.isSound });
  }

  _handleUpdateChoose() {
    const countChoose = this.state.countChoose + 1;
    if (countChoose >= 3) {
      this.props.onNextStep();
      return;
    }
    this.setState({ countChoose });
  }

  render() {
    const isSound = this.state.isSound;
    const { cover, singerName, isPlaying } = this.props.player;

    return (
      <div className={style.container}>
        <div className={style.wrapperPlayer}>
          <div className={style.player}>
            <GradientPlayer
              isPlaying={isPlaying}
              image={cover}
              onLike={this._handleLike}
              onSkip={this._handleSkip}
              onToggleSound={this._handleToggleSound}
              isSound={isSound}
            />
          </div>
          <h3 className={style.title}>{ singerName }</h3>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  playerStart: PropTypes.func,
  saveLikesCount: PropTypes.func,
  onNextStep: PropTypes.func,
  likesCount: PropTypes.number,
  tracksIds: PropTypes.array,
  player: PropTypes.shape({
    cover: PropTypes.string,
    singerName: PropTypes.string,
    isPlaying: PropTypes.bool,
  }),
};

export default connect((state, props) => ({
  likesCount: state.settings.likesCount,
  listEmoji: state.dictionaries.listEmoji,
  tracksIds: state.settings.tracksIds,
  player: state.player,
  ...props,
}), { saveLikesCount, playerStart })(Player);
