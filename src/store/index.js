// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./customizationReducer";
import attendanceReducer from "../features/instructor-pages/attendances-page/redux/slices";
import classesReducer from "../features/instructor-pages/classes-page/redux/slices";
import activityLogReducer from "../features/instructor-pages/activity-logs-page/redux/slices";
import communityReducer from "../features/instructor-pages/community-page/redux/slices";
import courseReducer from "../features/instructor-pages/courses-page/course-view-page/redux/slices";
import helpReducer from "../features/instructor-pages/help-center-page/redux/slices";
import paymentReducer from "../features/instructor-pages/payments-page/redux/slices";
import ticketReducer from "../features/instructor-pages/tickets-page/redux/slices";
import dashboardReducer from "../features/instructor-pages/home-page/redux/slices";
import studentCommunityReducer from "../features/student-pages/community-page/redux/slices";
import StudentCourseReducer from "../features/student-pages/courses-page/redux/slices"
import StudentPaymentReducer from "../features/student-pages/payments-page/redux/slices"
import StudentHelpCenter from "../features/student-pages/help-center-page/redux/slices"
import StudentActivityLog from "../features/student-pages/activity-logs-page/redux/slices"
import StudentTicketReducer from "../features/student-pages/tickets-page/redux/slices"
import instructorNotificationReducer from "../features/common/redux/slices"
import studentNotificationReducer from "../features/common/redux/studentSlices"

import StudentClassReducer from "../features/student-pages/classes-page/redux/slices";
import StudentAttendanceReducer from "../features/student-pages/attendances-page/redux/slices"
import StudentActivityReducer from "../features/student-pages/activity-logs-page/redux/slices"
import StudentdashboardReducer from "../features/student-pages/home-page/redux/slices"
import InstructorFaqReducer from "../features/instructor-pages/Faq-page/redux/slices"
import InstructorCourseListReducer from "../features/instructor-pages/courses-page/courses-overview-page/courses/redux/slices"

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    instructorAttendance: attendanceReducer,
    instructorClasses: classesReducer,
    instructorActivityLogs: activityLogReducer,
    instructorCommunity: communityReducer,
    instructorCourse: courseReducer,
    instructorHelp: helpReducer,
    instructorPayments: paymentReducer,
    instructorTickets: ticketReducer,
    instructorDashboard: dashboardReducer,
    instructorNotifications : instructorNotificationReducer,
    instructorCourseList : InstructorCourseListReducer,
    studentCommunity: studentCommunityReducer,
    studentcourse: StudentCourseReducer,
    studentPayments: StudentPaymentReducer,
    studenthelp: StudentHelpCenter,
    studentsActivityLogs: StudentActivityLog,
    studentsTickets:StudentTicketReducer,
    studentClasses: StudentClassReducer,
    studentAttendance: StudentAttendanceReducer,
    studentsActivityLogs: StudentActivityReducer,
    studentDashboard:StudentdashboardReducer ,
    Instructorfaq:InstructorFaqReducer,
    studentNotification : studentNotificationReducer
  },
});
// configureStore(reducer);
const persister = "Free";

export { store, persister };
