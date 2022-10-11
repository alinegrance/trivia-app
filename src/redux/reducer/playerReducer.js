import { SAVE_PLAYER, SAVE_ASSERTIONS } from '../actions';

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
  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
