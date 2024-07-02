import { createSlice } from "@reduxjs/toolkit";

const CommunitySlice = createSlice({
    name : "instructorCommunity",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setCommunities : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setCommunities, setLoading } = CommunitySlice.actions
export default CommunitySlice.reducer