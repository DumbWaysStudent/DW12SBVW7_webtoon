import {LOADING, LOGGED_IN, LOGGED_OUT, UPDATE_USER} from '../actions/type';
const initialState = {
  user: {},
  token: '',
  isLogin: false,
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGGED_IN:
      return {
        user: payload.dataUser,
        token: payload.token,
        isLogin: true,
      };

    case LOGGED_OUT:
      return {
        user: {},
        token: '',
        isLogin: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };

    case LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};