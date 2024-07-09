import { setDashboard,setLoading } from "./slices";
import { getReports } from "../services";

const getAllReports = (data) => async (dispatch) => {
   try {
   dispatch(setLoading(true))
   const response = await  getReports(data)
   dispatch(setDashboard(response))
   } catch (error) {
   throw new Error(error) 
   }finally{
    dispatch(setLoading(false))
   }
}

export default getAllReports