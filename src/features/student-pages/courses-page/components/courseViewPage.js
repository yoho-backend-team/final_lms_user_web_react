import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import About from "./section/About";
import { useTabResponsive } from "utils/tabResponsive";
import EditIcon from "assets/icons/editIcon";
import CourseAndNotesStudentPage from "./section/course&Notes";
import SingleCourseStudentView from "./section/CourseViewPage";

const CourseStudentViewPage = ({ Course }) => {
  const { tabView } = useTabResponsive();
  const [currentTab, setCurrentTab] = useState("1");
  const [courseView, setCourseView] = useState(false);
  const [selectedClass,setSelectedClass] = useState(null)
  const [selectedClassId,setSelectedClassId] = useState(null)

  const tabs_list = [
    { id: "1", title: "About" },
    { id: "2", title: "Class/ Notes & Materials" },

  ];

  const openCourseView = (class_details,id) => {
    setCourseView(true);
    setSelectedClass(class_details)
    setSelectedClassId(id)
  };
  const closeCourseView = () => { 
    setCourseView(false);
    setSelectedClass(null)
    setSelectedClassId(null)
  };

  console.log(selectedClassId,"selectedClassId")

  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
      <Box sx={{ pl: "40px", pt: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "inline-flex", gap: "30px", alignItems: "center" }}
          >
            {!courseView ? (
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: 800,
                  lineHeight: "24px",
                }}
              >
                Course
              </Typography>
            ) : (
              <ArrowBack
                sx={{ color: "black", cursor: "pointer" }}
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
                    color: "#000000",
                  },
                  "& .Mui-selected": {
                    color: "#5611B1",
                  },
                }}
              >
                {tabs_list.map((tab) => (
                  <Tab
                    sx={{
                      fontSize: "16px",
                      lineHeight: "14px",
                      fontWeight: 500,
                      color:"#0D6EFD",
                      fontFamily:"Poppins",
                      lineHeight:"14px"
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
            
          </Box>
        </Box>
        {currentTab === "1" && <About Course={Course} />}
        {currentTab === "2" && !courseView &&  (
          <CourseAndNotesStudentPage Course={Course}
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
