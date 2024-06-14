import React, { lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Loadable from "components/loadable";
import MainLayout from "layout/MainLayout";
import AuthLayout from "layout/AuthLayout";
import InstructorAuthLayout from "layout/InstructorAuthLayout";

// Auth Pages
const LoginPage = Loadable(lazy(() => import("views/auth-pages/login-page")));
const InstructorLogin = Loadable(lazy(()=>import("views/auth-pages/login-page/instructorLogin")))

// Error Pages
const ErrorPage404 = Loadable(lazy(() => import("views/error-pages/404-page")));

// Student Pages
const StudentHomePage = Loadable(lazy(() => import("views/student-pages/home-page")));
const StudentActivityLogsPage = Loadable(lazy(() => import("views/student-pages/activity-logs-page")));
const StudentAttendancesPage = Loadable(lazy(() => import("views/student-pages/attendances-page")));
const StudentClassesPage = Loadable(lazy(() => import("views/student-pages/classes-page")));
const StudentCommunityPage = Loadable(lazy(() => import("views/student-pages/community-page")));
const StudentCoursePage = Loadable(lazy(() => import("views/student-pages/courses-page")));
const StudentHelpCenterPage = Loadable(lazy(() => import("views/student-pages/help-center-page")));
const StudentTicketsPage = Loadable(lazy(() => import("views/student-pages/tickets-page")));
const StudentPaymentsPage = Loadable(lazy(() => import("views/student-pages/payments-page")));

const StudentOfflineUpcomingClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OfflineClasses/UpcomingClasses")));
const StudentOfflineLiveClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OfflineClasses/LiveClass")));
const StudentOfflineCompletedClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OfflineClasses/CompletedClasses")));
const StudentOfflineUpcomingClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OfflineClasses/Upcoming Classes/UpcomingClasses")));
const StudentOfflineLiveClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OfflineClasses/LiveClass/LiveClass")));
const StudentOfflineCompletedClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OfflineClasses/Completed Classes/CompletedClasses")));

const StudentOnlineUpcomingClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OnlineClasses/UpcomingClasses")));
const StudentOnlineLiveClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OnlineClasses/LiveClass")));
const StudentOnlineCompletedClassViewPage = Loadable(lazy(() => import("views/student-pages/class[id]-page/OnlineClasses/CompletedClasses")));
const StudentOnlineUpcomingClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OnlineClasses/Upcoming Classes/UpcomingClasses")));
const StudentOnlineLiveClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OnlineClasses/LiveClass/LiveClass")));
const StudentOnlineCompletedClassesView = Loadable(lazy(() => import("features/student-pages/classes-page/components/Classes/OnlineClasses/Completed Classes/CompletedClasses")));

const StudentProfilePage = Loadable(lazy(() => import("views/student-pages/profile-page")));
const StudentCreateTicketPage = Loadable(lazy(() => import("views/student-pages/create-ticket-page")));
const StudentTicketViewPage = Loadable(lazy(() => import("views/student-pages/tickets-page/ticket[id]-page")));

// Instructor Pages
const InstructorHomePage = Loadable(lazy(() => import("views/instructor-pages/home-page")));
const InstructorActivityLogsPage = Loadable(lazy(() => import("views/instructor-pages/activity-logs-page")));
const InstructorAttendancesPage = Loadable(lazy(() => import("views/instructor-pages/attendances-page")));
const InstructorClassesPage = Loadable(lazy(() => import("views/instructor-pages/classes-page")));
const InstructorCommunityPage = Loadable(lazy(() => import("views/instructor-pages/community-page")));
const InstructorCoursePage = Loadable(lazy(() => import("views/instructor-pages/courses-page")));
const InstructorHelpCenterPage = Loadable(lazy(() => import("views/instructor-pages/help-center-page")));
const InstructorTicketsPage = Loadable(lazy(() => import("views/instructor-pages/tickets-page")));
const InstructorPaymentsPage = Loadable(lazy(() => import("views/instructor-pages/payments-page")));
const InstructorClassViewPage = Loadable(lazy(() => import("views/instructor-pages/class[id]-page")));
const InstructorProfilePage = Loadable(lazy(() => import("views/student-pages/profile-page"))); // This seems like an error; correct import path should be checked
const InstructorCreateTicketPage = Loadable(lazy(() => import("views/student-pages/create-ticket-page"))); // This seems like an error; correct import path should be checked

const ApplicationRoutes = () => {
  const auth = {
    isLoggedIn: true,
    role: "instructor",
  };

  const RequireAuth = () => {
    if (!auth.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };

  const StudentRoute = () => {
    if (auth.role === "student") {
      return <Outlet />;
    }
    return <Navigate to="/instructor" replace />;
  };

  const InstructorRoute = () => {
    if (auth.role === "instructor") {
      return <Outlet />;
    }
    return <Navigate to="/student" replace />;
  };

  const LoginRouter = () => {
    const element = window.location.pathname === "/instructor/login" ? <InstructorLogin /> : <LoginPage />
    return element

  }

  const LoginLayout = () => {
    const element = window.location.pathname === "/instructor/login" ? <InstructorAuthLayout /> : <AuthLayout />
    return element
  }

  return (
    <Routes>
      <Route >
        <Route element={<MainLayout />}>
          <Route >
            <Route path="/" element={<Navigate to="student/home" />} />
            <Route path="student/home" element={<StudentHomePage />} />
            <Route path="student/activity-logs" element={<StudentActivityLogsPage />} />
            <Route path="student/attendances" element={<StudentAttendancesPage />} />
            <Route path="student/classes" element={<StudentClassesPage />} />
            <Route path="student/OfflineUpcomingClass/:id" element={<StudentOfflineUpcomingClassViewPage />} />
            <Route path="student/OfflineLiveClass/:id" element={<StudentOfflineLiveClassViewPage />} />
            <Route path="student/OfflineCompleteClass/:id" element={<StudentOfflineCompletedClassViewPage />} />
            <Route path="student/community" element={<StudentCommunityPage />} />
            <Route path="student/course" element={<StudentCoursePage />} />
            <Route path="student/help-center" element={<StudentHelpCenterPage />} />
            <Route path="student/payments" element={<StudentPaymentsPage />} />
            <Route path="student/OnlineUpcomingClass/:id" element={<StudentOnlineUpcomingClassViewPage />} />
            <Route path="student/OnlineLiveClass/:id" element={<StudentOnlineLiveClassViewPage />} />
            <Route path="student/OnlineCompleteClass/:id" element={<StudentOnlineCompletedClassViewPage />} />
            <Route path="student/tickets" element={<StudentTicketsPage />} />
            <Route path="student/tickets/:id" element={<StudentTicketViewPage />} />
            <Route path="student/profile" element={<StudentProfilePage />} />
            <Route path="student/create-ticket" element={<StudentCreateTicketPage />} />
            <Route path="student/OfflineUpcomingClasses" element={<StudentOfflineUpcomingClassesView />} />
            <Route path="student/OfflineLiveClasses" element={<StudentOfflineLiveClassesView />} />
            <Route path="student/OfflineCompletedClasses" element={<StudentOfflineCompletedClassesView />} />
            <Route path="student/OnlineUpcomingClasses" element={<StudentOnlineUpcomingClassesView />} />
            <Route path="student/OnlineLiveClasses/:id" element={<StudentOnlineLiveClassesView />} />
            <Route path="student/OnlineCompletedClasses/:id" element={<StudentOnlineCompletedClassesView />} />
          </Route>
          <Route>
            <Route path="instructor/home" element={<InstructorHomePage />} />
            <Route path="instructor/activity-logs" element={<InstructorActivityLogsPage />} />
            <Route path="instructor/attendances" element={<InstructorAttendancesPage />} />
            <Route path="instructor/classes" element={<InstructorClassesPage />} />
            <Route path="instructor/class/:id" element={<InstructorClassViewPage />} />
            <Route path="instructor/community" element={<InstructorCommunityPage />} />
            <Route path="instructor/course" element={<InstructorCoursePage />} />
            <Route path="instructor/help-center" element={<InstructorHelpCenterPage />} />
            <Route path="instructor/payments" element={<InstructorPaymentsPage />} />
            <Route path="instructor/tickets" element={<InstructorTicketsPage />} />
            <Route path="instructor/profile" element={<InstructorProfilePage />} />
            <Route path="instructor/create-ticket" element={<InstructorCreateTicketPage />} />
          </Route>
        </Route>
        <Route element={<LoginLayout section={"instructor"} />}>
          <Route path="/login" element={<LoginRouter section={"instructor"} />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
