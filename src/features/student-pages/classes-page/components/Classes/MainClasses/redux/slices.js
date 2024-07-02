// slices.js

import { createSlice } from '@reduxjs/toolkit';

const onlineClassesSlice = createSlice({
  name: 'onlineClasses',
  initialState: {
    upcoming: [],
    completed: [],
    history: [],
    live: [],
  },
  reducers: {
    setUpcomingOnlineClasses(state, action) {
      state.upcoming = action.payload;
    },
    setCompletedOnlineClasses(state, action) {
      state.completed = action.payload;
    },
    setOnlineClassHistory(state, action) {
      state.history = action.payload;
    },
    setLiveOnlineClasses(state, action) {
      state.live = action.payload;
    },
  },
});

const offlineClassesSlice = createSlice({
  name: 'offlineClasses',
  initialState: {
    upcoming: [],
    completed: [],
    history: [],
    live: [],
  },
  reducers: {
    setUpcomingOfflineClasses(state, action) {
      state.upcoming = action.payload;
    },
    setCompletedOfflineClasses(state, action) {
      state.completed = action.payload;
    },
    setOfflineClassHistory(state, action) {
      state.history = action.payload;
    },
    setLiveOfflineClasses(state, action) {
      state.live = action.payload;
    },
  },
});

export const {
  setUpcomingOnlineClasses,
  setCompletedOnlineClasses,
  setOnlineClassHistory,
  setLiveOnlineClasses,
} = onlineClassesSlice.actions;

export const {
  setUpcomingOfflineClasses,
  setCompletedOfflineClasses,
  setOfflineClassHistory,
  setLiveOfflineClasses,
} = offlineClassesSlice.actions;

export const onlineClassesReducer = onlineClassesSlice.reducer;
export const offlineClassesReducer = offlineClassesSlice.reducer;
