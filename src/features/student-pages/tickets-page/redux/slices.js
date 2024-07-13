

import { createSlice } from "@reduxjs/toolkit";

const StudentTicketSlice = createSlice({
  name: "studentsTickets",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTickets, setLoading } = StudentTicketSlice.actions;
export default StudentTicketSlice.reducer;
