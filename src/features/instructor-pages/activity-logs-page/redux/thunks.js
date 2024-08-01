import { getAllLogs } from "../services"
import { setActivityLogs, setLoading } from "./slices"



export const getAllActivity = (data) => async (dispatch) => {
    try {
     dispatch(setLoading(true))
     const response = await getAllLogs(data)
     dispatch(setActivityLogs(response))    
    } catch (error) {
      throw new Error(error) 
    }finally{
      dispatch(setLoading(false))
    }
}