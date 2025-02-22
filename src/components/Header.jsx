import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    this.setState({
      url: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`,
    });
  }

  render() {
    const { url } = this.state;
    const { name } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <img src={ url } alt="player" data-testid="header-profile-picture" />
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
