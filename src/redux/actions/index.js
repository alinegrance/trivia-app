export const SAVE_PLAYER = 'SAVE_PLAYER';

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const RIGHT_ANSWERED = 'RIGHT_ANSWERED';

export const rightAnswered = (payload) => ({
  type: RIGHT_ANSWERED,
  payload,
});
