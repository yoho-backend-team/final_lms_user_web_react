import { getAllStudentActivity } from '../services';
import { setActivityLogs, setLoading } from './slices';


// export const fetchActivityLogs = () => async (dispatch) => {
//   try {
   
//     dispatch(setLoading(true));
//     const response = await fetch(getAllStudentActivity);
//     const data = await response.json();
    
    
//     dispatch(setActivityLogs(data));
//     dispatch(setLoading(false)); 
//   } catch (error) {
//     console.error('Error fetching activity logs:', error);
    
//     dispatch(setLoading(false));
//   }
// };

export const fetchActivityLogs = (data) => async (dispatch) => {
  try {
   dispatch(setLoading(true))
   const response = await getAllStudentActivity(data)
   dispatch(setActivityLogs(response))    
  } catch (error) {
    throw new Error(error) 
  }finally{
    dispatch(setLoading(false))
  }
}
