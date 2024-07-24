import { createSlice } from "@reduxjs/toolkit";

const studentNotificationSlice = createSlice({
    name : "studentNotification",
    initialState : {
        data : [],
        loading : true,
        selectedNotification : null
    },
    reducers : {
        setStudentNotifications : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        },
        setStudentSelectedNotification : (state,action) => {
            state.selectedNotification = action.payload
        }
    }
})

export const { setLoading, setStudentSelectedNotification, setStudentNotifications } = studentNotificationSlice.actions
export default studentNotificationSlice.reducer