import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import StarIcon from "@mui/icons-material/Star";
import { getImageUrl } from "utils/common/imageUtlils";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { imagePlaceholder } from "utils/placeholders";

const isCompleted = (endDate) => {
  if (!endDate) return false;
  const currentDate = new Date();
  return new Date(endDate) < currentDate;
};

const CourseFrontPage = ({ Course }) => {
  const courses = Array.isArray(Course?.batches) ? Course.batches : [];
  const currentCourses = courses.filter((course) => !isCompleted(course?.end_date));
  
  // If batches array is empty, we'll use the Course itself as a current course
  const shouldShowMainCourse = courses.length === 0 && Course;
  const completedCourses = courses.filter((course) => isCompleted(course?.end_date));

  const imageUrl = Course?.image ? getImageUrl(Course.image) : imagePlaceholder;

  const renderCourseCard = (course, isMainCourse = false) => {
    const courseData = isMainCourse ? Course : course;
    return (
      <Box
        key={isMainCourse ? Course?._id : course.id}
        sx={{
          mb: 4,
          p: 3,
          border: "1px solid #eee",
          borderRadius: "10px",
          boxShadow: 2,
          maxWidth: "400px",
          backgroundColor: "#f8f9fa",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 3,
          },
        }}
      >
        <Link to={`/student/courses/${Course?.uuid}`}>
          <img
            src={imageUrl}
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "15px",
              objectFit: "cover",
              opacity: 0.9,
            }}
            alt="course"
          />
        </Link>
        <Typography
          sx={{
            color: "#000",
            fontSize: "18px",
            fontWeight: 700,
            mt: 2,
            mb: 1,
          }}
        >
          {isMainCourse ? Course?.course_name : course.course_name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", fontSize: "14px", mb: 1 }}>
          {courseData?.description || "Comprehensive course covering all fundamental concepts"}
        </Typography>
        
        
        {isMainCourse && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <LayersOutlinedIcon sx={{ color: "#5611B1" }} />
              <Typography>{courseData?.coursemodules?.length || 0} modules</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <TimerOutlinedIcon sx={{ color: "#5611B1" }} />
              <Typography>{courseData?.duration}</Typography>
            </Box>
          </Box>
        )}
        
        {!isMainCourse && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              Completed:
            </Typography>
            <Typography variant="body2" sx={{ color: "#0D6EFD" }}>
              {new Date(course.end_date).toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: "41px 41px 41px 71px", overflowY: "auto", maxHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Typography
          sx={{
            color: "#1A237E",
            fontSize: "24px",
            fontWeight: 900,
            lineHeight: "32px",
            fontFamily: "Arial,sans-serif",
            mb: 3,
          }}
        >
          Course
        </Typography>

        <Box id="course-list">
          {/* Display all current courses */}
          {currentCourses.length > 0 && 
            currentCourses.map((course) => renderCourseCard(course))
          }
          
          {/* Display main course if no batches */}
          {shouldShowMainCourse && renderCourseCard(null, true)}
          
          {/* Display all completed courses */}
          {completedCourses.length > 0 && 
            completedCourses.map((course) => renderCourseCard(course))
          }
          
          {/* Display a message if no courses at all */}
          {currentCourses.length === 0 && !shouldShowMainCourse && completedCourses.length === 0 && (
            <Typography sx={{ mt: 3, textAlign: "center", fontSize: "18px", fontWeight: 600 }}>
              No courses available
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseFrontPage;