import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import About from "./sections/About";
import CourseAndNotesPage from "./sections/course&Notes";
import SingleCourseView from "./sections/CourseViewPage";
import { useTabResponsive } from "utils/tabResponsive";
import EditIcon from "assets/icons/editIcon";

const CourseViewPage = ({ Course }) => {
  const { tabView } = useTabResponsive();
  const [currentTab, setCurrentTab] = useState("1");
  const [courseView, setCourseView] = useState(false);

  const tabs_list = [
    { id: "1", title: "About" },
    { id: "2", title: "Class/ Notes & Materials" },
  ];

  const openCourseView = () => {
    setCourseView(true);
  };
  const closeCourseView = () => {
    setCourseView(false);
  };  

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
            {courseView && (
              <Button
                size="small"
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  backgroundColor: "#5611B1",
                  borderRadius: "24px",
                  color: "white",
                  padding: "8px 18px",
                  ":hover": { backgroundColor: "#5611B1" },
                }}
                startIcon={<EditIcon sx={{ color: "white" }} />}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
        {currentTab === "1" && <About Course={Course} />}
        {currentTab === "2" && !courseView && (
          <CourseAndNotesPage
            openCourseView={openCourseView}
            closeCourseView={closeCourseView}
            course={Course}
          />
        )}
        {courseView && <SingleCourseView />}
      </Box>
    </Box>
  );
};

export default CourseViewPage;
