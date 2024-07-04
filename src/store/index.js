// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import attendanceReducer from "../features/instructor-pages/attendances-page/redux/slices"
import classesReducer from "../features/instructor-pages/classes-page/redux/slices"
import activityLogReducer from "../features/instructor-pages/activity-logs-page/redux/slices"
import communityReducer from "../features/instructor-pages/community-page/redux/slices"
import courseReducer from "../features/instructor-pages/courses-page/redux/slices"
import helpReducer from "../features/instructor-pages/help-center-page/redux/slices"
import paymentReducer from "../features/instructor-pages/payments-page/redux/slices"
import ticketReducer from "../features/instructor-pages/tickets-page/redux/slices"
import dashboardReducer from "../features/instructor-pages/home-page/redux/slices"
import studentCommunityReducer from "../features/student-pages/community-page/redux/slices"

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    instructorAttendance : attendanceReducer,
    instructorClasses : classesReducer,
    instructorActivityLogs : activityLogReducer,
    instructorCommunity : communityReducer,
    instructorCourse : courseReducer,
    instructorHelp : helpReducer,
    instructorPayments : paymentReducer,
    instructorTickets : ticketReducer,
    instructorDashBoard : dashboardReducer,
    studentCommunity : studentCommunityReducer
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
