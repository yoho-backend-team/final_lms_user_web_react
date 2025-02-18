import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import StarIcon from "@mui/icons-material/Star"; // Added StarIcon import
import { getImageUrl } from "utils/common/imageUtlils";
import Joyride from "react-joyride";

const isCompleted = (endDate) => {
  const currentDate = new Date();
  return new Date(endDate) < currentDate;
};

const CourseFrontPage = ({ Course }) => {
  const [currentTabs, setCurrentTabs] = useState("1");
  const [tourActive, setTourActive] = useState(true);

  const courses = Array.isArray(Course?.batches) ? Course.batches : [];
  const currentCourses = courses.filter((course) => !isCompleted(course?.end_date));
  const completedCourses = courses.filter((course) => isCompleted(course?.end_date));

  const tabs_list = [
    { id: "1", title: "Current Course", disabled: currentCourses.length === 0 },
    { id: "2", title: "Completed", disabled: completedCourses.length === 0 },
  ];

  const imageUrl = getImageUrl(Course?.image);

  const steps = [
    {
      target: "body",
      content: "This is the course  section where you can find the course name.",
      disableBeacon:true,
      placement: "center",
    },
    {
      target: "#tabs-section",
      content: "Use these tabs to switch between current and completed courses.",
      disableBeacon:true,
    },
    {
      target: "#course-list",
      content: "Here are your available courses. Click on one to view details.",
      disableBeacon:true,
    },
  ];

  return (
    <Box sx={{ p: "41px 41px 41px 71px", overflowY: "auto", maxHeight: "100vh" }}>
      <Joyride steps={steps} 
      continuous={true} 
      showProgress={true} 
      showSkipButton={true}
      disableBeacon
      disableScrolling
       run={tourActive} 
       styles={{ options: { zIndex: 10000 } }}/>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Typography
          sx={{
            color: "#1A237E",
            fontSize: "24px",
            fontWeight: 900,
            lineHeight: "32px",
            fontFamily: "Arial,sans-serif",
          }}
        >
          Course
        </Typography>
        
        <Tabs id="tabs-section"
          value={currentTabs}
          onChange={(e, value) => setCurrentTabs(value)}
          indicatorColor="primary"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#0D6EFD" },
            "& .MuiTab-root": { color: "#000000" },
            "& .Mui-selected": { color: "#0D6EFD" },
          }}
        >
          {tabs_list.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.title}
              sx={{
                p: "20px",
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 500,
              }}
            />
          ))}
        </Tabs>

        <Box  id="course-list" sx={{ pt: "30px" }}>
          {currentTabs === "1" ? (
            currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <Box 
                  key={course.id}
                  sx={{
                    mb: 4,
                    p: 3,
                    border: "1px solid #eee",
                    borderRadius: "10px",
                    boxShadow: 2,
                    maxWidth: "400px"
                  }}
                >
                  <Link to={`/student/courses/${Course?.uuid}`}>
                    <img
                      src={imageUrl}
                      style={{ 
                        width: "100%", 
                        height: "160px", 
                        borderRadius: "15px",
                        objectFit: "cover" 
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
                      mb: 1
                    }}
                  >
                    {course.course_name}
                  </Typography>
                  {/* Added description */}
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', mb: 1 }}>
                    {Course?.description || "Comprehensive course covering all fundamental concepts"}
                  </Typography>
                  {/* Added star rating */}
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <StarIcon key={index} sx={{ color: '#ffc107', fontSize: '20px' }} />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                    <Typography variant="body2">By LMS</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <UpdateIcon fontSize="small" />
                      <Typography variant="body2">
                        {course.duration} Hrs
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box 
                sx={{
                  mb: 4,
                  p: 3,
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  boxShadow: 2,
                  maxWidth: "400px",
                  backgroundColor: "#f0f0f0"
                }}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.PMBiSa-JBIhSrPqckRRxyQHaEK?w=310&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  style={{ 
                    width: "100%", 
                    height: "160px", 
                    borderRadius: "15px",
                    objectFit: "cover" 
                  }}
                  alt="dummy course"
                />
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "18px",
                    fontWeight: 700,
                    mt: 2,
                    mb: 1
                  }}
                >
                  Course Title
                </Typography>
                {/* Added description */}
                <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', mb: 1 }}>
                  Comprehensive course covering all fundamental concepts
                </Typography>
                {/* Added star rating */}
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <StarIcon key={index} sx={{ color: '#ffc107', fontSize: '20px' }} />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                  <Typography variant="body2">By LMS</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UpdateIcon fontSize="small" />
                    <Typography variant="body2">
                      10 Hrs
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ mt: 3 }}>No current courses available</Typography>
              </Box>
            )
          ) : completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Box
                key={course.id}
                sx={{
                  mb: 4,
                  p: 3,
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  boxShadow: 2,
                  maxWidth: "400px",
                  backgroundColor: "#f8f9fa"
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
                      opacity: 0.8
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
                    mb: 1
                  }}
                >
                  {course.course_name}
                </Typography>
                {/* Added description */}
                <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', mb: 1 }}>
                  {Course?.description || "Comprehensive course covering all fundamental concepts"}
                </Typography>
                {/* Added star rating */}
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <StarIcon key={index} sx={{ color: '#ffc107', fontSize: '20px' }} />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                  <Typography variant="body2">By LMS</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UpdateIcon fontSize="small" />
                    <Typography variant="body2">
                      {course.duration} Hrs
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    Completed:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#0D6EFD" }}>
                    {new Date(course.end_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography sx={{ mt: 3 }}>No completed courses available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseFrontPage;