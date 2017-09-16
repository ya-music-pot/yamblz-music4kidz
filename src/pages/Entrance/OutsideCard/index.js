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
      data, isPlaying,
      callbacks,
    } = this.props;

    return (
      <Card
        data={data}
        callbacks={callbacks}
        isPlaying={isPlaying}
      />
    );
  }
}

export default onClickOutside(OutsideCard);

OutsideCard.propTypes = {
  onClickoutside: PropTypes.func,
  data: PropTypes.object,
  isPlaying: PropTypes.bool,
  callbacks: PropTypes.object,
};
