import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';
import cl from 'classname';

import Button from '_components/Button';
import Icon from '_components/Icon';

import { removePlayerPage } from '_helpers/player';

import Card from '_decorators/Card';
import entrance from '_decorators/Entrance';

import style from './style.styl';

class EntranceScreen extends Component {
  state = {
    isCardShown: false,
  }

  componentWillMount() {
    removePlayerPage();
    if (this.props.userId) {
      this.props.router.push('/feed');
    }
  }

  componentDidMount() {
    this._initializeCardActions();
  }

  componentWillUnmount() {
    removePlayerPage();
    this.mc.destroy();
  }

  _updateThreshholds = () => {
    this.windowHeight = window.innerHeight;
    this.cardHeight = this.card.offsetHeight;

    this.upperPosition = (this.windowHeight - this.cardHeight) / 2;
    this.bottomPosition = this.windowHeight * 0.9; // Карточка торчит на 10% высоты экрана
    this.threshhold = this.windowHeight / 2;
  };

  /**
   * _initializeCardActions — Функция инициаллизирует обработчик жестов
   */
  _initializeCardActions = () => {
    this.isPanning = null;
    this._updateThreshholds();
    this.posTimeout = null;

    this.mc = new Hammer(this.card);
    this.mc.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 0,
    }));

    this.mc.on('pan', this._handlePan);
  }

  /**
   * _handlePan — Функция-обработчик для жестов показа и скрытия карточки
   * @param  {Object} event
   */
  _handlePan = (event) => {
    if (this.isPanning == null) {
      this._updateThreshholds();

      this.card.style.top = `${this.bottomPosition}px`;
      this.card.style.position = 'absolute';
    }

    if (!this.isPanning) {
      this.isPanning = true;
      this.lastCardY = this.card.offsetTop;
    }

    const newCardY = event.deltaY + this.lastCardY;

    if (newCardY <= this.threshhold) {
      if (this.state.isCardShown) {
        return;
      }

      if (this.posTimeout) {
        clearTimeout(this.posTimeout);
      }

      this.posTimeout = setTimeout(() => {
        this.card.style.top = `${this.upperPosition}px`;
        this.setState({
          isCardShown: true,
        });
      }, 300);
    }

    if (newCardY > this.threshhold) {
      if (this.posTimeout) {
        clearTimeout(this.posTimeout);
      }

      this.posTimeout = setTimeout(() => {
        this.card.style.top = `${this.bottomPosition}px`;
        this.setState({
          isCardShown: false,
        });
      }, 300);
    }

    this.card.style.top = `${newCardY}px`;

    if (event.isFinal) {
      this.isPanning = false;
    }
  };

  render() {
    const {
      data, callbacks, playlistId,
      shouldPlay,
    } = this.props;

    const { isCardShown } = this.state;

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
          <Title />
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
        >
          <Card
            data={data}
            callbacks={isCardShown ? callbacks : {}}
            isPlaying={isPlaying}
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
  userId: PropTypes.number,
  router: PropTypes.object,
  shouldPlay: PropTypes.bool,
};

export default connect((state, props) => ({
  ...props,
  userId: state.user.data.id,
  data: state.promo.data,
  settings: state.settings,
  playlistId: state.player.playlistId,
  shouldPlay: state.player.shouldPlay,
}))(entrance(EntranceScreen));

const Title = () => (
  <div className={style.titleWrapper}>
    <div className={style.title}>
      Привет!
    </div>
    <div className={style.subTitle}>
      Будем слушать музыку и веселиться?
    </div>
  </div>
);
