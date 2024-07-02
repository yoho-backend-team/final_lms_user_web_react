// reducers.js

import { combineReducers } from 'redux';
import onlineClassesReducer from './onlineClassesSlice';
import offlineClassesReducer from './offlineClassesSlice';

const rootReducer = combineReducers({
  onlineClasses: onlineClassesReducer,
  offlineClasses: offlineClassesReducer,
  // Add other reducers here if needed
});

export default rootReducer;
