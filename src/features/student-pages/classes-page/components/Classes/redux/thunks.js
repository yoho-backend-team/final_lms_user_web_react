import { setLoading, setClasses } from "./slices";
import { getAllClasses as getClassDetails } from "../../../services/index";

export const getAllClasses = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getClassDetails(data);
    dispatch(setClasses(response));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
