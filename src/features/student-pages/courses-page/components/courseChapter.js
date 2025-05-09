import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

const chapters = [
  {
    title: "Foundation of Python & SQL Basics",
    classes: 12,
    background: "linear-gradient(120deg, #0068FF 2.28%, #141BC4 100%)",
    color: "#84B6FF",
  },
  {
    title: "Frame Work and Styling",
    classes: 12,
    background: "linear-gradient(118deg, #CF75FF 1.82%, #670BC3 97.62%)",
    color: "#DEAEFF",
  },
  {
    title: "Prototype and Functionalities",
    classes: 12,
    background: "linear-gradient(118deg, #FADB39 1.75%, #F90 100%)",
    color: "#A58C06",
  },
  {
    title: "Foundation of Python & SQL Basics",
    classes: 12,
    background: "linear-gradient(120deg, #0068FF 2.28%, #141BC4 100%)",
    color: "#84B6FF",
  },
];

const CourseStudentChapters = ({ Chapters, Course }) => {
  return (
    <Box 
      sx={{ 
        pl: { xs: "20px", sm: "50px", md: "91px" },
        pr: { xs: "20px", sm: "30px", md: "50px" },
        py: { xs: "20px", sm: "30px" },
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        background: "linear-gradient(145deg, #f5f7fa 0%, #f8f9fb 100%)",
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <Box
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: "36px",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: { xs: "12px", sm: "0" }
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#151515",
            fontSize: "22px",
            fontWeight: 800,
            lineHeight: "1.2",
            fontFamily: "Nunito Sans",
            position: "relative",
            paddingBottom: "10px",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "50px",
              height: "3px",
              background: "linear-gradient(90deg, #0068FF 0%, #141BC4 100%)",
              borderRadius: "2px"
            }
          }}
        >
          Course Chapters / Topics
        </Typography>
        
        <Box sx={{ 
          display: "flex", 
          gap: "24px", 
          alignItems: "center"
        }}>
          <Typography
            sx={{
              color: "#414141",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: "1.2",
              fontFamily: "Nunito Sans",
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: '""',
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                bgcolor: "#0068FF",
                mr: "8px"
              }
            }}
          >
            {Chapters?.coursemodules?.length} Chapters
          </Typography>
          
          <Typography
            sx={{
              color: "#414141",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: "1.2",
              fontFamily: "Nunito Sans",
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: '""',
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                bgcolor: "#0068FF",
                mr: "8px"
              }
            }}
          >
            {Chapters?.batches?.[0]?.classes?.length} Classes
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px" 
      }}>
        {Chapters?.coursemodules?.map((chapter, index) => (
          <Box
            key={index}
            sx={{
              background: chapters[index % chapters.length].background,
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
              padding: "32px",
              width: "100%",
              borderRadius: "20px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.2)",
              },
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)",
                pointerEvents: "none",
              }
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: "24px"
              }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "20px", sm: "24px" },
                    fontWeight: 800,
                    lineHeight: "1.3",
                    fontFamily: "Nunito Sans",
                    maxWidth: "70%",
                    textShadow: "0px 2px 4px rgba(0,0,0,0.2)"
                  }}
                >
                  {chapter.title}
                </Typography>
                
                <Box
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    gap: "8px" 
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      background: "rgba(255, 255, 255, 0.9)",
                      padding: "14px 20px",
                      borderRadius: "14px",
                      fontSize: "26px",
                      fontWeight: 900,
                      lineHeight: "1",
                      fontFamily: "Nunito Sans",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      minWidth: "40px",
                      textAlign: "center"
                    }}
                  >
                    12
                  </Typography>
                  
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "800",
                      lineHeight: "1",
                      fontFamily: "Nunito Sans",
                      textShadow: "0px 1px 2px rgba(0,0,0,0.2)"
                    }}
                  >
                    classes
                  </Typography>
                </Box>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: chapters[index % chapters.length].color,
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "1.4",
                    minWidth: "138px",
                    fontFamily: "Nunito Sans",
                    textShadow: "0px 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  {chapter.description || "Master core concepts and build practical skills"}
                </Typography>
                
                <Box sx={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(5px)",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <Box sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    bgcolor: "#4AFF8C"
                  }} />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 700,
                      lineHeight: "1",
                      color: "white",
                      fontFamily: "Nunito Sans"
                    }}
                  >
                    Enrolled
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CourseStudentChapters;