import {combineReducers} from 'redux';

// Reducers
import auth from './auth';
import toonReducer from './toonReducer';
import userCreationReducer from './userCreationReducer';

const appReducers = combineReducers({
  auth: auth,
  toonReducer: toonReducer,
  userCreationReducer: userCreationReducer,
});

const rootReducers = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    state = undefined;
  }

  return appReducers(state, action);
};

export default rootReducers;
