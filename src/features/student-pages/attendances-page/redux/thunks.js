import { getAttendence } from "../services";
import { setAttendance, setLoading } from "./slices";


export const getAllAttendances = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getAttendence(data);
    dispatch(setAttendance(response));
  } catch (error) {
    console.log(error.message);
    // throw new Error(error)
  } finally {
    dispatch(setLoading(false));
  }
};