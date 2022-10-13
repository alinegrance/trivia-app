import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';

const storage = JSON.stringify([
    {name: "1º Pessoa", score: 156, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},
    {name: "2º Pessoa", score: 259, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},
    {name: "3º Pessoa", score: 200, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},
    {name: "4º Pessoa", score: 200, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}
  ]);

describe('Testando a tela de Login', () => {
    it('testa se tem o botao e a URL', async () => {
        const { history } = renderWithRouterAndRedux(<App />, '/ranking');
        
        const homeButton = await screen.getByRole('button', {name: /home/i});
        expect(homeButton).toBeInTheDocument()
        userEvent.click(homeButton)
        const { pathname } = history.location;
        expect(pathname).toBe('/')

    })

    it('Testa se é renderizado mais de um player quando se é jogado o game duas vezes',async () => {
        Object.defineProperty(global, 'localStorage', {
          value: {
            getItem: () =>  storage
          },
        })
        const { history } = renderWithRouterAndRedux(<App />, '/ranking');
        const nome1 = screen.getByTestId('player-name-0')
        expect(nome1).toBeInTheDocument()
        const nome2 = screen.getByTestId('player-name-1')
        expect(nome2).toBeInTheDocument()
        const score1 = screen.getByTestId('player-score-0')
        expect(score1).toBeInTheDocument()
        const score2 = screen.getByTestId('player-score-1')
        expect(score2).toBeInTheDocument()
        const score3 = screen.getByTestId('player-score-2')
        expect(score3).toBeInTheDocument()
        const score4 = screen.getByTestId('player-score-3')
        expect(score4).toBeInTheDocument()
      })
})