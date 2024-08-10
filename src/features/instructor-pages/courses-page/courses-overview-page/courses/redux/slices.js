import { createSlice } from "@reduxjs/toolkit";

const CourseListSlice = createSlice({
    name : "instructorCourseList",
    initialState : {
        data : [],
        loading : true
    },
    reducers : {
        setClassList : (state,action) => {
            state.data = action.payload
        },
        setClassLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const { setClassList, setClassLoading } = CourseListSlice.actions
export default CourseListSlice.reducer