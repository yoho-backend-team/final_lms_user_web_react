import { deleteInstructorNotificationsClient, getInstructorNotificationsClient, updateInstructorNotificationsClient } from "features/instructor-pages/home-page/services"
import { setNotifications,setLoading, setSelectedNotification} from "./slices"


export const getInstructorNotifications = (data) => async(dispatch) => {
      try {
      dispatch(setLoading(true))  
      const response = await getInstructorNotificationsClient(data)
      dispatch(setNotifications(response))
      } catch (error) {
        // throw new Error(error)
        console.log("institute notification error",error)
      }finally{
       dispatch(setLoading(false))
      }
}

export const updateInstructorNotifications = (data) => async(dispatch) => {
  try {
  dispatch(setLoading(true))  
  const response = await updateInstructorNotificationsClient(data)
  dispatch(setSelectedNotification(response))
  } catch (error) {
    throw new Error(error)
  }finally{
   dispatch(setLoading(false))
  }
}

export const deleteInstructorNotifications = (data) => async(dispatch) => {
  try {
  dispatch(setLoading(true))  
  const response = await deleteInstructorNotificationsClient(data)
  dispatch(setSelectedNotification(response))
  } catch (error) {
    throw new Error(error)
  }finally{
   dispatch(setLoading(false))
  }
}

