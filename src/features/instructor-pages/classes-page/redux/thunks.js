import { setLoading,setClasses } from "./slices"
import { getAllClasses as getClassDetails } from "../services"

export const getAllClasses = (data) => async(dispatch) => {
    try {
    dispatch(setLoading(true))
    const response  = await getClassDetails(data)  
    dispatch(setClasses(response))      
    } catch (error) {
      console.log(error)
      return error 
    }finally{
        dispatch(setLoading(false))
    }
}