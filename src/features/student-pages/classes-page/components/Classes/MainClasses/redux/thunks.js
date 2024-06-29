// thunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUpcomingOnlineClasses,
  setCompletedOnlineClasses,
  setOnlineClassHistory,
  setLiveOnlineClasses,
  setUpcomingOfflineClasses,
  setCompletedOfflineClasses,
  setOfflineClassHistory,
  setLiveOfflineClasses,
} from './slices';

export const fetchUpcomingOnlineClasses = createAsyncThunk(
  'onlineClasses/fetchUpcoming',
  async (_, thunkAPI) => {
    const response = await fetch('/api/online/upcoming');
    const data = await response.json();
    thunkAPI.dispatch(setUpcomingOnlineClasses(data));
    return data;
  }
);

export const fetchCompletedOnlineClasses = createAsyncThunk(
  'onlineClasses/fetchCompleted',
  async (_, thunkAPI) => {
    const response = await fetch('/api/online/completed');
    const data = await response.json();
    thunkAPI.dispatch(setCompletedOnlineClasses(data));
    return data;
  }
);

export const fetchOnlineClassHistory = createAsyncThunk(
  'onlineClasses/fetchHistory',
  async (_, thunkAPI) => {
    const response = await fetch('/api/online/history');
    const data = await response.json();
    thunkAPI.dispatch(setOnlineClassHistory(data));
    return data;
  }
);

export const fetchLiveOnlineClasses = createAsyncThunk(
  'onlineClasses/fetchLive',
  async (_, thunkAPI) => {
    const response = await fetch('/api/online/live');
    const data = await response.json();
    thunkAPI.dispatch(setLiveOnlineClasses(data));
    return data;
  }
);

export const fetchUpcomingOfflineClasses = createAsyncThunk(
  'offlineClasses/fetchUpcoming',
  async (_, thunkAPI) => {
    const response = await fetch('/api/offline/upcoming');
    const data = await response.json();
    thunkAPI.dispatch(setUpcomingOfflineClasses(data));
    return data;
  }
);

export const fetchCompletedOfflineClasses = createAsyncThunk(
  'offlineClasses/fetchCompleted',
  async (_, thunkAPI) => {
    const response = await fetch('/api/offline/completed');
    const data = await response.json();
    thunkAPI.dispatch(setCompletedOfflineClasses(data));
    return data;
  }
);

export const fetchOfflineClassHistory = createAsyncThunk(
  'offlineClasses/fetchHistory',
  async (_, thunkAPI) => {
    const response = await fetch('/api/offline/history');
    const data = await response.json();
    thunkAPI.dispatch(setOfflineClassHistory(data));
    return data;
  }
);

export const fetchLiveOfflineClasses = createAsyncThunk(
  'offlineClasses/fetchLive',
  async (_, thunkAPI) => {
    const response = await fetch('/api/offline/live');
    const data = await response.json();
    thunkAPI.dispatch(setLiveOfflineClasses(data));
    return data;
  }
);
