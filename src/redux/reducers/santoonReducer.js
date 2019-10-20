import {LOADING, FETCH_TOONS} from '../actions/type';

const initialState = {
  santoons: [],
  favorites: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TOONS:
      return {
        ...state,
        santoons: payload,
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
