import {combineReducers} from 'redux';

// Reducers
import authReducer from './authReducer';
import toonReducer from './toonReducer';
import userCreationReducer from './userCreationReducer';

const rootReducers = combineReducers({
  authReducer: authReducer,
  toonReducer: toonReducer,
  userCreationReducer: userCreationReducer,
});

export default rootReducers;
