import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import { getUser, getAllTracks, getAllPlaylists } from '_actions/user';
import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';

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

  componentDidMount() {
    document.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    const scrollTop = document.body.scrollTop;
    const { stickyHeader, stickyFilter } = this.state;

    if (scrollTop > 0 && !stickyHeader) {
      this.setState({
        stickyHeader: true,
      });
    } else if (scrollTop === 0 && stickyHeader) {
      this.setState({
        stickyHeader: false,
      });
    }

    if (scrollTop > 255 && !stickyFilter) {
      this.setState({
        stickyFilter: true,
      });
    } else if (scrollTop <= 255 && stickyFilter) {
      this.setState({
        stickyFilter: false,
      });
    }
  }

  _handleToggle = (id) => {
    this.setState({
      acviveTab: id,
    });
  }

  _handleBack = () => {
    this.props.router.goBack();
  }

  _handleSearch = () => {
    this.props.router.push('/feed');
  }

  _onButtonClick = (params) => {
    const { trackId, playlist, isRadio, playlistId, isPlaying } = params;
    if (isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerModeUpdate('mini');
      this.props.showPlayer(playlist, isRadio);
      this.props.setPlaylist(playlist, isRadio, playlistId);
      this.props.playerPlay(trackId);
    }
  }

  _onCardClick = (params) => {
    const { trackId, playlist, isRadio, playlistId } = params;
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio, playlistId);
    this.props.playerPlay(trackId);
  }

  render() {
    const { achievements, user } = this.props;

    const { tracks, playlists } = user;
    const { firstName, lastName, avatarUrl } = user.data;

    const { order, data } = achievements;
    const { acviveTab, stickyHeader, stickyFilter } = this.state;
    const cardListData = acviveTab === 'playlists' ? playlists : tracks;

    const callbacks = {
      onRouterPush: this.props.router.push,
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={cl(style.container, stickyFilter && style.containerSticky)}>
        <Header
          avatar={avatarUrl}
          userName={`${firstName} ${lastName}`}
          order={order}
          data={data}
          onBackClick={this._handleBack}
          sticky={stickyHeader}
        />
        <div className={cl(style.filter, stickyFilter && style.filterSticky)}>
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
              callbacks={callbacks}
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
  feed: state.feed,
  ...props,
}), {
  getUser,
  getAllTracks,
  getAllPlaylists,
  playerPlay,
  setPlaylist,
  showPlayer,
  playerModeUpdate,
  playerPause,
})(Personal);

Personal.propTypes = {
  achievements: PropTypes.object,
  getUser: PropTypes.func,
  getAllTracks: PropTypes.func,
  getAllPlaylists: PropTypes.func,
  playerPlay: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  router: PropTypes.object,
  user: PropTypes.object,
};
