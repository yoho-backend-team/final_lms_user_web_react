import { configureStore } from '@reduxjs/toolkit';
import classReducer from './reducers';

const store = configureStore({
  reducer: {
    class: classReducer,
  },
});

export default store;
