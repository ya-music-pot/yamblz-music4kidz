import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';

import style from '../style.scss';
import entranceCloud from '../images/entrance-cloud.png';
import entranceCloud2x from '../images/entrance-cloud@2x.png';
import entranceCloud3x from '../images/entrance-cloud@3x.png';

export default class EntranceScreen extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            alt="flying-cloud"
            src={entranceCloud}
            srcSet={`${entranceCloud} 1x, ${entranceCloud2x} 2x, ${entranceCloud3x} 3x`}
          />
        </div>
        <div className={style.textContainer}>
          <Title />
          <Button
            style={style.button}
            onClick={this.props.onNavigate}
          >
            Поехали
          </Button>
        </div>
      </div>
    );
  }
}

EntranceScreen.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

const Title = () => (
  <div>
    <div className={style.title}>
        Привет!
    </div>
    <div className={style.subTitle}>
        Давай слушать музыку и веселиться?
    </div>
  </div>
);
