import {
  LOADING_CREATION,
  FETCH_USER_CREATION,
  FETCH_USER_CREATION_EPISODES,
} from './type';
import axios from '../../helpers/axios';

export const findMyCreations = (userId, token) => dispatch => {
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'GET',
    url: `/user/${userId}/santoons`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_USER_CREATION,
        payload: data,
      });
    })
    .catch(err => console.log(err.response));
};

export const findMyCreationEpisodes = (userId, toonId, token) => dispatch => {
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'GET',
    url: `/user/${userId}/santoon/${toonId}/episodes`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_USER_CREATION_EPISODES,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
