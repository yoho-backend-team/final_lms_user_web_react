import { setPayments, setLoading } from "./slices";
import { getStudentFees } from "../services";

const updateStudentFees = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getStudentFees();
    dispatch(setPayments(response));
  } catch (error) {
    throw new Error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default updateStudentFees;
