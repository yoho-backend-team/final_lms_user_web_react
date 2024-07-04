import { instructorDetails, studentDetails } from "lib/constants";
import Cookies from "js-cookie";

const getUserDetails = () => {
  const user = Cookies.get(instructorDetails);
  const userDetail = user ? JSON.parse(user) : user;
  return userDetail?.userDetails;
};

const instituteId = () => {
  const userDetails = getUserDetails();
  return userDetails?.institute_id?.uuid;
};

const branchId = () => {
  const userDetails = getUserDetails();
  return userDetails?.branch_id?.uuid;
};


const getUserDetailsStudent = () => {
  const user = Cookies.get(studentDetails);
  const userDetail = user ? JSON.parse(user) : user;
  return userDetail?.userDetails;
};

const instituteIdStudent = () => {
  const userDetails = getUserDetailsStudent();
  return userDetails?.institute_id?.uuid;
};

const branchIdStudent = () => {
  const userDetails = getUserDetailsStudent();
  return userDetails?.branch_id?.uuid;
};

const courseId = () => {
  const userDetails = getUserDetails();
  return userDetails?.userDetail?.course?.[0];
};

const generateEndpoints = () => {
  const institute = instituteId();
  const branch = branchId();
  const course = courseId();
  const institutestudent = instituteIdStudent();
  const branchstudent = branchIdStudent();

  
  return {
    Student: {
      auth: {
        login: "/institutes/auth/student/login",
        verify_otp: "/institutes/auth/student/verify-otp"
      },
      attendance: {
        get: `/attendance/students/?${institutestudent}/${branchstudent}`
      },
      
    },
    common : {
       file : {
        upload : "/upload/"
       }
    },
    common : {
       file : {
        upload : "/upload/"
       }
    },
    Instructor: {
      auth: {
        login: "/institutes/auth/teaching-staff/login",
        verify_otp: "/institutes/auth/teaching-staff/verify-otp",
        log_out: "/institutes/auth/teaching-staff/logout"
      },
      attendance: {
        get: "/institutes/attendance/staff/",
        class_attendance : "/institutes/attedance/class/"
      },
      course: {
        get: `/institutes/${institute}/branches/${branch}/course/${course}`,
      },
      class: {
        get: `/institutes/class/${course}`,
        getwithId : `/institutes/class/course/`,
        update : `/institutes/class/`
      },
      community : {
        get : `/institutes/community/course/${course}`
      },
      payments : {
        getSalaries : "/institutes/payments/staff-salary/salary"
      },
      ticket : {
        create : "/institutes/staff/ticket",
        get : "/institutes/staff/ticket/all",
      }
    }
  };
};

const HTTP_END_POINTS = generateEndpoints();

export default HTTP_END_POINTS;
