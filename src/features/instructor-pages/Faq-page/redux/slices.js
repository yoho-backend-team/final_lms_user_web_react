import { createSlice } from "@reduxjs/toolkit";

export const InstructorFaqSlice = createSlice({
  name: "Instructorfaq",
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

export const { setHelps, setLoading } = InstructorFaqSlice.actions;
export default InstructorFaqSlice.reducer;
