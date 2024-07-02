import { instructorDetails } from "lib/constants";
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

const courseId = () => {
  const userDetails = getUserDetails();
  return userDetails?.userDetail?.course?.[0];
};

const generateEndpoints = () => {
  const institute = instituteId();
  const branch = branchId();
  const course = courseId();

  return {
    Student: {
      auth: {
        login: "/institutes/auth/student/login",
        verify_otp: "/institutes/auth/student/verify-otp"
      }
    },
    Instructor: {
      auth: {
        login: "/institutes/auth/teaching-staff/login",
        verify_otp: "/institutes/auth/teaching-staff/verify-otp",
        log_out: "/institutes/auth/teaching-staff/logout"
      },
      attendance: {
        get: "/institutes/attendance/staff/"
      },
      course: {
        get: `/institutes/${institute}/branches/${branch}/course/${course}`
      },
      class: {
        get: `/institutes/class/${course}`
      },
      community : {
        get : `/institutes/community/course/${course}`
      },
      payments : {
        getSalaries : "/institutes/payments/staff-salary/salary"
      }
    }
  };
};

const HTTP_END_POINTS = generateEndpoints();

export default HTTP_END_POINTS;
