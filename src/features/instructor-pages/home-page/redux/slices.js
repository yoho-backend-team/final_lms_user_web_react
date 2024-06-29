import { createSlice } from "@reduxjs/toolkit";

const DashboardReducers = createSlice({
    name : "instructorDashboard",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setDashboard : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setDashboard,setLoading } = DashboardReducers.actions
export default DashboardReducers.reducer