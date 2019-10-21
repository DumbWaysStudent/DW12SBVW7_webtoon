import {LOADING, FETCH_USER_CREATION} from './type';
import axios from '../../helpers/axios';

export const findMyCreation = (id, token) => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'GET',
    url: `/user/${id}/santoons`,
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
