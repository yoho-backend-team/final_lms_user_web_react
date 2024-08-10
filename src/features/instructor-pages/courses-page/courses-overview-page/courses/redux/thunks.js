import { getCourseList } from "../services"
import { setClassList,setClassLoading } from "./slices"

const getAllCourseList = () => async (dispatch) => {
    try {
    dispatch(setClassLoading(true)) 
    const response = await getCourseList()
    console.log(response)
    dispatch(setClassList(response))  
    } catch (error) {
      throw error  
    }finally{
     dispatch(setClassLoading(false))
    }
}

export default getAllCourseList