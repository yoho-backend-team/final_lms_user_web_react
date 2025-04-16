import React from "react";
import { Box, Typography, Divider } from "@mui/material";
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
      display: "flex",
      flexDirection: "column",
      position: "relative",
      background: "linear-gradient(135deg, #f5f7fa 0%, #f8f9fb 100%)",
    }}>
      <Divider orientation="vertical" sx={{ 
        position: "absolute",
        left: "100%",
        top: "10%",
        bottom: 0,
        height: "60%",
        transform: "translateX(-50%)",
        borderRightWidth: 3,
        borderColor: "#e0e0e0" 
      }} />
      
      <Box sx={{ 
        pr: "60px",
        overflowY: "auto",
        flexGrow: 1,
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        px: "24px",
        py: "30px",
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 81, 200, 0.5)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0, 81, 200, 0.8)',
        }
      }}>
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          pb: "28px",
          alignItems: "center" 
        }}>
          <Typography
            sx={{
              color: "#151515",
              fontSize: "26px",
              fontWeight: 800,
              lineHeight: "1.2",
              fontFamily: "Nunito Sans",
              position: "relative",
              paddingBottom: "12px",
              letterSpacing: "0.02em",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "60px",
                height: "4px",
                backgroundColor: "#0051C8",
                borderRadius: "4px"
              }
            }}
          >
            Course Details
          </Typography>
        </Box>
        
        <Box sx={{ 
          mb: "32px",
          position: "relative",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)"
        }}>
          <Box sx={{
            position: "relative",
            height: "200px",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
              zIndex: 1
            }
          }}>
            <img
              src={getImageUrl(Course?.image)}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
              }}
              alt="course"
            />
          </Box>
        </Box>
        
        <Box sx={{ mb: "16px" }}>
          <Typography
            sx={{
              color: "#151515",
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: "1.3",
              fontFamily: "Nunito Sans",
              mb: "8px"
            }}
          >
            {Course?.course_name}
          </Typography>
          
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              mb: "24px",
            }}
          >
            <Typography
              sx={{
                color: "#4B4B4B",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "1",
                fontFamily: "Nunito Sans",
              }}
            >
              By
            </Typography>
            <Typography
              sx={{
                color: "#0051C8",
                fontSize: "15px",
                fontWeight: 700,
                lineHeight: "1",
                fontFamily: "Nunito Sans",
                textTransform: "uppercase",
                letterSpacing: "0.03em"
              }}
            >
              Bharathidasan University{Course?.institute?.institute_name}
            </Typography>
          </Box>
          
          <Typography
            sx={{
              color: "#4B4B4B",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "1.6",
              fontFamily: "Nunito Sans",
              mb: "32px"
            }}
          >
            {Course?.description}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: "flex", 
          gap: "20px", 
          mb: "40px",
          flexWrap: { xs: "wrap", sm: "nowrap" }
        }}>
          <Box
            sx={{
              border: "1px solid rgba(0, 81, 200, 0.2)",
              padding: "16px 20px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 81, 200, 0.03)",
              flex: "1 1 auto",
              minWidth: "180px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.03)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0, 81, 200, 0.1)",
                transform: "translateY(-2px)"
              }
            }}
          >
            <UpdateIcon sx={{ fontSize: 22, color: "#0051C8", mr: 1.5 }} />
            <Box>
              <Typography
                sx={{
                  color: "#4B4B4B",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "1",
                  fontFamily: "Nunito Sans",
                  mb: "6px"
                }}
              >
                Duration
              </Typography>
              <Typography
                sx={{
                  color: "#151515",
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "1",
                  fontFamily: "Nunito Sans"
                }}
              >
                {Course?.duration}
              </Typography>
            </Box>
          </Box>
          
          <Box
            sx={{
              border: "1px solid rgba(0, 81, 200, 0.2)",
              padding: "16px 20px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 81, 200, 0.03)",
              flex: "1 1 auto",
              minWidth: "180px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.03)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0, 81, 200, 0.1)",
                transform: "translateY(-2px)"
              }
            }}
          >
            <Box sx={{ 
              width: 24, 
              height: 24, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#0051C8",
              mr: 1.5
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3V21M9 3L4 8M9 3L14 8M15 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H15V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#4B4B4B",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "1",
                  fontFamily: "Nunito Sans",
                  mb: "6px"
                }}
              >
                Type
              </Typography>
              <Typography
                sx={{
                  color: "#151515",
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "1",
                  fontFamily: "Nunito Sans"
                }}
              >
                {Course?.class_type?.[0]}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* <Box sx={{ mt: "30px" }}>
          <Typography
            sx={{
              color: "#151515",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "1.4",
              fontFamily: "Nunito Sans",
              mb: "24px",
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "rgba(0, 81, 200, 0.2)",
                borderRadius: "1px"
              }
            }}
          >
            Course Benefits
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            gap: "20px", 
            flexWrap: { xs: "wrap", md: "nowrap" } 
          }}>
            {Benefits?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  background: `linear-gradient(135deg, ${item.background} 0%, ${item.background}dd 100%)`,
                  boxShadow: item.shadow,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "16px",
                  padding: '24px 16px',
                  flex: '1 1 30%',
                  minWidth: '120px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)"
                  }
                }}
              >
                <Box sx={{ 
                  mb: 2,
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%"
                }}>
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "1.2",
                    textAlign: "center",
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