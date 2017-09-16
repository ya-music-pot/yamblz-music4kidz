import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hammer from 'hammerjs';
import cl from 'classname';
import Button from '_components/Button';
import Icon from '_components/Icon';
import OutsideCard from '../OutsideCard';

import style from './style.styl';

class EntranceScreen extends Component {
  state = {
    isCardShown: false,
  }

  componentWillMount() {
    this.windowHeight = window.innerHeight;
    this.bottomPosition = this.windowHeight * 0.9;

    this.setState({
      translate: this.bottomPosition,
    });
  }

  componentDidMount() {
    this._initializeCardActions();

    this.cardHeight = this.card.offsetHeight;
    this.upperPosition = (this.windowHeight - this.cardHeight) / 2;
  }

  componentWillUnmount() {
    this.mc.destroy();
  }

  /**
   * _initializeCardActions — Функция инициаллизирует обработчик жестов
   */
  _initializeCardActions = () => {
    this.mc = new Hammer(this.card);
    this.mc.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 5,
    }));

    this.mc.on('panup', () => {
      this.setState({
        isCardShown: true,
        translate: this.upperPosition,
      });
    });

    this.mc.on('pandown', () => {
      this.setState({
        isCardShown: false,
        translate: this.bottomPosition,
      });
    });
  }

  _handleClickoutside = () => {
    this.setState({
      isCardShown: false,
      translate: this.bottomPosition,
    });
  }

  render() {
    const {
      data, callbacks, playlistId,
      shouldPlay,
    } = this.props;

    const { isCardShown, translate } = this.state;

    const cardStyle = {
      transform: `translateY(${translate}px)`,
      WebkitTransform: `translateY(${translate}px)`,
    };

    let isPlaying = false;
    if (data.id === playlistId && shouldPlay) {
      isPlaying = true;
    }

    return (
      <div>
        <div
          className={
            cl(style.background, isCardShown ?
              style.backgroundOpacity20 : style.backgroundOpacity100)
          }
          ref={(el) => {
            this.content = el;
          }}
        >
          <div className={style.imageContainer} />

          <div className={style.titleWrapper}>
            <div className={style.title}>
              Привет!
            </div>
            <div className={style.subTitle}>
              Будем слушать музыку и веселиться?
            </div>
          </div>

          <div className={style.buttonWrapper}>
            <Button
              style={style.button}
              onClick={this.props.onNavigate}
            >
              Войти
            </Button>
            <Button
              style={style.buttonSmall}
              onClick={this.props.onDeny}
            >
              Продолжить без входа
              <Icon typeIcon="entrance-emoji-stop" />
            </Button>
          </div>
        </div>
        <div
          className={cl(style.cardContainer, isCardShown && style.cardShown)}
          ref={(el) => {
            this.card = el;
          }}
          style={cardStyle}
        >
          <OutsideCard
            data={data}
            callbacks={isCardShown ? callbacks : {}}
            isPlaying={isPlaying}
            onClickoutside={this._handleClickoutside}
          />
        </div>
      </div>
    );
  }
}

EntranceScreen.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onDeny: PropTypes.func,
  data: PropTypes.object,
  callbacks: PropTypes.object,
  playlistId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  shouldPlay: PropTypes.bool,
};

export default connect((state, props) => ({
  ...props,
  settings: state.settings,
  playlistId: state.player.playlistId,
  shouldPlay: state.player.shouldPlay,
}))(EntranceScreen);

