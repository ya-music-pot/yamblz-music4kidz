import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style.scss';
import entranceCloud from './images/entrance-cloud.png';
import entranceCloud2x from './images/entrance-cloud@2x.png';
import entranceCloud3x from './images/entrance-cloud@3x.png';

class Entrance extends Component {
  _handleClick = () => {
    this.props.history.push('/setup');
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src={entranceCloud}
            srcSet={`${entranceCloud} 1x, ${entranceCloud2x} 2x, ${entranceCloud3x} 3x`}
          />
        </div>
        <div className={style.textContainer}>
          <div className={style.title}>
            Привет!
          </div>
          <div className={style.subTitle}>
            Давай слушать музыку и веселиться?
          </div>
        </div>
        <div onClick={this._handleClick}>Кнопка</div>
        <div className={style.cardContainer}>
          Карточка
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Entrance);
