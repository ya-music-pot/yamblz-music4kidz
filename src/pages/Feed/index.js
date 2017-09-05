import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';

import style from './style.styl';
import CardList from './CardList';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {

  componentWillMount() {

  }

  _onButtonClick = () => {
    console.log('I click on button!');
  };

  _onCardClick = () => {
    this.props.router.push('/player');
  };

  render() {
    const { playlist, container } = style;

    const callbacks = {
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalRadio callbacks={callbacks} />
          <CardList callbacks={callbacks} />
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
}))(Feed);

Feed.propTypes = {
  router: PropTypes.object,
};
