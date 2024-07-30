import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

const InstructorHelpView = ({ category }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);


  return (
    <Box
      sx={{
        backgroundColor: "#EDE0FF",
        border: "1px solid #C3C3C3",
        borderRadius: "18px",
        boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
        padding: "20px",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "start",
              pb: "40px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "19px",
                color: "#000000",
                padding: "2px",
                 fontFamily:"poppins"
              }}
            >
              {category?.question || "No question available"}
            </Typography>
            <Typography
              sx={{
                color: "#321658",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "25px",
                 fontFamily:"poppins"
              }}
            >
              {category?.answer || "No answer available"}
            </Typography>
            <Box>
            <Typography
                    sx={{
                      color: "#000",
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                      fontFamily:"poppins"
                    }}
                  >
                    Video Link
                    
                  </Typography>
            </Box>

            {category?.videolink && (
              
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category?.videoThumbnail || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQTqg9NctHPWirUzxWYQHlGusYzURbCLFog&s.jpg"}
                  alt="Video thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(category.videolink, "_blank")}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    p: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(category.videolink, "_blank")}
                  
                  
                >
                 
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    ▶ React Class 1
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstructorHelpView;
