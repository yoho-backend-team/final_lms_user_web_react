import { createSlice } from "@reduxjs/toolkit";

export const StudentFaqSlice = createSlice({
  name: "studentfaq",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setHelps: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setHelps, setLoading } = StudentFaqSlice.actions;
export default StudentFaqSlice.reducer;
