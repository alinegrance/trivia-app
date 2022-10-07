import { SAVE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return {
      state,
    };
  }
};

export default playerReducer;
