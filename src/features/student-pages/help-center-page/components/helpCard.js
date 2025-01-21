import React from "react";
import { Box, Typography } from "@mui/material";

const StudentHelpCard = ({ section, title, setView, category }) => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        marginBottom: 3,
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#EDE0FF",
          borderBottom: "1px solid #DADADA",
        }}
      >
        {/* Category Tag */}
        <Typography
          sx={{
            padding: "4px 10px",
            backgroundColor: "#F5F5F5",
            color: "#646464",
            fontSize: "12px",
            fontWeight: 400,
            borderRadius: "8px",
            display: "inline-block",
            textTransform: "uppercase",
          }}
        >
          {category}
        </Typography>

        {/* Section Title */}
        <Typography
          sx={{
            color: "#000000",
            fontSize: "18px",
            fontWeight: 600,
            marginTop: "12px",
            lineHeight: "1.4",
          }}
        >
          {section}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography
          onClick={() => {
            setView(category);
          }}
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#5611B1",
            padding: "10px 20px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: "#F3EDFF",
            textAlign: "center",
            display: "inline-block",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#5611B1",
              color: "white",
            },
          }}
        >
          Click to View
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentHelpCard;
