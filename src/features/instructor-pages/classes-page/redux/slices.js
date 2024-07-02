import { createSlice } from "@reduxjs/toolkit";


const ClassesSlice = createSlice({
    name : "instructorClasses",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setClasses : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setClasses,setLoading } = ClassesSlice.actions
export default ClassesSlice.reducer