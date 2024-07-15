

import { createSlice } from "@reduxjs/toolkit";

const StudentActivityLogSlice = createSlice({
  name: "studentsActivityLogs",
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

export const { setActivityLogs, setLoading } = StudentActivityLogSlice.actions;
export default StudentActivityLogSlice.reducer;
