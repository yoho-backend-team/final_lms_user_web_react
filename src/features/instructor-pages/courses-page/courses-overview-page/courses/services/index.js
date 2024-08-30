import Client from "api/index"


export const getCourseList = async () => {
   try {
   const response = await Client.Instructor.course_list.get()
   return response?.data
   } catch (error) {
     throw error
   }
}

export const getBatchesWithCourseId = async (data) => {
  try {
  const response = await Client.Instructor.course.bathes.get(data) 
  return response?.data
  } catch (error) {
    throw error
  }
}