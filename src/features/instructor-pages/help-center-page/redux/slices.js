import { createSlice } from "@reduxjs/toolkit";

export const HelpSlice = createSlice({
  name: "instructorHelp",
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

export const { setHelps, setLoading } = HelpSlice.actions;
export default HelpSlice.reducer;
