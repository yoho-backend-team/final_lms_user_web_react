import Client from "../../../../api/index"



export const getReports = async (data) => {
    try {
    const response = await Client.Instructor.reports.get(data)
    return response?.data  
    } catch (error) {
     throw new Error(error?.response?.data?.message)   
    }
}

export const getInstructorNotificationsClient = async (data) => {
    try {
    const response = await Client.Instructor.notification.get(data) 
    return response?.data   
    } catch (error) {
      const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
      throw new Error(message)  
    }
}

export const updateInstructorNotificationsClient = async (data) => {
  try {
  const response = await Client.Instructor.notification.put(data) 
  return response?.data   
  } catch (error) {
    const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    throw new Error(message)  
  }
}


export const deleteInstructorNotificationsClient = async (data) => {
  try {
  const response = await Client.Instructor.notification.delete(data) 
  return response?.data   
  } catch (error) {
    const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    throw new Error(message)  
  }
}