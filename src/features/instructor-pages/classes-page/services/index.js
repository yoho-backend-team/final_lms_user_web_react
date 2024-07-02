import Client from "../../../../api/index"


export const getAllClasses = async (data) => {
    try {
    const response = await Client.Instructor.class.get(data)  
    return response.data 
    } catch (error) {
      throw new Error(error?.message)  
    }
}

export const getClassDetails = async (data) => {
  try {
  const response = await Client.Instructor.class.getWithId(data) 
  return response?.data  
  } catch (error) {
    throw new Error(error)
  }
}