// Define action types
export const SET_LOGIN = 'SET_LOGIN';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';

// Define action creators
export const setLogin = (login: string) => ({
  type: SET_LOGIN,
  payload: login,
});

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});
