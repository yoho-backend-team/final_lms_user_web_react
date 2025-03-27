import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { CourseCardBg } from "utils/images";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import NoteIcon from "assets/icons/noteIcon";
import CertificateIcon from "assets/icons/certificateIcon";
import LanguageIcon from "assets/icons/languageIcon";
import { getImageUrl } from "utils/common/imageUtlils"; 
import CircularProgressWithStudentLabel from "./cirularProgresswitjLabel.js";
import { formatDate } from "utils/formatDate.js";

const CourseStudentDetails = ({ Course }) => {
  const Benefits = [
    {
      icon: <LanguageIcon color="white" />,
      id: "benefit1",
      title: "English & Tamil",
      background: "#5F1AA4",
      shadow: "0px 0px 50px 0px rgba(95, 26, 164, 0.63)",
    },
    {
      icon: <CertificateIcon color="white" padding="17px 41px 10px 40px" />,
      id: "benefit2",
      title: "3 Certificates",
      background: "#0051C8",
      shadow: "0px 0px 50px 0px rgba(0, 81, 200, 0.63)",
    },
    {
      icon: (
        <NoteIcon color="white" fill={"white"} padding="17px 41px 10px 40px" />
      ),
      id: "benefit3",
      title: "Notes",
      background: "#0F8D0D",
      shadow: "0px 0px 50px 0px rgba(15, 141, 13, 0.63)",
    },
  ];

  return (
    <Box sx={{ 
      pr: "60px", 
      height: "100vh", 
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      <Divider orientation="vertical" sx={{ 
        position: "absolute",
        left: "100%",
        top: "10%",
        bottom: 0,
        height: "40%",
        transform: "translateX(-50%)",
        borderRightWidth: 3,
        borderColor: "#e0e0e0" 
      }} />
      <Box sx={{ 
        pr: "90px",
        overflowY: "auto",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        }
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}>
          <Typography
            sx={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 800,
              lineHeight: "24px",
              fontFamily: "Nunito Sans",
            }}
          >
            Course Details
          </Typography>
          
        </Box>
        <Box sx={{ pb: "27px" }}>
          <img
            src={getImageUrl(Course?.image)}
            style={{ width: "363px", height: "160px", borderRadius: "25px" }}
            alt="course"
          />
        </Box>
        <Box sx={{ pb: "12px", display: "flex", gap: "21px" }}>
          <Typography
            sx={{
              color: "#000000",
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: "32px",
              fontFamily: "Nunito Sans"
            }}
          >
            {Course?.course_name}
          </Typography>
          
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            pb: "21px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "10px",
              fontFamily: "Nunito Sans",
              mr: -1
            }}
          >
            By
          </Typography>
          <Typography
            sx={{
              color: "#000080",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "10px",
              fontFamily: "Nunito Sans",
              textTransform: "uppercase",
            }}
          >
            Bharathidasan University{Course?.institute?.institute_name}
          </Typography>
          
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#6C757D",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "16px",
              fontFamily: "Nunito Sans"
            }}
          >
            {Course?.description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "40px", pt: "40px" }}>
          <Box
            sx={{
              border: "1px solid #2A2A2A",
              padding: "10px",
              borderRadius: "7px",
              display: "inline-flex",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "20px",
                fontFamily: "Nunito Sans"
              }}
            >
              Durations:
            </Typography>
            <Typography
              sx={{
                color: "#0051C8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "20px",
                fontFamily: "Nunito Sans"
              }}
            >
              {" "}
              {Course?.duration}
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #2A2A2A",
              padding: "10px",
              borderRadius: "7px",
              display: "inline-flex",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                fontFamily: "Nunito Sans"
              }}
            >
              Type:
            </Typography>
            <Typography
              sx={{
                color: "#0051C8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                fontFamily: "Nunito Sans"
              }}
            >
              {" "}
              {Course?.class_type?.[0]}{" "}
            </Typography>
          </Box>
        </Box>
        {/* Uncomment this section if you want to display benefits */}
        {/* <Box>
          <Box sx={{ pt: "40px", pb: "20px" }}>
            <Typography
              sx={{
                color: "#4B4B4B",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "14px",
              }}
            >
              Benefits
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
            {Benefits?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: item.background,
                  boxShadow: item.shadow,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: '20px',
                  flex: '1 1 30%',
                  minWidth: '200px',
                }}
              >
                <Typography sx={{ padding: "17px 41px 10px 40px" }}>
                  {item.icon}
                </Typography>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "23px",
                    px: "10px",
                    pb: "11px",
                    fontFamily: "Nunito Sans"
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default CourseStudentDetails;