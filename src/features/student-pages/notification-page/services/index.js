import Client from "api/index"
import { getErrorMessage } from "utils/common/error"

export const updateNotificationStatus = async (data) => {
    try {
    const response = await Client.Student.notification.update(data) 
    return response.data  
    } catch (error) {
      const message = getErrorMessage(error) 
      throw new Error(message) 
    }
}