import React, { Component } from 'react';
import PropTypes from 'prop-types';

import onClickOutside from 'react-onclickoutside';
import Card from '_decorators/Card';

class OutsideCard extends Component {
  handleClickOutside = (event) => {
    this.props.onClickoutside(event);
  }

  render() {
    const {
      data, isCardShown, isPlaying,
      callbacks,
    } = this.props;

    return (
      <Card
        data={data}
        callbacks={isCardShown ? callbacks : {}}
        isPlaying={isPlaying}
      />
    );
  }
}

export default onClickOutside(OutsideCard);

OutsideCard.propTypes = {
  onClickoutside: PropTypes.func,
  data: PropTypes.object,
  isCardShown: PropTypes.bool,
  isPlaying: PropTypes.bool,
  callbacks: PropTypes.object,
};
