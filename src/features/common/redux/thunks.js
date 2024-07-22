import { getInstructorNotifications } from "features/instructor-pages/home-page/services"
import { setNotifications,setLoading} from "./slices"


const updateInstructorNotifications = () => async(dispatch) => {
      try {
      dispatch(setLoading(true))  
      const response = await getInstructorNotifications()
      dispatch(setNotifications(response))
      } catch (error) {
        throw new Error(error)
      }finally{
       dispatch(setLoading(false))
      }
}

export default updateInstructorNotifications