import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { lazy } from 'react';
import Loadable from 'components/loadable';
import MainLayout from "layout/MainLayout";

// Auth Pages
const LoginPage = Loadable(lazy(() => import("views/auth-pages/login-page")));

// Error Pages
const ErrorPage404 = Loadable(lazy(() => import("views/error-pages/404-page")));

// Student Pages
const StudentHomePage = Loadable(
  lazy(() => import("views/student-pages/home-page"))
);
const StudentActivityLogsPage = Loadable(
  lazy(() => import("views/student-pages/activity-logs-page"))
);
const StudentAttendancesPage = Loadable(
  lazy(() => import("views/student-pages/attendances-page"))
);
const StudentClassesPage = Loadable(
  lazy(() => import("views/student-pages/classes-page"))
);
const StudentCommunityPage = Loadable(
  lazy(() => import("views/student-pages/community-page"))
);
const StudentCoursePage = Loadable(
  lazy(() => import("views/student-pages/courses-page"))
);
const StudentHelpCenterPage = Loadable(
  lazy(() => import("views/student-pages/help-center-page"))
);
const StudentTicketsPage = Loadable(
  lazy(() => import("views/student-pages/tickets-page"))
);
const StudentPaymentsPage = Loadable(
  lazy(() => import("views/student-pages/payments-page"))
);
const StudentClassViewPage = Loadable(
  lazy(() => import("views/student-pages/class[id]-page"))
);
const StudentProfilePage = Loadable(
  lazy(() => import("views/student-pages/profile-page"))
);
const StudentCreateTicketPage = Loadable(
  lazy(() => import("views/student-pages/create-ticket-page"))
);

// Instructor Pages
const InstructorHomePage = Loadable(
  lazy(() => import("views/instructor-pages/home-page"))
);
const InstructorActivityLogsPage = Loadable(
  lazy(() => import("views/instructor-pages/activity-logs-page"))
);
const InstructorAttendancesPage = Loadable(
  lazy(() => import("views/instructor-pages/attendances-page"))
);
const InstructorClassesPage = Loadable(
  lazy(() => import("views/instructor-pages/classes-page"))
);
const InstructorCommunityPage = Loadable(
  lazy(() => import("views/instructor-pages/community-page"))
);
const InstructorCoursePage = Loadable(
  lazy(() => import("views/instructor-pages/courses-page"))
);
const InstructorHelpCenterPage = Loadable(
  lazy(() => import("views/instructor-pages/help-center-page"))
);
const InstructorTicketsPage = Loadable(
  lazy(() => import("views/instructor-pages/tickets-page"))
);
const InstructorPaymentsPage = Loadable(
  lazy(() => import("views/instructor-pages/payments-page"))
);
const InstructorClassViewPage = Loadable(
  lazy(() => import("views/instructor-pages/class[id]-page"))
);
const InstructorProfilePage = Loadable(
  lazy(() => import("views/student-pages/profile-page"))
);
const InstructorCreateTicketPage = Loadable(
  lazy(() => import("views/student-pages/create-ticket-page"))
);

const ApplicationRoutes = () => {
  const auth = {
    isLoggedIn: true,
    role: "student",
  };

  const RequireAuth = () => {
    if (!auth?.isLoggedIn) {
      return <Navigate to="/login" replace />;
    } else {
      return <Outlet />;
    }
  };

  const StudentRoute = () => {
    if (auth.role === "student") {
      return <Outlet />;
    } else {
      return <Navigate to="/instructor" replace />;
    }
  };

  const InstructorRoute = () => {
    if (auth.role === "instructor") {
      return <Outlet />;
    } else {
      return <Navigate to="/student" replace />;
    }
  };
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route element={<StudentRoute />}>
            <Route path="/" element={<Navigate to={"student/home"} />} />
            <Route path="student" element={<StudentHomePage />} />
            <Route path="student/home" element={<StudentHomePage />} />
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
              path="student/class/:id"
              element={<StudentClassViewPage />}
            />
            <Route
              path="student/community"
              element={<StudentCommunityPage />}
            />
            <Route path="student/course" element={<StudentCoursePage />} />
            <Route
              path="student/help-center"
              element={<StudentHelpCenterPage />}
            />
            <Route path="student/payments" element={<StudentPaymentsPage />} />
            <Route path="student/tickets" element={<StudentTicketsPage />} />
            <Route path="student/profile" element={<StudentProfilePage />} />
            <Route
              path="student/create-ticket"
              element={<StudentCreateTicketPage />}
            />
          </Route>
          <Route element={<InstructorRoute />}>
            <Route path="/" element={<Navigate to={"instructor/home"} />} />
            <Route path="instructor" element={<InstructorHomePage />} />
            <Route path="instructor/home" element={<InstructorHomePage />} />
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
              path="instructor/course"
              element={<InstructorCoursePage />}
            />
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
            <Route
              path="instructor/create-ticket"
              element={<InstructorCreateTicketPage />}
            />
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
