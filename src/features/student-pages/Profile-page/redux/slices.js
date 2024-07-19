import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "studentProfile",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProfile, setLoading } = ProfileSlice.actions;
export default ProfileSlice.reducer;


