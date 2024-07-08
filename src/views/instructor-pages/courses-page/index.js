import CourseLayout from "features/instructor-pages/courses-page/components/courseLayout";
import CourseViewPage from "features/instructor-pages/courses-page/components/courseViewPage";
import getAndUpdateCourseDetails from "features/instructor-pages/courses-page/redux/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorCourse } from "features/instructor-pages/courses-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";

const CoursePage = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectInstructorCourse);
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
    <CourseLayout>
      <CourseViewPage Course={course} />
    </CourseLayout>
  );
};

export default CoursePage;
