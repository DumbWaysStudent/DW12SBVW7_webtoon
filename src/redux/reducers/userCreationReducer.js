import {LOADING, FETCH_USER_CREATION} from '../actions/type';

const initialState = {
  myCreations: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER_CREATION:
      return {
        myCreations: payload,
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
