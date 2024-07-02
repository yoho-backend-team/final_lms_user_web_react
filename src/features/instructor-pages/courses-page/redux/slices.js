import { createSlice } from "@reduxjs/toolkit";

const CourseSlice = createSlice({
    name : "instructorCourse",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setCourse : (state,action) => {
            state.data = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setCourse,setLoading } = CourseSlice.actions
export default CourseSlice.reducer