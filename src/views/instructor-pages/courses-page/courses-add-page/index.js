import AddStudyMaterialLayout from "features/instructor-pages/courses-page/add-study-material-page/components/layout"
import AddStudyMaterialsPage from "features/instructor-pages/courses-page/add-study-material-page/components"

const StudyMaterialPage = () => {
    return(
     <>
       <AddStudyMaterialLayout>
         <AddStudyMaterialsPage />
       </AddStudyMaterialLayout>
     </>
    )
}

export default StudyMaterialPage