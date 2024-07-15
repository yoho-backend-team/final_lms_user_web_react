import AddStudyMaterialLayout from "features/instructor-pages/courses-page/add-study-material-page/components/layout";
import AddStudyMaterialsPage from "features/instructor-pages/courses-page/add-study-material-page/components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import getAndUpdateCourseDetails from "features/instructor-pages/courses-page/redux/thunks";
import { useSelector,useDispatch } from "react-redux";
import { selectInstructorCourse } from "features/instructor-pages/courses-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";

const StudyMaterialPage = () => {
  const { id } = useParams()
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

  console.log(course,"course")

  useEffect(() => {
    const data = {};
    getCourseDetails(data);
  }, [dispatch]);
  
  return (
    <>
      <AddStudyMaterialLayout>
        <AddStudyMaterialsPage Course ={ course} getCourseDetails={getCourseDetails} />
      </AddStudyMaterialLayout>
    </>
  );
};

export default StudyMaterialPage;
