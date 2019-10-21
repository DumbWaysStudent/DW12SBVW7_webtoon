import {combineReducers} from 'redux';

// Reducers
import authReducer from './authReducer';
import toonReducer from './toonReducer';
import userCreationReducer from './userCreationReducer';

const appReducers = combineReducers({
  authReducer: authReducer,
  toonReducer: toonReducer,
  userCreationReducer: userCreationReducer,
});

const rootReducers = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    state = undefined
  }

  return appReducers(state, action)
}

export default rootReducers;
