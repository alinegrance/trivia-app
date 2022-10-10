import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveToken } from '../localStorageAPI';
import { savePlayer } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      inputEmail: '',
      buttonDisabled: true,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, inputEmail } = this.state;
      const buttonIsDisabled = name.length === 0 || inputEmail.length === 0;

      this.setState({
        buttonDisabled: buttonIsDisabled,
      });
    });
  };

  clickOnButton = async () => {
    const { history, dispatch } = this.props;
    const { inputEmail, name } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    saveToken(token);
    console.log(token);
    history.push('/game');
    dispatch(savePlayer({ gravatarEmail: inputEmail, name }));
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, inputEmail, buttonDisabled } = this.state;
    return (
      <main>
        <div data-testid="page-login">
          <label htmlFor="name-input">
            <form>
              <input
                data-testid="input-player-name"
                type="text"
                name="name"
                placeholder="digite seu nome"
                value={ name }
                onChange={ this.handleChange }
              />
            </form>
            <form>
              <input
                data-testid="input-gravatar-email"
                type="email"
                name="inputEmail"
                placeholder="digite seu e-mail"
                value={ inputEmail }
                onChange={ this.handleChange }
              />
            </form>
          </label>

          <button
            data-testid="btn-play"
            type="submit"
            disabled={ buttonDisabled }
            onClick={ this.clickOnButton }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.goToSettings }
          >
            Settings
          </button>
        </div>
      </main>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
