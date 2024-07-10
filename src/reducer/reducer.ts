import { SET_LOGIN, CLEAR_LOGIN } from '../action/action';

interface AuthState {
  login: string | null;
}

const initialState: AuthState = {
  login: null,
};

const authReducer = (state = initialState, action: { type: string; payload?: any }): AuthState => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        login: null,
      };
    default:
      return state;
  }
};

export default authReducer;
