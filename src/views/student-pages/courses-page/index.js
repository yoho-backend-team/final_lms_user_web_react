import CircularProgressWithStudentLabel from "features/student-pages/courses-page/components/cirularProgresswitjLabel";
import CourseStudentChapters from "features/student-pages/courses-page/components/courseChapter";
import CourseStudentDetails from "features/student-pages/courses-page/components/courseDetails";
import CourseStudentLayout from "features/student-pages/courses-page/components/courseLayout";
import CourseStudentModuleCard from "features/student-pages/courses-page/components/CourseNotesComponents/courseModuleCard";
import CourseStudentViewPage from "features/student-pages/courses-page/components/courseViewPage";
import StudentAbout from "features/student-pages/courses-page/components/section/About";
import CourseAndNotesStudentPage from "features/student-pages/courses-page/components/section/course&Notes";
import SingleCourseStudentView from "features/student-pages/courses-page/components/section/CourseViewPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import React from "react";
import getAndUpdateCourseDetails from "features/student-pages/courses-page/redux/thunks";
import { selectStudentCourse } from "features/student-pages/courses-page/redux/selectors";

const CoursePage = () => {
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
         <CourseStudentViewPage Course={course} />
      </CourseStudentLayout>
    </>
  );
};

export default CoursePage;

