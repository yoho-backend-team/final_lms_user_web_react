import { instructorDetails, Student } from "lib/constants";
import { studentDetails } from "lib/constants";
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

const getStudentDetails = () => {
  const user = Cookies.get(Student);
  const userDetail = user ? JSON.parse(user) : user;
  return userDetail?.userDetails;
};
const instituteStudentId = () => {
  const userDetails = getStudentDetails();
  return userDetails?.institute_id?._id;
};

const branchStudentId = () => {
  const userDetails = getStudentDetails();
  return userDetails?.branch_id?._id;
};

const courseStudentId = () => {
  const userDetails = getStudentDetails();
  return userDetails?.userDetail?.course;
};
const studentCourseId = () => {
  const user = getStudentDetails();
  return user?.userDetail?.course;
};

const generateEndpoints = () => {
  const institute = instituteId();
  const branch = branchId();
  const course = courseId();
  const institutestudent = instituteIdStudent();
  const branchstudent = branchIdStudent();

  const institute1 = instituteStudentId();
  const branch1 = branchStudentId();
  const course1 = courseStudentId();

  const student = getStudentDetails();
  const studentCourse = studentCourseId();

  return {
    Student: {
      auth: {
        login: "/institutes/auth/student/login",
        verify_otp: "/institutes/auth/student/verify-otp",
      },
      course: {
        get: `/institutes/${institute1}/branches/${branch1}/course/${course1}`,
      },
      class: {
        get: `/institutes/class/${studentCourse}`,
        getwithId: `/institutes/class/course/`,
      },
      attendance: {
        get: `/institutes/attedance/student-attendance/${student?._id}`,
        class_attendance : "/attendance/class"
      },
      payments: {
        getFees: `/institutes/payments/student-fee/${getStudentDetails()?._id}`,
      },
      ticket: {
        create: "/institutes/student/ticket/create",
        get: "/institutes/student/ticket/getall",
      },

      community: {
        get: `/institutes/community/course/${course1}`,
      },
    },
    common: {
      file: {
        upload: "/upload/",
      },
    },
    common: {
      file: {
        upload: "/upload/",
      },
    },
    Instructor: {
      auth: {
        login: "/institutes/auth/teaching-staff/login",
        verify_otp: "/institutes/auth/teaching-staff/verify-otp",
        log_out: "/institutes/auth/teaching-staff/logout",
      },
      attendance: {
        get: "/institutes/attedance/staff/",
        class_attendance: "/institutes/attedance/class/",
      },
      course: {
        get: `/institutes/${institute}/branches/${branch}/course/${course}`,
        notes : {
          create : `/institutes/course/note`,
          update : `/institutes/course/note/update/`,
          delete : `/institutes/course/note/`
        },
        study_material : {
          index : '/institutes/study-material/'
        }
      },
      class: {
        get: `/institutes/class/${course}`,
        getwithId: `/institutes/class/course/`,
        update: `/institutes/class/`,
      },
      community: {
        get: `/institutes/community/course/${course}`,
      },
      payments: {
        getSalaries: "/institutes/payments/staff-salary/salary",
      },
      ticket: {
        create: "/institutes/staff/ticket",
        get: "/institutes/staff/ticket/all",
      },
      reports : {
        get : "/institutes/reports/users/teaching-staff"
      }
    },
  };
};

const HTTP_END_POINTS = generateEndpoints();

export default HTTP_END_POINTS;
