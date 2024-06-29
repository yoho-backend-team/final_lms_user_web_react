import { createSlice } from '@reduxjs/toolkit';
import { fetchClasses, fetchCourses, fetchMonths, fetchYears } from './thunks';

const initialState = {
  classes: [],
  courses: [],
  months: [],
  years: [],
  completedClasses: [],
  liveClasses: [],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.classes = [];
      state.courses = [];
      state.months = [];
      state.years = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonths.fulfilled, (state, action) => {
        state.loading = false;
        state.months = action.payload;
      })
      .addCase(fetchMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFilters } = classSlice.actions;
export default classSlice.reducer;
