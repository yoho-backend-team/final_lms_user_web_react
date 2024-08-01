import { createSlice } from "@reduxjs/toolkit";

export const StudentHelpSlice = createSlice({
  name: "studenthelp",
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

export const { setHelps, setLoading } = StudentHelpSlice.actions;
export default StudentHelpSlice.reducer;
