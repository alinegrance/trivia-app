import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Gameplay screen', () => {
  jest.setTimeout(6000);
  it('shows all desired elements', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/game');
  
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const playerProfilePicture = screen.getByTestId('header-profile-picture');
    expect(playerProfilePicture).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();

    const questionCategory = await waitFor(() =>
      screen.getByTestId('question-category')
    );
    expect(questionCategory).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/play');
  });

  it('shows the right behaviours', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/game');

    const buttonCorrectAnswer = await waitFor(() =>
      screen.getByTestId('correct-answer')
    );
    expect(buttonCorrectAnswer).toBeInTheDocument();
    userEvent.click(buttonCorrectAnswer);

    const buttonNextQuestion = await waitFor(() =>
      screen.getByTestId('btn-next')
    );
    expect(buttonNextQuestion).toBeInTheDocument();
    expect(buttonNextQuestion).toBeEnabled();
    userEvent.click(buttonNextQuestion);

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });
})