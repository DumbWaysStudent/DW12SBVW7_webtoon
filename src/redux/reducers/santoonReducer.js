import {LOADING, FETCH_TOONS, HANDLE_FAVORITE} from '../actions/type';

const initialState = {
  santoons: [],
  favorites: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TOONS:
      return {
        santoons: payload.santoons,
        favorites: payload.favorites,
        isLoading: false,
      };

    case HANDLE_FAVORITE:
      return {
        santoons: payload.santoons,
        favorites: payload.favorites,
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
