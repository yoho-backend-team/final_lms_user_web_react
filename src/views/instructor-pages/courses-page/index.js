import CourseLayout from "features/instructor-pages/courses-page/components/courseLayout"
import CourseListPage from "features/instructor-pages/courses-page/courses-overview-page/courses/components/index";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorCourseList } from "features/instructor-pages/courses-page/courses-overview-page/courses/redux/selectors";
import getAllCourseList from "features/instructor-pages/courses-page/courses-overview-page/courses/redux/thunks";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";

    

const CourseListMainPage = () => {
   const dispatch = useDispatch()
   const courses = useSelector(selectInstructorCourseList)
   const { showSpinner, hideSpinner } = useSpinner()

   const getCourse = () => {
      try {
        showSpinner()
        dispatch(getAllCourseList())    
      } catch (error) {
        toast.error(error?.message)
      }finally{
        hideSpinner()
      }
   }

   useEffect(() => {
    getCourse()
   },[])

return(
        <CourseLayout>
        <Box sx={{ padding : "40px" }} >
           <Box sx={{ pb: "20px"}} >
             <Typography sx={{ fontSize: "20px", fontWeight: 800, lineHeight : "24px" }} >Courses</Typography>
           </Box>
           <Box>
              <CourseListPage courses={courses} />
           </Box>
        </Box>
        </CourseLayout>
)
}

export default CourseListMainPage
