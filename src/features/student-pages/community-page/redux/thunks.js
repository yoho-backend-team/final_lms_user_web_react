import { getCommunities } from "../services";
import { setStudentCommunity,setLoading } from "./slices";


export const getAllStudentCommunities = (data) => async (dispatch) => {
    try {
    dispatch(setLoading(true))
    const response = await getCommunities(data) 
    dispatch(setStudentCommunity(response))  
    } catch (error) {
      throw new Error(error)   
    }finally{
        dispatch(setLoading(false))
    }
}