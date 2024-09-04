import { Box, Typography, Tabs, Tab } from "@mui/material";
import { CourseCardBg } from "utils/images";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import NoteIcon from "assets/icons/noteIcon";
import CertificateIcon from "assets/icons/certificateIcon";
import LanguageIcon from "assets/icons/languageIcon";
import { getImageUrl } from "utils/common/imageUtlils";
import { formatDate } from "utils/formatDate.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const CourseFrontPage = ({ Course }) => {
  const [currentTabs, setCurrentTabs] = useState("1");

  const tabs_list = [
    { id: "1", title: "Current Course" },
    { id: "2", title: "Completed" },
  ];

  return (
    <Box sx={{ pr: "60px", overflowY: "auto", maxHeight: "100vh", p: 6, m: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Nunito Sans",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: 900,
              lineHeight: "24px",
              p: 4,
              marginTop: -8,
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
              sx={{
                p: 4,
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '14px',
                marginTop: -4,
              }}
              key={tab.id}
              value={tab.id}
              label={tab.title}
            />
          ))}
        </Tabs>
        
        <Box sx={{ pb: "27px", p: 6 }}>
          <Link to="/student/courses/:id">
            <img
              src={getImageUrl(Course?.image)}
              style={{ width: "363px", height: "160px", borderRadius: "25px" }}
              alt="course"
            />
          </Link>
        </Box>

        <Box sx={{ pb: "12px", display: "flex", gap: "21px" }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Nunito Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "32px",
              marginLeft: 7,
              marginTop: -2,
            }}
          >
            {Course?.course_name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "20px", alignItems: "center", pb: "21px" }}>
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "10px",
              marginLeft: 7,
            }}
          >
            By Rajalakshmi Institute
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
              {Course.duration} Hrs
            </span>
          </Typography>
        </Box>

        
        {currentTabs === "1" && (
          <Box>
            <Typography>Current Course Content</Typography>
          </Box>
        )}

        {currentTabs === "2" && (
          <Box>
            <Typography>Completed Courses Content</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CourseFrontPage;
