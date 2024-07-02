import { setCommunities,setLoading } from "./slices"
import { getAllCommunities } from "../services"

const getandAddCommunity =  (data) => async(dispatch) => {
    try{
    dispatch(setLoading(true))
    const response = await getAllCommunities(data)
    dispatch(setCommunities(response))
    }catch(error){
     throw new Error(error)
    }finally{
     dispatch(setLoading(false))
    }
}

export default getandAddCommunity