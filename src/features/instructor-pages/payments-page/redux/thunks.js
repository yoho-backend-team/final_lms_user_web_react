import { setPayments,setLoading } from "./slices";
import { getStaffSalaries } from "../services";

const updateStaffSalaries = () => async (dispatch) =>{
    try{
        dispatch(setLoading(true))
        const response = await getStaffSalaries()
        dispatch(setPayments(response))
    }catch(error){
    throw new Error(error)
    }finally{
        dispatch(setLoading(false))
    }
}

export default updateStaffSalaries