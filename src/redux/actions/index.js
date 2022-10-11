export const SAVE_PLAYER = 'SAVE_PLAYER';

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERTIONS,
  payload,
});
