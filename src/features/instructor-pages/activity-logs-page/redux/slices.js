import { createSlice } from "@reduxjs/toolkit";

const ActivityLogSlice = createSlice({
  name: "instructorActivityLogs",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setActivityLogs: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setActivityLogs, setLoading } = ActivityLogSlice.actions;
export default ActivityLogSlice.reducer;
