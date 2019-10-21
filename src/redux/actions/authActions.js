import {LOADING, LOGGED_IN, LOGGED_OUT, UPDATE_USER} from './type';
import axios from '../../helpers/axios';

export const login = data => dispatch => {
  dispatch({
    type: LOGGED_IN,
    payload: data,
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGGED_OUT,
  });
};

export const updateUser = (id, token, data) => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'PUT',
    url: `/user/${id}/profile`,
    data,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(({data}) => {
      console.log(data);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    })
    .catch(err => console.log(err.response));
};
