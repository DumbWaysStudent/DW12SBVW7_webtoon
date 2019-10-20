import {LOADING, FETCH_TOONS, HANDLE_FAVORITE} from './type';
import axios from '../../helpers/axios';

export const findAllToons = token => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'GET',
    url: '/santoons',
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      const favorites = data.filter(item => item.isFavorite);
      dispatch({
        type: FETCH_TOONS,
        payload: {
          santoons: data,
          favorites,
        },
      });
    })
    .catch(err => console.log(err));
};

export const handleFavorite = (id, request, token) => dispatch => {
  axios({
    method: request,
    url: `/user/${id}/favorite`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      console.log(data);
      const favorites = data.filter(item => item.isFavorite);
      dispatch({
        type: HANDLE_FAVORITE,
        payload: {
          santoons: data,
          favorites,
        },
      });
    })
    .catch(err => console.log(err));
};
