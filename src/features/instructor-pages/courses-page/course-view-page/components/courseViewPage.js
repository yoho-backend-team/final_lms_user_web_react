import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./Tabs/About";
import SingleCourseView from "./Tabs/CourseViewPage";
import { useTabResponsive } from "utils/tabResponsive";
import EditIcon from "assets/icons/editIcon";
import BatchClassListViewPage from "../../components/classListView";
import BatchesPage from "./Tabs/Batches";
import StudyMaterialPage from "../notes-material-[id]-page";


const CourseViewPage = ({ Course, handleBack, getCourseDetails }) => {
  const { tabView } = useTabResponsive();
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const [currentTab, setCurrentTab] = useState( queryParams.get("tab") || "1");
  const [courseView, setCourseView] = useState(false);
  const [selectedClass,setSelectedClass] = useState(null)
  const [selectedBatch,setSelectedBatch] = useState(null)
  const [selectedClassId,setSelectedClassId] = useState(null)

  const openCourseView = (class_details,id) => {
    setCourseView(true);
    setSelectedClass(class_details)
    setSelectedClassId(id)
  };
  const closeCourseView = () => {
    setCourseView(false);
    setSelectedClass(null)
    setSelectedClassId(null)
    setSelectedBatch(null)
    handleBack()
  };

  useEffect(() => {
    const searchParams = queryParams.get("tab")
    if( searchParams && searchParams!==currentTab ){
      setCurrentTab(searchParams)
    }
    },[location.search])

  const handleTabChange = (e,value) => {
      setCurrentTab(value)
      queryParams.set("tab",value)
      navigate(`?${queryParams}`)
  } 

  const handleBack3 = () => {
     if(selectedBatch){
        if(selectedClass){
          setCourseView(false)
         return  setSelectedClass(null)
        }
        setSelectedBatch(null)
     }else{
      navigate(-1)
     }
  }

  const getTabContent = () => {
    if (selectedClass) {
      return "Class Details";
    }
  
    if (selectedBatch) {
      return "Classes";
    }
  
    switch (currentTab) {
      case "1":
        return "Course";
      case "2":
        return "Notes & Material";
      default:
        return "Batches";
    }
  };  


  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
      <Box sx={{ pl: "40px", pt: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "inline-flex", gap: "30px", alignItems: "center" }}
          >
              <ArrowBack
                sx={{ color: "black", cursor: "pointer" }}
                onClick={currentTab === "3" ? handleBack3 : closeCourseView}
              />
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: 800,
                  lineHeight: "24px",
                }}
              >
                 { getTabContent()}
              </Typography>
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
                onChange={(e, value) => handleTabChange(e,value)}
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
                <Tab value={"1"} label={"About"} sx={{  fontSize: "16px",  lineHeight: "14px", fontWeight: 500}} />
                <Tab value={"2"} label={"Notes & Materials"} sx={{  fontSize: "16px",  lineHeight: "14px", fontWeight: 500 }} />
                <Tab value={"3"} label={"Batches"} sx={{  fontSize: "16px",  lineHeight: "14px", fontWeight: 500 }} />
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
                  display : "none",
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
        {currentTab === "1" && <About Course={Course}  />}
        {currentTab === "2" && !courseView && (
          <StudyMaterialPage 
          course={Course}
          getCourseDetails={getCourseDetails}
          />
        )}
        { currentTab === "3" &&  !selectedBatch &&
          <BatchesPage 
          openCourseView={openCourseView}
          closeCourseView={closeCourseView}
          course={Course}
          setSelectedBatch={setSelectedBatch}
          />
        }
        {courseView && <SingleCourseView selectedClass={selectedClass} selectedClassId={selectedClassId} />}
        {selectedBatch && !selectedClass && <BatchClassListViewPage classes={selectedBatch?.classes} openCourseView={openCourseView} closeCourseView={closeCourseView} />}
      </Box>
    </Box>
  );
};

export default CourseViewPage;
