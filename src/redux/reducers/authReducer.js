import {LOGGED_IN} from '../actions/type';
const initialState = {
  user: {},
  token: '',
  isLogin: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        isLogin: true,
        user: payload.dataUser,
        token: payload.token,
      };

    default:
      return state;
  }
};
