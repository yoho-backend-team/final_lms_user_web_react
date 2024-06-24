import Cookies from "js-cookie";
import { instructorDetails } from "lib/constants";


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