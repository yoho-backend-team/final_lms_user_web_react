import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentHelpView = ({ category, setIsView, isView }) => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false); // Tracks if the video is open

  const handleNavigateBack = () => {
    setIsView(!isView);
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true); // Mark video as open
    window.open(category.videolink, "_blank"); // Open video in a new tab
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVideoOpen(false); // Reset video state when tab is hidden
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#F9F6FF",
        border: "1px solid #D6D6D6",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        width: "100%",
      }}
    >
      {/* Navigation Button */}
      <IconButton
        onClick={handleNavigateBack}
        sx={{
          position: "absolute",
          top: "6px",
          left: "16px",
          zIndex: 10, // Ensure the button is above the card
          color: "#321658",
          backgroundColor: "#fff",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "#F0F0F0",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Dummy Content Section */}
      <Box mb={4} mt={8}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#4A148C",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Additional Information
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#333333",
            fontFamily: "Poppins, sans-serif",
            lineHeight: "1.8",
          }}
        >
          This section contains some dummy content. You can replace this with any relevant information you want to display above the video link.You can replace this with any relevant information you want to display above the video link.
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12}>
          {/* Full-Page Watch Video Card */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "400px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              "&:hover img": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
            onClick={handleVideoClick}
          >
            <img
              src={category?.videoThumbnail || "https://via.placeholder.com/1920x1080"}
              alt="Video thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                ▶ Watch Video
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentHelpView;

