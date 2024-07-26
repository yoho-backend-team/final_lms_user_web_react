import { setTickets, setLoading } from "./slices";
import {  getTickets} from "../services";

const getAllStudentTickets = (query) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getTickets(query);
    dispatch(setTickets(response));
  } catch (error) {
    throw new Error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default getAllStudentTickets;
