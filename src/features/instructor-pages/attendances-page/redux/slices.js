import { createSlice } from "@reduxjs/toolkit";

const AttendanceSlice = createSlice({
    name : "instructorAttendance",
    initialState: {
        data : [],
        loading : true
    },
    reducers : {
        setAttendance : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setAttendance, setLoading } = AttendanceSlice.actions
export default AttendanceSlice.reducer