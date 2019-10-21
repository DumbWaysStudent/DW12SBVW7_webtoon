import {
  LOADING,
  FETCH_USER_CREATION,
  FETCH_USER_CREATION_EPISODES,
} from '../actions/type';

const initialState = {
  myCreations: [],
  myCreationEpisodes: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER_CREATION:
      return {
        ...state,
        myCreations: payload,
        isLoading: false,
      };

    case FETCH_USER_CREATION_EPISODES:
      return {
        ...state,
        myCreationEpisodes: payload,
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
