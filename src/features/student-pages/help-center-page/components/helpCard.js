import React from "react";
import { Box, Typography, Button } from "@mui/material";

const StudentHelpCard = ({ section, title, setView, category }) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        marginBottom: 3,
        width: "100%",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        backgroundColor: "white",
        transition: "transform 0.3s, box-shadow 0.3s",
        border: "1px solid #F0F0F0",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 12px 24px rgba(86, 17, 177, 0.15)",
        },
        "&:focus-within": {
          outline: "2px solid #5611B1",
          outlineOffset: "2px",
        },
      }}
      role="article"
      aria-labelledby={`section-title-${category}`}
    >
      {/* Header Section */}
      <Box
        sx={{
          padding: "24px 28px",
          background: "linear-gradient(135deg, #EDE0FF 0%, #F7F1FF 100%)",
          borderBottom: "1px solid #F0F0F0",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #5611B1 0%, #9747FF 100%)",
          },
        }}
      >
        {/* Category Tag */}
        <Typography
          component="span"
          sx={{
            padding: "6px 14px",
            backgroundColor: "rgba(86, 17, 177, 0.1)",
            color: "#5611B1",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "20px",
            display: "inline-block",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "16px",
          }}
        >
          {category}
        </Typography>

        {/* Section Title */}
        <Typography
          id={`section-title-${category}`}
          variant="h6"
          sx={{
            color: "#1A1A1A",
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: "8px",
          }}
        >
          {section}
        </Typography>

        {/* Subtitle - using the title prop if available */}
        {title && (
          <Typography
            sx={{
              color: "#555555",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {title}
          </Typography>
        )}
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: "24px 28px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          onClick={() => {
            setView(category);
          }}
          variant="contained"
          disableElevation
          aria-label={`View ${category} section`}
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#FFFFFF",
            padding: "10px 24px",
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: "#5611B1",
            textTransform: "none",
            transition: "all 0.2s",
            boxShadow: "0px 4px 8px rgba(86, 17, 177, 0.2)",
            "&:hover": {
              backgroundColor: "#4A0E9C",
              transform: "translateY(-2px)",
              boxShadow: "0px 6px 12px rgba(86, 17, 177, 0.3)",
            },
            "&:active": {
              backgroundColor: "#400D85",
              transform: "translateY(0px)",
              boxShadow: "0px 2px 4px rgba(86, 17, 177, 0.2)",
            },
            "&:focus": {
              boxShadow: "0px 0px 0px 3px rgba(86, 17, 177, 0.3)",
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default StudentHelpCard;
