import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, IconButton, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentHelpView = ({ category, setIsView, isView }) => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleNavigateBack = () => {
    setIsView(!isView);
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true);
    window.open(category.videolink, "_blank");
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVideoOpen(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        backgroundColor: "#F9F9FF",
        border: "1px solid #EAEAFF",
        borderRadius: "20px",
        boxShadow: "0px 8px 30px rgba(74, 20, 140, 0.08)",
        padding: { xs: "20px", sm: "32px" },
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        transition: "all 0.3s ease",
      }}
    >
      {/* Navigation Button */}
      <IconButton
        onClick={handleNavigateBack}
        aria-label="Go back"
        sx={{
          position: "fixed",
          top: "90px",
          left: "26px",
          zIndex: 10,
          color: "#5611B1",
          backgroundColor: "#FFFFFF",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          boxShadow: "0px 4px 12px rgba(86, 17, 177, 0.15)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#F3EDFF",
            transform: "scale(1.05)",
            boxShadow: "0px 6px 16px rgba(86, 17, 177, 0.25)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "@media (max-width: 768px)": {
            top: "20px",
            left: "20px",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Content Header */}
      <Box 
        sx={{ 
          mb: 5, 
          mt: { xs: 6, sm: 8 },
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "60px",
            height: "4px",
            backgroundColor: "#5611B1",
            borderRadius: "2px",
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "24px", sm: "28px" },
            fontWeight: 700,
            color: "#321658",
            fontFamily: "Poppins, sans-serif",
            mb: 2,
          }}
        >
          {category?.title || "Learning Resources"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", sm: "20px" },
            fontWeight: 600,
            color: "#4A148C",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Additional Information
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "15px", sm: "16px" },
            color: "#555555",
            fontFamily: "Poppins, sans-serif",
            lineHeight: "1.8",
            mt: 2,
          }}
        >
          This section contains some dummy content. You can replace this with any relevant information you want to display above the video link. You can replace this with any relevant information you want to display above the video link.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Video Card with Enhanced Design */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "250px", sm: "350px", md: "450px" },
              backgroundColor: "#f1edfb",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0px 15px 30px rgba(74, 20, 140, 0.15)",
              },
              "&:focus": {
                outline: "3px solid rgba(86, 17, 177, 0.5)",
                outlineOffset: "2px",
              },
            }}
            onClick={handleVideoClick}
            role="button"
            tabIndex={0}
            aria-label="Play video"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleVideoClick();
              }
            }}
          >
            <img
              src={category?.videoThumbnail || "https://via.placeholder.com/1920x1080"}
              alt="Video thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease-in-out",
              }}
            />
            
            {/* Video Overlay Gradient */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
              }}
            />
            
            {/* Play Button */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(86, 17, 177, 0.85)",
                borderRadius: "50%",
                width: { xs: "64px", sm: "80px" },
                height: { xs: "64px", sm: "80px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(86, 17, 177, 0.95)",
                  transform: "translate(-50%, -50%) scale(1.1)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "28px", sm: "36px" },
                  lineHeight: 1,
                }}
              >
                ▶
              </Typography>
            </Box>
            
            {/* Video Title Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: { xs: "16px", sm: "24px" },
                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  textShadow: "0px 1px 3px rgba(0,0,0,0.6)",
                }}
              >
                {category?.videoTitle || "Watch Educational Video"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: 400,
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  opacity: 0.9,
                  mt: 1,
                  textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                Click to watch in a new tab
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentHelpView;

