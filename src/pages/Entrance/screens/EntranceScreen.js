import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerStart } from '_actions/player';

import Hammer from 'hammerjs';
import cl from 'classname';
import Button from '_components/Button';
import CartoonCard from '_components/cards/CartoonCard';

import style from '../style.styl';
import entranceCloud from '../images/entrance-cloud.png';
import entranceCloud2x from '../images/entrance-cloud@2x.png';
import entranceCloud3x from '../images/entrance-cloud@3x.png';

class EntranceScreen extends Component {
  state = {
    isCardShown: false,
  }

  componentWillUnmount() {
    this.mc.destroy();
  }

  /**
   * _initializeCardActions — Функция инициаллизирует обработчик жестов
   * @param  {Node} el
   */
  _initializeCardActions = (el) => {
    if (!el) return;
    this.card = el;
    this.isPanning = false;

    this.windowHeight = window.innerHeight;
    this.cardHeight = this.card.offsetHeight;

    this.upperPosition = (this.windowHeight - this.cardHeight) / 2;
    this.bottomPosition = this.windowHeight - 66;
    this.threshhold = this.windowHeight / 2;

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
    if (!this.isPanning) {
      this.isPanning = true;
      this.lastCardY = this.card.offsetTop;
    }

    const newCardY = event.deltaY + this.lastCardY;
    this.card.style.top = `${newCardY}px`;

    if (newCardY <= this.threshhold) {
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

    if (event.isFinal) {
      this.isPanning = false;
    }
  };

  render() {
    const { data, onButtonClick } = this.props;
    const { isCardShown } = this.state;

    return (
      <div className={style.container}>
        <div className={isCardShown ? style['background--opacity20'] : style['background--opacity100']}>
          <div className={style.imageContainer}>
            <img
              alt="flying-cloud"
              src={entranceCloud}
              srcSet={`${entranceCloud} 1x, ${entranceCloud2x} 2x, ${entranceCloud3x} 3x`}
            />
          </div>
          <Title />
          <div className={style.buttonWrapper}>
            <Button
              style={style.button}
              onClick={this.props.onNavigate}
            >
              Поехали
            </Button>
          </div>
        </div>
        <div
          className={cl(style.cardContainer, this.state.isCardShown && style.cardShown)}
          ref={this._initializeCardActions}
        >
          <CartoonCard
            data={data}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    );
  }
}

EntranceScreen.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  data: PropTypes.object,
  onButtonClick: PropTypes.func,

};

export default connect((state, props) => ({
  settings: state.settings,
  ...props,
}), { playerStart })(EntranceScreen);

const Title = () => (
  <div className={style.titleWrapper}>
    <div className={style.title}>
      Привет!
    </div>
    <div className={style.subTitle}>
        Давай слушать музыку и веселиться?
    </div>
  </div>
);
