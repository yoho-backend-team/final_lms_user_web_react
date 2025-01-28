import { Box, Typography, Tabs, Tab, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getImageUrl } from "utils/common/imageUtlils";

// Utility function to determine if a course is completed based on the end date
const isCompleted = (endDate) => {
  const currentDate = new Date();
  return new Date(endDate) < currentDate;
};

const CourseFrontPage = ({ Course }) => {
  const [currentTabs, setCurrentTabs] = useState("1");
  const navigate = useNavigate();

  const courses = Array.isArray(Course?.batches) ? Course.batches : [];
  const currentCourses = courses.filter((course) => !isCompleted(course?.end_date));
  const completedCourses = courses.filter((course) => isCompleted(course?.end_date));

  const tabs_list = [
    { id: "1", title: "Current Course", disabled: currentCourses.length === 0 },
    { id: "2", title: "Completed", disabled: completedCourses.length === 0 },
  ];

  
  const imageUrl = getImageUrl(Course?.image);

  return (
    <Box sx={{ p: "41px 41px 41px 71px", overflowY: "auto", maxHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Box sx={{ display: "flex", alignItems: 'center', pb: "20px" }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{
              color: "#333333", 
              fontFamily: "Roboto", 
              fontSize: "18px", 
              fontWeight: 700,
              lineHeight: "28px", 
              textAlign: "center", 
            }}
          >
            Course List & Details
          </Typography>
        </Box>
        <Tabs
          value={currentTabs}
          onChange={(e, value) => setCurrentTabs(value)}
          indicatorColor="primary"
          sx={{
            "&.MuiTabs-root:not(.MuiTabs-vertical)": {
              borderBottom: 0,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0D6EFD",
            },
            "& .MuiTab-root": {
              color: "#000000",
            },
            "& .Mui-selected": {
              color: "#0D6EFD",
            },
          }}
        >
          {tabs_list.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.title}
              // disabled={tab.disabled}
              sx={{
                p: "20px",
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '14px',
              }}
            />
          ))}
        </Tabs>
        
        {/* Conditionally render image based on the selected tab */}
        {currentTabs === "1" && currentCourses.length > 0 && (
          <Box sx={{ pb: "17px", pt: "30px"}}>
            <Link to={`/student/courses/${Course?.uuid}`}>
            <img
              src={imageUrl}
              style={{ width: "363px", height: "160px", borderRadius: "25px" }}
              alt="current course"
            />
            </Link>
          </Box>
        )}
        
        {currentTabs === "2" && completedCourses.length > 0 && (
          <Box sx={{ pb: "17px", pt: "30px" }}>
            <Link to={`/student/courses/${Course?.uuid}`}>
            <img
              src={imageUrl}
              style={{ width: "363px", height: "160px", borderRadius: "25px" }}
              alt="completed course"
            />
            </Link>
          </Box>
        )}

        <Box sx={{ pb: "17px", pt: "30px" }}>
          {currentTabs === "1" ? (
            currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <Box key={course.id} sx={{ display: "flex", gap: "21px", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "32px",
                      textAlign: "right",
                    }}
                  >
                    {course.course_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "10px",
                      }}
                    >
                      By
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: "10px",
                        marginLeft: 7,
                      }}
                    >
                      LMS
                    </Typography>
                    <Typography sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <UpdateIcon sx={{ color: "black" }} />
                      <span
                        style={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "10px",
                        }}
                      >
                        {course.duration} Hrs
                      </span>
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No current courses available.</Typography>
            )
          ) : completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Box key={course.id} sx={{ display: "flex", gap: "21px", flexDirection: "column" }}>
                <Typography
                  sx={{
                    color: "#000000",
                    fontFamily: "Nunito Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "32px",
                    textAlign: "left",
                  }}
                >
                  {course.course_name}
                </Typography>
                <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "10px",
                    }}
                  >
                    By
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "10px",
                      marginLeft: 3,
                    }}
                  >
                    LMS
                  </Typography>
                  <Typography sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <UpdateIcon sx={{ color: "black" }} />
                    <span
                      style={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "10px",
                      }}
                    >
                      {course.duration} Hrs
                    </span>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: 700,
                      lineHeight: "9.841px",
                      textAlign: "left",
                      pr: 1,
                    }}
                  >
                    Completed Date :
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0D6EFD",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: 700,
                      lineHeight: "9.841px",
                      textAlign: "left",
                    }}
                  >
                    {course.end_date}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No completed courses available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseFrontPage;
