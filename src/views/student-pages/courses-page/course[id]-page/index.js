import CourseStudentLayout from "features/student-pages/courses-page/components/courseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import React from "react";
import getAndUpdateCourseDetails from "features/student-pages/courses-page/redux/thunks";
import { selectStudentCourse } from "features/student-pages/courses-page/redux/selectors";
import CourseFrontPage from "features/student-pages/courses-page/components/CourseFrontPage";

const CoursePage1 = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectStudentCourse);
  const { showSpinner,hideSpinner } = useSpinner()

  const getCourseDetails = (data) => {
    try {
      showSpinner()
      dispatch(getAndUpdateCourseDetails(data));     
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hideSpinner()
    }
   
  };

  useEffect(() => {
    const data = {};
    getCourseDetails(data);
  }, [dispatch]);
  
  return (
    <>
      <CourseStudentLayout>
         <CourseFrontPage Course={course} />
      </CourseStudentLayout>
    </>
  );
};

export default CoursePage1;

