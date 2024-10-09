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

export const getAllNotification = async (data) => {
  try {
  const response = await Client.Student.notification.get(data) 
  return response.data  
  } catch (error) {
    const message = getErrorMessage(error) 
    throw new Error(message) 
  }
}


export const deleteNotification = async (data) => {
  try {
      const response = await Client.Student.notification.delete(data);
      return response.data;
  } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
  }
};