import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "studentPayments",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setPayments: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPayments, setLoading } = PaymentSlice.actions;
export default PaymentSlice.reducer;
