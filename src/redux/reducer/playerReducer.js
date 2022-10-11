import { SAVE_PLAYER, RIGHT_ANSWERED } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case RIGHT_ANSWERED:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
