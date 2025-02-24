import { Instructor_Details, instructorDetails, Student, Student_Details } from "lib/constants";
import { studentDetails } from "lib/constants";
import Cookies from "js-cookie";
import { getAndDecompress } from "utils/auth_helpers";

const getUserDetails = () => {
  const user = getAndDecompress(Instructor_Details)
  const userDetail = user
  return userDetail;
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
  const user = getAndDecompress(Student_Details)
  const userDetail = user;
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
  return userDetails?.userDetail?.course;
};

const getStudentDetails = () => {
  const user = getAndDecompress(Student_Details)
  console.log(user,'user')
  const userDetail = user
  return userDetail;
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
  console.log(userDetails,"userDetails")
  return userDetails?.userDetail?.course;
};
const studentCourseId = () => {
  const user = getStudentDetails();
  
  return user?.userDetail?.course;
};

const instituteStudentuuid = () => {
  const userDetails = getStudentDetails();
  return userDetails?.institute_id?.uuid;
};

const generateEndpoints = () => {
  const institute = instituteId();
  const branch = branchId();
  const course = courseId();
  const institutestudent = instituteIdStudent();
  const branchstudent = branchIdStudent();

  const instituteuuid = instituteStudentuuid();

  const institute1 = instituteStudentId();
  const branch1 = branchStudentId();
  const course1 = courseStudentId();
  console.log(course1,"course")
  const student = getStudentDetails();
  const studentCourse = studentCourseId();
   
  return {
    Student: {
      auth: {
        login: "/institutes/auth/student/login",
        verify_otp: "/institutes/auth/student/verify-otp",
        forget_password: "/institutes/auth/profile/forgot-password",
        reset_password: "/institutes/auth/profile/reset-password",
        change_password: "institutes/auth/profile/change-password",
        log_out : "/institutes/auth/student/logout"
      },
      course: {
        get: `/institutes/${institute1}/branches/${branch1}/course/${course1}`,
        // getwithclass: `/institutes/${institute}/branches/${branch}/course/${course}/classes`
      },
      class: {
        get: `/institutes/class/${course1}`,
        getwithId: `/institutes/class/course/`,
      },
      attendance: {
        get: "/institutes/attedance/student-attendance/",
        class_attendance: "/attendance/class",
      },
      payments: {
        getFees: `/institutes/payments/student-fee/${getStudentDetails()?._id}`,
      },
      ticket: {
        create: "/institutes/student-ticket/create",
        get: "/institutes/student-ticket/getall",
        getById: "/institutes/student-ticket/",
      },
      notification: {
        get: "/institutes/students/notifications/",
        update_status: "/institutes/students/notifications/status/",
         delete:`/institutes/students/notifications/student-notifications/`
      },
      activity: {
        get: `institutes/user/activity/`,
      },
      faq: {
        // get: `institutes/faq/category?instituteid=${getStudentDetails()?.institute_id?.uuid}&branchid=${getStudentDetails()?.branch_id?.uuid}`,
        get: `institutes/faq/all`,
      },
      help: {
        get: `/helpcenter?instituteid=${instituteuuid}`,
      },

      reports: {
        get: "/institutes/reports/users/student",
      },
      community: {
        get: `/institutes/community/course/${course1}`,
        get_messages : `/institutes/community/messages/all/`
      },
      profile: {
        get: `institutes/auth/profile/me/`,
        // update: `/institutes/auth/student/update/${getStudentDetails()?.uuid}`,
        update: 'institutes/auth/profile/me/'
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
      activity : {
        get : "/institutes/user/activity"
      },
      auth: {
        login: "/institutes/auth/teaching-staff/login",
        verify_otp: "/institutes/auth/teaching-staff/verify-otp",
        change_password : "/institutes/auth/teaching-staff/change-password",
        log_out: "/institutes/auth/teaching-staff/logout",
      },
      attendance: {
        get: "/institutes/attedance/staff/",
        class_attendance: "/institutes/attedance/class/",
      },
      course_list : {
        get : `/institutes/${institute}/branches/${branch}/teaching-staff/courses`
      },
      course: {
        get: `/institutes/${institute}/branches/${branch}/course/`,
        notes: {
          create: `/institutes/course/note`,
          update: `/institutes/course/note/update/`,
          delete: `/institutes/course/note/`,
        },
        study_material: {
          index: "/institutes/study-material/",
        },
        batches : {
          get : `/institutes/${institute}/branches/${branch}/courses/`
        }
      },
      class: {
        get: `/institutes/class/${course?.[0]}`,
        getwithId: `/institutes/class/course/`,
        update: `/institutes/class/`,
      },
      community: {
        get: `/institutes/community/course/${course?.[0]}`,
        get_messages : `/institutes/community/messages/all/`
      },
      notification: {
        get: `/institutes/staff/notifications`,
       
      },
      payments: {
        getSalaries: "/institutes/payments/staff-salary/salary",
      },
      ticket: {
        create: "/institutes/staff/ticket",
        get: "/institutes/staff/ticket/",
      },
      reports: {
        get: "/institutes/reports/users/teaching-staff",
      },
      index: {
        get: "/institutes/auth/profile/me/",
      },
    },
  };
};

const HTTP_END_POINTS = generateEndpoints();

export default HTTP_END_POINTS;
