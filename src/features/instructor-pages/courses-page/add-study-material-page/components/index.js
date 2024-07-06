import { Tabs, Tab, Box } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadNotes from "./forms/uploadNotes";
import UploadStudyMaterials from "./forms/uploadStudyMaterial";
import UploadVideos from "./forms/uploadVideos";

const AddStudyMaterialsPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("1");

  const tabs_list = [
    { id: "1", title: "Videos" },
    { id: "2", title: "Study Materials" },
    { id: "3", title: "Notes" },
  ];

  const formTypes = ["Upload Videos", "Upload Study Materials", "Upload Notes"];

  const handleChange = (e, value) => {
    setCurrentTab(value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "40px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ textAlign: "start", cursor: "pointer" }}
          onClick={handleBack}
        >
          <KeyboardBackspaceOutlinedIcon />
        </Box>
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Tabs
            indicatorColor="secondary"
            value={currentTab}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                color: "#5611B1",
                backgroundColor: "#5611B1",
              },
              "& .Mui-selected": {
                color: "#5611B1",
              },
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "14px",
            }}
          >
            {tabs_list?.map((item) => (
              <Tab key={item.id} value={item.id} label={item.title} />
            ))}
          </Tabs>
        </Box>
        <Box></Box>
      </Box>
      <Box>
        {currentTab === "1" && <UploadVideos />}
        {currentTab === "2" && <UploadStudyMaterials />}
        {currentTab === "3" && <UploadNotes />}
      </Box>
    </Box>
  );
};

export default AddStudyMaterialsPage;
