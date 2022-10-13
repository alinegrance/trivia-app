import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { playAgain } from '../redux/actions';

const BAD_MSG = 'Could be better...';
const GOOD_MSG = 'Well Done!';
const MIN_SCORE = 3;

class Feedback extends React.Component {
  state = {
    imagem: '',
  };

  componentDidMount() {
    const { email, score, name } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const rank = {
      name,
      score,
      picture,
    };
    const oldRank = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...oldRank, rank]));
    this.setState({ imagem: picture });
  }

  playAgainBt = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  rankBtn = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score, name } = this.props;
    const { imagem } = this.state;
    return (
      <div>
        <h1> Feedback</h1>
        <header>
          <section>
            <img alt="perfil" src={ imagem } data-testid="header-profile-picture" />
            <h6 data-testid="header-player-name">{name}</h6>
            <h6 data-testid="header-score">{score}</h6>
          </section>
        </header>
        <section>
          <h3>
            {'Final score: '}
            <span data-testid="feedback-total-score">{score}</span>
          </h3>
          <h3>
            {'Number of assertions: '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h3>
          {
            assertions >= MIN_SCORE
              ? <p data-testid="feedback-text">{GOOD_MSG}</p>
              : <p data-testid="feedback-text">{BAD_MSG}</p>
          }
        </section>
        <section>
          <button type="button" data-testid="btn-play-again" onClick={ this.playAgainBt }>
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.rankBtn }
          >
            Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
