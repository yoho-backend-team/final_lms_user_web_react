import { Box, Tabs, Tab, Typography, Button, IconButton } from "@mui/material"; // Added IconButton here
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import About from "./section/About";
import { useTabResponsive } from "utils/tabResponsive";
import EditIcon from "assets/icons/editIcon";
import CourseAndNotesStudentPage from "./section/course&Notes";
import SingleCourseStudentView from "./section/CourseViewPage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CourseStudentViewPage = ({ Course }) => {
  const { tabView } = useTabResponsive();
  const [currentTab, setCurrentTab] = useState("1");
  const [courseView, setCourseView] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  
  const navigate = useNavigate(); // Initialize navigate

  const tabs_list = [
    { id: "1", title: "About" },
    { id: "2", title: "Class/ Notes & Materials" },
  ];

  const openCourseView = (class_details, id) => {
    setCourseView(true);
    setSelectedClass(class_details);
    setSelectedClassId(id);
  };

  const closeCourseView = () => { 
    setCourseView(false);
    setSelectedClass(null);
    setSelectedClassId(null);
  };

  console.log(selectedClassId, "selectedClassId");

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", backgroundColor: "#f4f5f7" }}>
      <Box sx={{ pl: "40px", pt: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "inline-flex", gap: "30px", alignItems: "center" }}>
            {!courseView ? (
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
            ) : (
              <ArrowBack
                sx={{ color: "#1A237E", cursor: "pointer", fontSize: "28px" }}
                onClick={closeCourseView}
              />
            )}
          </Box>
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: tabView ? "end" : "center",
                alignItems: "center",
              }}
            >
              <Tabs
                value={currentTab}
                onChange={(e, value) => setCurrentTab(value)}
                indicatorColor="primary"
                sx={{
                  "&.MuiTabs-root:not(.MuiTabs-vertical)": {
                    borderBottom: 0,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#5611B1",
                  },
                  "& .MuiTab-root": {
                    color: "#6A1B9A", 
                    fontSize: "18px",  
                    fontWeight: 700,  
                    fontFamily: "Roboto, sans-serif",
                  },
                  "& .Mui-selected": {
                    color: "#1A237E",
                  },
                }}
              >
                {tabs_list.map((tab) => (
                  <Tab
                    sx={{
                      fontSize: "16px",
                      lineHeight: "14px",
                      fontWeight: 500,
                      color: "#0D6EFD",
                      fontFamily: "Poppins",
                      lineHeight: "14px"
                    }}
                    key={tab.id}
                    value={tab.id}
                    label={tab.title}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
          <Box sx={{ pr: "40px", display: tabView && "none" }}>
            {/* Additional content can go here */}
          </Box>
        </Box>
        {currentTab === "1" && <About Course={Course} />}
        {currentTab === "2" && !courseView && (
          <CourseAndNotesStudentPage 
            Course={Course}
            openCourseView={openCourseView}
            closeCourseView={closeCourseView}
            selectedClass={selectedClass}
          />
        )}
        {courseView && <SingleCourseStudentView Course={selectedClass} selectedClassId={selectedClassId} />}
      </Box>
    </Box>
  );
};

export default CourseStudentViewPage;