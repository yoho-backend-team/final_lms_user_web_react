// modulesData.js

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpinner } from "utils/spinner"; // Assuming you have a spinner utility
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications
import { selectStudentCourse } from "../../redux/selectors";
import getAndUpdateCourseDetails from "../../redux/thunks";

const getModulesData = () => {
  const [modules, setModules] = useState([]);
  const course = useSelector(selectStudentCourse);
  const { showSpinner, hideSpinner } = useSpinner();

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
    const fetchData = async () => {
      const data = {};
      try {
        showSpinner();
        await dispatch(getAndUpdateCourseDetails(data));
        // Once course details are fetched, construct modules array
        const updatedModules = [
          {
            id: 1,
            title: course?.course_name || "Default Course Title",
            progress: "97%",
            notes: 2,
            videos: 32,
            style: {
              card: "120deg, #0068FF 2.28%, #141BC4 100%",
              color: "#FFFFFF",
              background: "#2E80F9",
            },
          },
          // Add other modules as needed
        ];
        setModules(updatedModules);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        hideSpinner();
      }
    };

    fetchData();
  }, [dispatch, course, showSpinner, hideSpinner]);

  return modules;
};

export default getModulesData;
