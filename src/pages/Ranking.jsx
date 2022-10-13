import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { playAgain } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('ranking')) || [];
    console.log(users);
    if (users.length > 0) {
      users.sort(this.sortFunction);
      this.setState({ users });
    }
  }

  sortFunction = (a, b) => {
    const mONE = -1;
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return mONE;
    }
    return 0;
  };

  homeBtn = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homeBtn }
        >
          Home
        </button>
        {
          users.length === 0 ? (null) : (
            users.map((user, index) => (
              <section key={ index }>
                <img alt="imagemUser" src={ user.picture } />
                <p data-testid={ `player-name-${index}` }>{user.name}</p>
                <p data-testid={ `player-score-${index}` }>{user.score}</p>
              </section>
            ))

          )
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
