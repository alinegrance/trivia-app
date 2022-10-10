import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { deleteToken, getToken } from '../localStorageAPI';

class Game extends React.Component {
  state = {
    questions: [],
    indexQ: 0,
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
    this.setState({ questions: [...results] });
  }

  render() {
    const { questions, indexQ } = this.state;
    const sortNumber = 0.5;
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
              {
                // [...questions[indexQ].incorrect_answers,
                //   questions[indexQ].correct_answer]
                //   .sort(() => Math.random() - sortNumber)
                //   .map((element, index) => (
                //     <button type="button" key={ index }>{ element }</button>
                //   ))
                [
                  <button
                    type="button"
                    key={ 5 }
                    data-testid="correct-answer"
                  >
                    { questions[indexQ].correct_answer }
                  </button>,
                  ...questions[indexQ].incorrect_answers.map((element, index) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      { element }
                    </button>
                  )),
                ].sort(() => Math.random() - sortNumber)
              }
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
