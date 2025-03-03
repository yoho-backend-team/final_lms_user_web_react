import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import getAndUpdateCourseDetails from "features/student-pages/courses-page/redux/thunks";
import { selectStudentCourse } from "features/student-pages/courses-page/redux/selectors";
import CourseStudentLayout from "features/student-pages/courses-page/components/courseLayout";
import CourseStudentViewPage from "features/student-pages/courses-page/components/courseViewPage";
import Joyride from "react-joyride";

const CoursePage = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectStudentCourse);
  const { showSpinner, hideSpinner } = useSpinner();
  const [runTour, setRunTour] = useState(true); // Joyride control

  // Function to fetch course details
  const getCourseDetails = (data) => {
    try {
      showSpinner();
      dispatch(getAndUpdateCourseDetails(data));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    const data = {};
    getCourseDetails(data);
  }, [dispatch]);

  // Ensure Joyride starts only when elements exist
  useEffect(() => {
    const checkElements = setInterval(() => {
      const elementsExist =
        document.querySelector(".course-page-title") &&
        document.querySelector(".course-progress") &&
        document.querySelector(".course-modules") &&
        document.querySelector(".course-notes") &&
        document.querySelector(".about-section") &&
        document.querySelector(".course-video");

      if (elementsExist) {
        clearInterval(checkElements);
        setRunTour(true);
      }
    }, 500);

    return () => clearInterval(checkElements);
  }, []);

  // Define Joyride steps
  const steps = [
    {
      target: ".course-page-title",
      content: "Welcome to your course! Here, you can see all details related to your learning.",
      disableBeacon: true,
    },
    {
      target: ".course-progress",
      content: "This progress bar shows how much of the course you’ve completed.",
      disableBeacon: true,
    },
    {
      target: ".course-modules",
      content: "Here you can find all course chapters and modules. Click to access them.",
      disableBeacon: true,
    },
    {
      target: ".course-notes",
      content: "Need notes? All course-related notes are available here!",
      disableBeacon: true,
    },
    {
      target: ".about-section",
      content: "Check this section for an overview of the course and what you'll learn.",
      disableBeacon: true,
    },
    {
      target: ".course-video",
      content: "This is the main course video. Watch and learn at your own pace.",
      disableBeacon: true,
    },
  ];

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        disableOverlayClose
  spotlightClicks
  
  styles={{ options: { zIndex: 10000 ,
    disableScrolling: true,
  } }}
      />

      <CourseStudentLayout>
        <CourseStudentViewPage Course={course} />
      </CourseStudentLayout>
    </>
  );
};

export default CoursePage;


