import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import { getUser, getAllTracks, getAllPlaylists } from '_actions/user';

import CardList from '_components/CardList';
import Button from '_components/Button';
import Header from './Header';
import style from './style.styl';

class Personal extends Component {
  state = {
    acviveTab: 'playlists',
  }

  componentWillMount() {
    const { user } = this.props;
    const { id } = user.data;

    this.props.getUser(id);
    this.props.getAllTracks(id);
    this.props.getAllPlaylists(id);
  }

  _handleToggle = (id) => {
    this.setState({
      acviveTab: id,
    });
  }

  _handleBack = () => {

  }

  _handleSearch = () => {
    this.props.router.push('/feed');
  }

  render() {
    const { achievements, user } = this.props;

    const { tracks, playlists } = user;
    const { firstName, lastName, avatarUrl } = user.data;

    const { order, data } = achievements;
    const { acviveTab } = this.state;
    const cardListData = acviveTab === 'playlists' ? playlists : tracks;

    return (
      <div className={style.container}>
        <Header
          avatar={avatarUrl}
          userName={`${firstName} ${lastName}`}
          order={order}
          data={data}
          onBackClick={this._handleBack}
        />
        <div className={style.filter}>
          <div
            className={cl(style.filterItem, acviveTab === 'playlists' && style.active)}
            onClick={this._handleToggle.bind(this, 'playlists')}
          >
            Мои подборки
          </div>
          <div
            className={cl(style.filterItem, acviveTab === 'tracks' && style.active)}
            onClick={this._handleToggle.bind(this, 'tracks')}
          >
            Мои песни
          </div>
        </div>
        {
          cardListData.length > 0 &&
          <div className={style.cardList}>
            <CardList
              data={cardListData}
            />
          </div>
        }
        {
          cardListData.length === 0 &&
          <div className={style.emptyContainer}>
            <div className={style.emptyText}>
              Здесь будут твои любимые и сохранённые подборки
              <br />
              Нажми нa <span className={style.heart} />, чтобы сохранить
            </div>
            <Button
              onClick={this._handleSearch}
              style={style.searchButton}
            >
              Смотреть
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default connect((state, props) => ({
  user: state.user,
  achievements: state.dictionaries.achievements,
  ...props,
}), {
  getUser,
  getAllTracks,
  getAllPlaylists,
})(Personal);

Personal.propTypes = {
  user: PropTypes.object,
  achievements: PropTypes.object,
  getUser: PropTypes.func,
  getAllTracks: PropTypes.func,
  getAllPlaylists: PropTypes.func,
  router: PropTypes.object,
};
