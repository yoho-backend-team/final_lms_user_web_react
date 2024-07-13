import Client from "../../../../../api/index"


export const createNotes = async (data) => {
    try {
    const response = await Client.Instructor.course.notes.create(data)
    return response?.data    
    } catch (error) {
     const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
     throw new Error(message)   
    }
}


export const updateCourseNotes = async (data) => {
    try {
    const response = await  Client.Instructor.course.notes.update(data)  
    return response?.data
    } catch (error) {
      const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
      throw new Error(message)  
    }
}

export const deleteCourseNotes = async (data) => {
    try {
    const response = await Client.Instructor.course.notes.delete(data)
    return response?.data   
    } catch (error) {
      const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
      throw new Error(message)  
    }
}

export const createStudyMaterial = async (data) => {
  try {
  const response = await Client.Instructor.course.study_material.create(data) 
  return response?.data 
  } catch (error) {
   const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
   throw new Error(message) 
  }
}

export const updateStudyMaterial = async (data) => {
  try {
  const response = await Client.Instructor.course.study_material.update(data)
  return response?.data  
  } catch (error) {
  const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
  throw new Error(message)  
  }
}

export const deleteStudyMaterial = async (data) => {
  try {
  const response = await Client.Instructor.course.study_material.delete(data)
  return response?.data
  } catch (error) {
   const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
   throw new Error(message) 
  }
}