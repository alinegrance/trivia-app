import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { deleteToken, getToken } from '../localStorageAPI';
import '../css/game.css';
import { saveAssertions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    indexQ: 0,
    answered: false,
    correctAnswer: '',
    answers: [],
    disabled: false,
    timer: 30,
    assertions: 0,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
    this.gettingData();
  }

  shouldComponentUpdate() {
    const { timer } = this.state;
    return timer >= 1;
  }

  componentDidUpdate() {
    const { timer, disabled } = this.state;
    if (timer === 1 && !disabled) { this.setState({ disabled: true }); }
  }

  gettingData = async () => {
    const { history } = this.props;
    const expiredToken = 3;
    const token = getToken();
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { response_code: responseCode, results } = await data.json();
    console.log(results);
    if (responseCode === expiredToken) {
      deleteToken();
      history.push('/');
    }
    this.setState({ questions: [...results] }, () => this.creatingAnswers());
  };

  creatingAnswers = () => {
    const { questions, indexQ } = this.state;
    const SORT_NUMBER = 0.5;
    const answers = [questions[indexQ].correct_answer,
      ...questions[indexQ].incorrect_answers].sort(() => Math.random() - SORT_NUMBER);
    const correctAnswer = questions[indexQ].correct_answer;
    this.setState({ answers, correctAnswer });
  };

  answerClick = ({ target: { name } }) => {
    const { dispatch } = this.props;
    if (name === 'correct') {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }), () => {
        const { assertions } = this.state;
        dispatch(saveAssertions(assertions));
      });
    }
    this.setState({ answered: true });
  };

  render() {
    const { questions, indexQ, answered, answers, correctAnswer, disabled,
      timer } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <div>
            <section>
              <h3 data-testid="question-category">{ questions[indexQ].category }</h3>
              <h5 data-testid="question-text">{ questions[indexQ].question }</h5>
            </section>
            <section data-testid="answer-options">
              { answers.map((answer, index) => {
                if (answer === correctAnswer) {
                  return (
                    <button
                      key={ 5 }
                      onClick={ this.answerClick }
                      type="button"
                      className={ answered ? 'correct' : '' }
                      data-testid="correct-answer"
                      disabled={ disabled }
                      name="correct"
                    >
                      {answer}
                    </button>
                  );
                }
                return (
                  <button
                    key={ index }
                    className={ answered ? 'wrong' : '' }
                    type="button"
                    onClick={ this.answerClick }
                    disabled={ disabled }
                    data-testid={ `wrong-answer-${index}` }
                    name="wrong"
                  >
                    {answer}
                  </button>
                );
              }) }
            </section>
            <section><h4>{timer}</h4></section>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
