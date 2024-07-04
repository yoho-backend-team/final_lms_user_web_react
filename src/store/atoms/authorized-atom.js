import Cookies from "js-cookie";
import { instructorDetails, Student } from "lib/constants";


export const checkUser = (role) => {
    const user = Cookies.get(role)
    if(!user){
    return { isLoggedIn: false, user: null, role : null}
    }
    return JSON.parse(user)
}

export const checkUserLoggedIn = (role) => {
   const auth = checkUser(role).isLoggedIn
   return auth
}


export const getInstructorDetails = () => {
    const user = checkUser(instructorDetails)
    return user.userDetails
}

export const getInstituteDetails = () => {
    const user = getInstructorDetails()
    return user.institute_id
}

export const getBranchDetails = () => {
    const user = getInstructorDetails()
    return user.branch_id
}

export const useInstitute = () => {
    const institute = getInstituteDetails()
    return institute.uuid
}

export const useBranch = () => {
    const branch = getBranchDetails()
    return branch.uuid
}

export const getStudentDetails = () => {
    const user = checkUser(Student)
    return user?.userDetails
}

export const getStudentInstituteDetails = () => {
    const user = getStudentDetails()
    return user.institute_id
}

export const getStudentBranchDetails = () => {
    const user = getStudentDetails()
    return user?.branch_id
}