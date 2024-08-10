  import React, { lazy } from "react";
  import { Routes, Route, Navigate, Outlet } from "react-router-dom";
  import Loadable from "components/loadable";
  import MainLayout from "layout/MainLayout";
  import InstructorLayout from "layout/InstructorLayout";
  import {
    checkUserLoggedIn,
    checkUserRole,
  } from "store/atoms/authorized-atom";
  import { Instructor_Role, isAuthenticatedInstructor, isAuthenticatedStudent, role_to_details, role_to_routes} from "lib/constants";
import NotificationList from "views/instructor-pages/notification-page";

  // Auth Pages
  const LoginPage = Loadable(lazy(() => import("views/auth-pages/login-page")))
  const InstructorLogin = Loadable(lazy(() => import("views/auth-pages/login-page/instructorLogin")))


  // Error Pages
  const ErrorPage404 = Loadable(lazy(() => import("views/error-pages/404-page")));

  const StudentHomePage = Loadable(lazy(() => import("views/student-pages/home-page")))
  const StudentActivityLogsPage = Loadable(lazy(() => import("views/student-pages/activity-logs-page")))
  const StudentAttendancesPage = Loadable(lazy(() => import("views/student-pages/attendances-page")))
  const StudentClassesPage = Loadable(lazy(() => import("views/student-pages/classes-page")))
  const StudentCommunityPage = Loadable(lazy(() => import("views/student-pages/community-page")))
  const StudentCoursePage = Loadable(lazy(() => import("views/student-pages/courses-page")))

  const StudentCourseViewPage = Loadable(lazy(() => import("views/student-pages/courses-page/course[id]-page")))
  const StudentHelpCenterPage = Loadable(lazy(() => import("views/student-pages/help-center-page")))
  const StudentTicketsPage = Loadable(lazy(() => import("views/student-pages/tickets-page")))
  const StudentPaymentsPage = Loadable(lazy(() => import("views/student-pages/payments-page")))
  const StudentFaqPage = Loadable(lazy(() => import("views/student-pages/Faq-page")))
  const StudentClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page")))

  const StudentOptionalPayment = Loadable(lazy(() => import("features/student-pages/payments-page/components/Optional/Mainpage")))

  const StudentProfilePage = Loadable(lazy(() => import("views/student-pages/profile-page")))
  const StudentCreateTicketPage = Loadable(lazy(() => import("views/student-pages/create-ticket-page")))
  const StudentTicketViewPage = Loadable(lazy(() => import("views/student-pages/tickets-page")))
  const StudentNotificationList = Loadable(lazy(() => import("views/student-pages/notification-page/index")))


// Instructor Pages
const InstructorHomePage = Loadable(lazy(() => import("views/instructor-pages/home-page")))
const InstructorActivityLogsPage = Loadable(lazy(() => import("views/instructor-pages/activity-logs-page")))
const InstructorAttendancesPage = Loadable(lazy(() => import("views/instructor-pages/attendances-page")))
const InstructorClassesPage = Loadable(lazy(() => import("views/instructor-pages/classes-page")))
const InstructorCommunityPage = Loadable(lazy(() => import("views/instructor-pages/community-page")))
const InstructorCourseListPage = Loadable(lazy(() => import("views/instructor-pages/courses-page/index")))
const InstructorCoursePage = Loadable(lazy(() => import("views/instructor-pages/courses-page/courses-[id]-page/index")))
const InstructorCourseViewPage = Loadable(lazy(() => import("views/instructor-pages/courses-page/courses-[id]-page/Mainpage")))
// const InstructorStudyMaterialsPage = Loadable(lazy(() => import("views/instructor-pages/courses/notes-material-[id]-page/index")))

const InstructorFaqPage = Loadable(lazy(() => import("views/instructor-pages/Faq-page")))
const InstructorHelpCenterPage = Loadable(lazy(() => import("views/instructor-pages/help-center-page")))
const InstructorTicketsPage = Loadable(lazy(() => import("views/instructor-pages/tickets-page")))
const InstructorPaymentsPage = Loadable(lazy(() => import("views/instructor-pages/payments-page")))
const InstructorClassViewPage = Loadable(lazy(() => import("views/instructor-pages/class[id]-page")))
const InstructorProfilePage = Loadable(lazy(() => import("views/instructor-pages/profile-page/index")))
const InstructorCreateTicketPage = Loadable(lazy(() => import("views/student-pages/create-ticket-page")))




  const getRoleFromPath = () => {
    const path = window.location.pathname.split("/")?.[1];
    return role_to_details[path];
  };

  const isLoggedIn = (role) => {
    return checkUserLoggedIn(role);
  };

  const ApplicationRoutes = () => {
    const RequireAuth = ({role,path}) => {
       const current_user = role_to_routes[role]
      if (!isLoggedIn(role)) {
        return <Navigate to={`/${path}/login`} replace />;
      }
      return <Outlet />;
    };

    const RoleBasedRoute = ({ allowedRoles, children }) => {
      if (!allowedRoles.includes(checkUserRole(Instructor_Role))) {
        return <Navigate to={`/${allowedRoles[0]}/login`} replace />;
      }
      return children;
    };

    const LoginRoute = ({children}) => {
      if (isLoggedIn(isAuthenticatedInstructor)) {
        return <Navigate to={`/instructor/home`} replace />;
      }
      return children
    };

    const LoginStudent = ({children}) => {
      if(isLoggedIn(isAuthenticatedStudent)){
         return <Navigate to={"/student/home"} replace/> 
      }
      return children
    }

  return (
    <Routes>
      <Route>
        <Route element={<RequireAuth role={isAuthenticatedStudent} path={"student"} />}>
          <Route
            element={
              // <RoleBasedRoute allowedRoles={["student"]} role={Student_Role} >
                <MainLayout />
            }
          >
            <Route path="/" element={<Navigate to="student/home" />} />
            <Route path="student/home" element={<StudentHomePage />} />
            <Route path="student/notifications" element={<StudentNotificationList />} />
            <Route
              path="student/activity-logs"
              element={<StudentActivityLogsPage />}
            />
            <Route
              path="student/attendances"
              element={<StudentAttendancesPage />}
            />
            <Route path="student/classes" element={<StudentClassesPage />} />
            <Route
              path="student/community"
              element={<StudentCommunityPage />}
            />
            <Route path="student/courses" element={<StudentCourseViewPage />} />
            <Route path="student/course/:id" element={<StudentCoursePage />} />
            <Route
              path="student/help-center"
              element={<StudentHelpCenterPage />}
            />
            <Route path="student/Faq" element={<StudentFaqPage />} />
            <Route path="student/payments" element={<StudentPaymentsPage />} />

            <Route path="student/payment/pay" element={<StudentOptionalPayment />} />
            <Route path="student/tickets" element={<StudentTicketsPage />} />
            <Route
              path="student/tickets/:id"
              element={<StudentTicketViewPage />}
            />
            <Route path="student/profile" element={<StudentProfilePage />} />
            <Route
              path="student/create-ticket"
              element={<StudentCreateTicketPage />}
            />
            <Route
              path="student/class/:id"
              element={<StudentClassViewPage />}
            />
          </Route>
        </Route>
        <Route element={<RequireAuth role={isAuthenticatedInstructor} path={"instructor"} />}>
          <Route
            element={
              // <RoleBasedRoute  allowedRoles={["instructor"]} role={Instructor_Role} >
                <InstructorLayout ></InstructorLayout>
            }
          >
            <Route path="instructor/home" element={<InstructorHomePage />} />
            <Route
              path="instructor/notifications"
              element={<NotificationList />}
            />
            <Route
              path="instructor/activity-logs"
              element={<InstructorActivityLogsPage />}
            />
            <Route
              path="instructor/attendances"
              element={<InstructorAttendancesPage />}
            />
            <Route
              path="instructor/classes"
              element={<InstructorClassesPage />}
            />
            <Route
              path="instructor/class/:id"
              element={<InstructorClassViewPage />}
            />
            <Route
              path="instructor/community"
              element={<InstructorCommunityPage />}
            />
            <Route 
            path="instructor/courses"
            element={<InstructorCourseListPage />}
            />
            <Route
              path="instructor/course/:courseId"
              element={<InstructorCoursePage />}
            />
             <Route
              path="instructor/course/view"
              element={<InstructorCourseViewPage />}
            />
            {/* <Route
              path="instructor/course/notes-materials/:id"
              element={<InstructorStudyMaterialsPage />}
            /> */}
            <Route
              path="instructor/help-center"
              element={<InstructorHelpCenterPage />}
            />
            <Route
              path="instructor/payments"
              element={<InstructorPaymentsPage />}
            />
            <Route
              path="instructor/tickets"
              element={<InstructorTicketsPage />}
            />
            <Route
              path="instructor/profile"
              element={<InstructorProfilePage />}
            />
            <Route path="instructor/Faq" element={<InstructorFaqPage/>}/>
            <Route
              path="instructor/create-ticket"
              element={<InstructorCreateTicketPage />}
            />
          </Route>
        </Route>
        <Route>
          <Route path="/student/login" element={<LoginStudent  children={<LoginPage />} />} />
          <Route path="/instructor/login" element={<LoginRoute children={<InstructorLogin />}  />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

  export default ApplicationRoutes;
