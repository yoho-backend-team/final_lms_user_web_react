import { setStudentNotifications,setLoading } from "./studentSlices";
import { getStudentNotifications } from "../services";

const getAllStudentNotifications = (params) => async (dispatch) => {
    try {
    dispatch(setLoading(true)) 
    const response = await getStudentNotifications()
    dispatch(setStudentNotifications(response))   
    } catch (error) {
      // throw new Error(error)  
      console.log("get all notification error",error)
    } finally{
        dispatch(setLoading(false))
    }
}

export default getAllStudentNotifications