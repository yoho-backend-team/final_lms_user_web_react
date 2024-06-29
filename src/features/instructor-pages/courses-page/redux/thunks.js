import { setCourse,setLoading } from "./slices"
import { getCourseDetails } from "../services"


const getAndUpdateCourseDetails = (data) => async (dispatch) => {
    try {
    dispatch(setLoading(true)) 
    const response = await getCourseDetails(data)
    dispatch(setCourse(response))   
    } catch (error) {
     return error   
    }finally{
     dispatch(setLoading(false))
    }
}

export default getAndUpdateCourseDetails