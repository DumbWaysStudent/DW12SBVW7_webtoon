import {LOGGED_IN, LOGGED_OUT} from '../actions/type';
const initialState = {
  user: {},
  token: '',
  isLogin: false,
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

    default:
      return state;
  }
};
