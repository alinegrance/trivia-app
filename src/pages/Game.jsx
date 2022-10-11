import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { deleteToken, getToken } from '../localStorageAPI';
import '../css/game.css';

class Game extends React.Component {
  state = {
    questions: [],
    indexQ: 0,
    answered: false,
    correctAnswer: '',
    answers: [],
  };

  async componentDidMount() {
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
  }

  creatingAnswers = () => {
    const { questions, indexQ } = this.state;
    const SORT_NUMBER = 0.5;
    const answers = [questions[indexQ].correct_answer,
      ...questions[indexQ].incorrect_answers].sort(() => Math.random() - SORT_NUMBER);
    const correctAnswer = questions[indexQ].correct_answer;
    this.setState({ answers, correctAnswer });
  };

  answerClick = () => {
    this.setState({ answered: true });
  };

  render() {
    const { questions, indexQ, answered, answers, correctAnswer } = this.state;
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
                    data-testid={ `wrong-answer-${index}` }
                  >
                    {answer}
                  </button>
                );
              }) }
            </section>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
