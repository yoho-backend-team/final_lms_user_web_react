import React from "react";
import { Box, Typography } from "@mui/material";

const StudentHelpCard = ({ section, title, setView ,category}) => {
  
  
  return (
    <Box sx={{ borderRadius: "24px", marginBottom: 2, width: "100%" }}>
      <Box
        sx={{
          padding: "19.285px",
          pb: "15px",
          backgroundColor: "#EDE0FF",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
      >
        <Typography
          sx={{
            padding: "5px",
            backgroundColor: "#F0F0F0",
            color: "#646464",
            fontSize: "7px",
            fontWeight: 400,
            lineHeight: "19px",
            maxWidth: "25px",
            display: "inline-block",
          }}
        >
          {category}
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            fontSize: "16px",
            fontWeight: 500,
            maxHeight: "55px",
            minHeight: "55px",
            overflowX: "hidden",
            pt: "15px",
          }}
        >
          {section}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          padding: "9.642px 19.285px 19.285px 19.285px",
          textAlign: "start",
        }}
      >
        <Typography
          onClick={() => {setView(category)}}
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#646464",
            padding: "5px",
            backgroundColor: "#F0F0F0",
            borderRadius: "24px",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Click to view
        </Typography>
        
      </Box>
    </Box>
  );
};

export default StudentHelpCard;
