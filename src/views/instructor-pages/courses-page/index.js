import CourseLayout from "features/instructor-pages/courses-page/components/courseLayout"
import CourseViewPage from "features/instructor-pages/courses-page/components/courseViewPage"

const CoursePage = () => {
  return(
     <CourseLayout>
       <CourseViewPage />
     </CourseLayout>
  )
}

export default CoursePage