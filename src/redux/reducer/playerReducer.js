import { SAVE_PLAYER, RIGHT_ANSWERED, PLAY_AGAIN } from '../actions';

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
  case PLAY_AGAIN:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
