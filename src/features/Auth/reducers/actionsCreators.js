import { LOGIN_SUCCESS, LOG_OUT } from "./action";


export const loginSuccess = (userDetails, token, role) => ({
    type: LOGIN_SUCCESS,
    payload: { userDetails, token, role },
  });
  
  export const logout = () => ({
    type: LOG_OUT,
  });