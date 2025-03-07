import React, { useEffect, useState } from "react";
import { Box} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import getAndUpdateCourseDetails from "features/student-pages/courses-page/redux/thunks";
import { selectStudentCourse } from "features/student-pages/courses-page/redux/selectors";
import CourseStudentLayout from "features/student-pages/courses-page/components/courseLayout";
import CourseStudentViewPage from "features/student-pages/courses-page/components/courseViewPage";

const CoursePage = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectStudentCourse);
  const { showSpinner, hideSpinner } = useSpinner();
  

  // Function to fetch course details
  const getCourseDetails = (data) => {
    try {
      showSpinner();
      dispatch(getAndUpdateCourseDetails(data));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    const data = {};
    getCourseDetails(data);
  }, [dispatch]);


  return (
    <>

<Box>
  <CourseStudentLayout>
        <CourseStudentViewPage Course={course} />
      </CourseStudentLayout>
      </Box>
      
    </>
  );
};

export default CoursePage;




