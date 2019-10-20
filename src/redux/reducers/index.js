import {combineReducers} from 'redux';

// Reducers
import santoonReducer from './santoonReducer';
import authReducer from './authReducer';

const rootReducers = combineReducers({
  authReducer: authReducer,
  santoonReducer: santoonReducer,
});

export default rootReducers;
