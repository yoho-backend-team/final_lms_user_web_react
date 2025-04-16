import { Box, Typography, Chip, Paper, Grid } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { getImageUrl } from "utils/common/imageUtlils";
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
      <Paper
        key={isMainCourse ? Course?._id : course.id}
        elevation={2}
        sx={{
          mb: 4,
          overflow: "hidden",
          borderRadius: "16px",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
          },
          maxWidth: "400px",
          bgcolor: "#ffffff",
        }}
      >
        <Box position="relative">
          <Link to={`/student/courses/${Course?.uuid}`}>
            <img
              src={imageUrl}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
              alt="course"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                padding: "15px",
              }}
            >
              {isMainCourse ? (
                <Chip 
                  label="Main Course" 
                  size="small" 
                  sx={{ 
                    bgcolor: "#5611B1", 
                    color: "white",
                    fontWeight: "600",
                  }} 
                />
              ) : isCompleted(course?.end_date) ? (
                <Chip 
                  label="Completed" 
                  size="small" 
                  sx={{ 
                    bgcolor: "#4caf50", 
                    color: "white",
                    fontWeight: "600",
                  }} 
                />
              ) : (
                <Chip 
                  label="Active" 
                  size="small" 
                  sx={{ 
                    bgcolor: "#0D6EFD", 
                    color: "white",
                    fontWeight: "600",
                  }} 
                />
              )}
            </Box>
          </Link>
        </Box>
        
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              color: "#1A237E",
              fontSize: "18px",
              fontWeight: 700,
              mb: 1.5,
              lineHeight: 1.2,
              height: "45px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {isMainCourse ? Course?.course_name : course.course_name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#666", 
              fontSize: "14px", 
              mb: 2,
              height: "60px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {courseData?.description || "Comprehensive course covering all fundamental concepts"}
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 1.5,
            mt: 2,
            pt: 2,
            borderTop: "1px solid #eee"
          }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <LayersOutlinedIcon sx={{ color: "#5611B1", fontSize: "18px" }} />
                  <Typography variant="body2" fontWeight="500">
                    {courseData?.coursemodules?.length || 0} modules
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <TimerOutlinedIcon sx={{ color: "#5611B1", fontSize: "18px" }} />
                  <Typography variant="body2" fontWeight="500">
                    {courseData?.duration || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {!isMainCourse && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <CalendarTodayIcon sx={{ color: "#5611B1", fontSize: "18px" }} />
                <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "500" }}>
                  {isCompleted(course?.end_date) ? "Completed on: " : "Ends on: "}
                  <span style={{ color: "#0D6EFD" }}>
                    {new Date(course.end_date).toLocaleDateString()}
                  </span>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    );
  };

  return (
    <Box 
      sx={{ 
        p: { xs: "20px", sm: "30px", md: "41px 41px 41px 71px" }, 
        overflowY: "auto", 
        maxHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", pr: { xs: "20px", sm: "60px", md: "90px" } }}>
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 4,
            pb: 2,
            borderBottom: "2px solid #f0f0f0"
          }}
        >
          <SchoolIcon 
            sx={{ 
              color: "#5611B1", 
              fontSize: "32px", 
              mr: 1.5,
              backgroundColor: "rgba(86, 17, 177, 0.1)",
              p: 1,
              borderRadius: "12px"
            }} 
          />
          <Typography
            sx={{
              color: "#1A237E",
              fontSize: "24px",
              fontWeight: 900,
              lineHeight: "32px",
              fontFamily: "Arial,sans-serif",
            }}
          >
            Courses
          </Typography>
        </Box>

        <Grid container spacing={3} id="course-list">
          {/* Display all current courses */}
          {currentCourses.length > 0 && 
            currentCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                {renderCourseCard(course)}
              </Grid>
            ))
          }
          
          {/* Display main course if no batches */}
          {shouldShowMainCourse && (
            <Grid item xs={12} sm={6} md={4}>
              {renderCourseCard(null, true)}
            </Grid>
          )}
          
          {/* Display all completed courses */}
          {completedCourses.length > 0 && 
            completedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                {renderCourseCard(course)}
              </Grid>
            ))
          }
          
          {/* Display a message if no courses at all */}
          {currentCourses.length === 0 && !shouldShowMainCourse && completedCourses.length === 0 && (
            <Grid item xs={12}>
              <Box 
                sx={{
                  mt: 3, 
                  textAlign: "center", 
                  p: 5, 
                  bgcolor: "#fff", 
                  borderRadius: "16px", 
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                }}
              >
                <SchoolIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#666" }}>
                  No courses available
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseFrontPage;