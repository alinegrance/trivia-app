import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      inputEmail: '',
      buttonDisabled: true,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { inputName, inputEmail } = this.state;
      const buttonIsDisabled = inputName.length === 0 || inputEmail.length === 0;

      this.setState({
        buttonDisabled: buttonIsDisabled,
      });
    });
  };

  render() {
    const { inputName, inputEmail, buttonDisabled } = this.state;
    return (
      <main>
        <div data-testid="page-login">
          <label htmlFor="name-input">
            <form>
              <input
                data-testid="input-player-name"
                type="text"
                name="inputName"
                placeholder="digite seu e-mail"
                value={ inputName }
                onChange={ this.handleChange }
              />
            </form>
            <form>
              <input
                data-testid="input-gravatar-email"
                type="email"
                name="inputEmail"
                placeholder="digite seu nome"
                value={ inputEmail }
                onChange={ this.handleChange }
              />
            </form>
          </label>

          <button
            data-testid="btn-play"
            type="submit"
            disabled={ buttonDisabled }
            // onClick={ this.clickOnButton }
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }
}
