import CourseLayout from "features/instructor-pages/courses-page/components/courseLayout"
import CourseViewPage from "features/instructor-pages/courses-page/components/courseViewPage"
import getAndUpdateCourseDetails from "features/instructor-pages/courses-page/redux/thunks"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectInstructorCourse } from "features/instructor-pages/courses-page/redux/selectors"

const CoursePage = () => {
  const dispatch = useDispatch()
  const course = useSelector(selectInstructorCourse)


  const getCourseDetails = (data) => {
     dispatch(getAndUpdateCourseDetails(data))
  }

  useEffect(()=>{
  const data = {}
  getCourseDetails(data)
  },[dispatch])
  console.log(course,"course")
  return(
     <CourseLayout>
       <CourseViewPage Course={course} />
     </CourseLayout>
  )
}

export default CoursePage