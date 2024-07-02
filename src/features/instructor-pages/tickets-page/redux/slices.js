import { createSlice } from "@reduxjs/toolkit";


const TicketSlice = createSlice({
    name : "instructorTickets",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setTickets : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setTickets, setLoading } = TicketSlice.actions
export default TicketSlice.reducer