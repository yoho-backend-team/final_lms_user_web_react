import Cookies from "js-cookie";
import { Instructor_Details, instructorDetails, Student, Student_Details } from "lib/constants";
import LZString from "lz-string"
import { getAndDecompress } from "utils/auth_helpers";

export const checkUser = (role) => {
  const user = Cookies.get(role);
  if (!user) {
    return null
  }
  return JSON.parse(LZString.decompressFromBase64(user));
};

export const checkUserLoggedIn = (role) => {
  const auth_state = getAndDecompress(role)
  return auth_state
};

export const getInstructorDetails = () => {
  const user = checkUser(Instructor_Details);
  return user
};

export const checkUserRole = (role) => {
  const current_user = getAndDecompress(role)
  return current_user
}

export const getInstituteDetails = () => {
  const user = getInstructorDetails();
  return user.institute_id;
};

export const getBranchDetails = () => {
  const user = getInstructorDetails();
  return user.branch_id;
};

export const useInstitute = () => {
  const institute = getInstituteDetails();
  return institute.uuid;
};

export const useBranch = () => {
  const branch = getBranchDetails();
  return branch.uuid;
};

export const getStudentDetails = () => {
  const user = checkUser(Student_Details);
  return user
};

export const getStudentInstituteDetails = () => {
  const user = getStudentDetails();
  return user.institute_id;
};

export const getStudentBranchDetails = () => {
  const user = getStudentDetails();
  return user?.branch_id;
};

export const checkSubscriptionStatus = (user) => {
   const status = Cookies.get(user)
   const state = status ? true : false
   return state
}
