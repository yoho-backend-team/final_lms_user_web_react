import Client from "../../../../api/index"


export const getInstructorProfile = async () => {
    try {
    const response = await Client.Instructor.index.get()  
    return response?.data  
    } catch (error) {
      const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
      throw new Error(message)   
    }
}

export const updateInstructorProfile = async (data) => {
    try{
    const response = await Client.Instructor.index.update(data)
    return response?.data
    }catch(error){
     const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
     throw new Error(message)
    }
}

export const changeInstructorPassword = async (data) => {
  try {
    const response = await Client.Instructor.changePassword(data) 
    return response?.data 
  } catch (error) {
    const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    throw new Error(message)
  }
}