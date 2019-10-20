import {LOADING, FETCH_TOONS} from './type';
import axios from '../../helpers/axios';

export const findAllToons = () => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'GET',
    url: '/santoons',
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_TOONS,
        payload: data,
      });
    })
    .catch(err => console.log(err));
};
