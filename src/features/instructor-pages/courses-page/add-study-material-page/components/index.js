import { Box, IconButton, Typography } from "@mui/material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { useNavigate, useLocation } from "react-router-dom";
import UploadNotes from "./forms/uploadNotes";
import UploadStudyMaterials from "./forms/uploadStudyMaterial";
import UploadVideos from "./forms/uploadVideos";
import { useState, useEffect } from "react";

const AddStudyMaterialsPage = ({ Course, getCourseDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentSection, setCurrentSection] = useState(queryParams.get("section") || "videos");

    useEffect(() => {
      const newSection = queryParams.get("section");
      if (newSection && newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    }, [location.search]); 

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    navigate(`?section=${section}`);
  };

  return (
    <Box sx={{ overflow: "auto", padding: "20px" }}>
      <Box sx={{ padding: "20px", borderRadius: "8px"}}>
        <Box sx={{ display: "flex", alignItems: "center", mb: "5px" }}>
          <Typography variant="h6" sx={{ flex: 1 }}>Add Notes & Materials</Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <IconButton
              onClick={() => handleSectionChange("videos")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: currentSection === "videos" ? "#5611B1" : "gray",
                fontSize: "24px",
                backgroundColor: "transparent", 
                "&:hover": {
                  backgroundColor: "transparent", 
                },
                "&:focus": {
                  backgroundColor: "transparent", 
                },
                "&:active": {
                  backgroundColor: "transparent", 
                },
              }}
            >
              <VideoLibraryIcon />
              <Typography variant="caption" sx={{ color: "inherit"}} >Videos</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleSectionChange("materials")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: currentSection === "materials" ? "#5611B1" : "gray",
                fontSize: "24px",
                backgroundColor: "transparent", 
                "&:hover": {
                  backgroundColor: "transparent", 
                },
                "&:focus": {
                  backgroundColor: "transparent", 
                },
                "&:active": {
                  backgroundColor: "transparent", 
                },
              }}
            >
              <FolderCopyIcon />
              <Typography variant="caption" sx={{ color: "inherit"}} >Study Materials</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleSectionChange("notes")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: currentSection === "notes" ? "#5611B1" : "gray",
                fontSize: "24px",
                backgroundColor: "transparent", 
                "&:hover": {
                  backgroundColor: "transparent", 
                },
                "&:focus": {
                  backgroundColor: "transparent", 
                },
                "&:active": {
                  backgroundColor: "transparent", 
                },
              }}
            >
              <DescriptionIcon />
              <Typography variant="caption" sx={{ color: "inherit" }} >Notes</Typography>
            </IconButton>
          </Box>
        </Box>
        <Box>
          {currentSection === "videos" && <UploadVideos />}
          {currentSection === "materials" && <UploadStudyMaterials StudyMaterials={Course?.studymaterials} getCourseDetails={getCourseDetails} course={Course?._id} />}
          {currentSection === "notes" && <UploadNotes Notes={Course?.notes} getCourseDetails={getCourseDetails} course={Course?._id} />}
        </Box>
      </Box>
    </Box>
  );
};

export default AddStudyMaterialsPage;
