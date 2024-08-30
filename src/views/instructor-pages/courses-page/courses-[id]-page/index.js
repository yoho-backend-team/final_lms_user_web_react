import CourseLayout from "features/instructor-pages/courses-page/components/courseLayout";
import CourseViewPage from "features/instructor-pages/courses-page/course-view-page/components/courseViewPage";
import getAndUpdateCourseDetails from "features/instructor-pages/courses-page/course-view-page/redux/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorCourse } from "features/instructor-pages/courses-page/course-view-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectInstructorCourse);
  const navigate = useNavigate()
  const { showSpinner,hideSpinner } = useSpinner()
  const {courseId} = useParams()
  
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
    const data = {course:courseId};
    getCourseDetails(data);
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1)
  }
  
  return (
    <CourseLayout>      
      <CourseViewPage Course={course} handleBack={handleBack} getCourseDetails={getCourseDetails} />
    </CourseLayout>
  );
};

export default CoursePage;
