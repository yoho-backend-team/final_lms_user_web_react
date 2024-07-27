import { createSlice } from "@reduxjs/toolkit";

const instructorNotifications = createSlice({
    name : "instructorNotifications",
    initialState : {
        data : [],
        selectedNotification : null,
        loading : true
    },
    reducers : {
        setNotifications : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        },
        setSelectedNotification : (state,action) => {
            state.selectedNotification = action.payload
        },
        addNotification: (state, action) => {
            state.data.push(action.payload);
        },
    }
})

export const { setNotifications,setLoading,setSelectedNotification,addNotification} = instructorNotifications.actions
export default instructorNotifications.reducer