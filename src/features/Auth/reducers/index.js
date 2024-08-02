import Cookies from "js-cookie";
import { LOGIN_SUCCESS, LOG_OUT } from "./action";
import { Instructor_Details, Instructor_Role, Instructor_Token, isAuthenticatedInstructor, isAuthenticatedStudent, Student_Details, Student_Role, Student_Token } from "lib/constants";
import LZString from 'lz-string'
import { getAndDecompress } from "utils/auth_helpers";


const initialStudentState = {
      isLoggedIn : getAndDecompress(isAuthenticatedStudent,false),
      userDetails : getAndDecompress(Student_Details,null),
      token : getAndDecompress(Student_Token,null),
      role : getAndDecompress(Student_Role,Student_Role)
}

const initialInstructorState = {
    isLoggedIn : getAndDecompress(isAuthenticatedInstructor,false),
    userDetails : getAndDecompress(Instructor_Details,null),
    token : getAndDecompress(Instructor_Token,null),
    role : getAndDecompress(Instructor_Role,Instructor_Role)
}

const InstructorAuthReducer = (state,action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
          return{
          ...state,
          isLoggedIn : true,
          userDetails : action.payload.userDetails,
          token : action.payload.token,
          role : action.payload.role
          }
        case LOG_OUT : 
          return initialInstructorState
        default :
          return state
    }
}

const StudentAuthReducer = (state,action) => {
    switch(action.type){
        case LOGIN_SUCCESS : 
          return{
            ...state,
            isLoggedIn : true,
            userDetails : action.payload.userDetails,
            token : action.payload.token,
            role : action.payload.role
          }
        case LOG_OUT : 
          return initialStudentState
        default : 
          return state
    }
}

export { InstructorAuthReducer, StudentAuthReducer, initialInstructorState, initialStudentState }