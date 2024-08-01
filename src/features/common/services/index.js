import Client from "../../../api/index"


export const getStudentNotifications = async (params) => {
    try {
    const response = await Client.Student.notification.get(params)  
    return response?.data
    } catch (error) {
      throw new Error(error)  
    }
}