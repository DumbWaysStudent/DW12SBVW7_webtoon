import {LOGGED_IN} from './type';

export const login = data => dispatch => {  
  dispatch({
    type: LOGGED_IN,
    payload: data,
  });
};
