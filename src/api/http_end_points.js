
const HTTP_END_POINTS = {
    
   Student : {
     auth : {
        login : "/institutes/auth/student/login",
        verify_otp : "/institutes/auth/student/verify-otp"
     }
   },

   Instructor : {
     auth : {
        login : "/institutes/auth/teaching-staff/login",
        verify_otp : "/institutes/auth/teaching-staff/verify-otp",
        log_out : "/institutes/auth/teaching-staff/logout"
     },
     attendance : {
       get : "/institutes/attedance/staff/"
     }

   }
}

export default HTTP_END_POINTS