import AddStudyMaterialsPage from "features/instructor-pages/courses-page/add-study-material-page/components";

const StudyMaterialPage = ({course,getCourseDetails}) => {

  
  return (
    <>
      <AddStudyMaterialsPage Course ={course} getCourseDetails={getCourseDetails} />
    </>
  );
};

export default StudyMaterialPage;
