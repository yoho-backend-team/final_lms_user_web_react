import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        width:"100%",
        
        // flexShrink: 0
      }}
    >
      <Box component="footer" square variant="outlined">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            ml: 2,
            mr: 2,
          }}
        >
           <Link to="student/help-center" style={{textDecoration:"none"}}>Help Center</Link>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Link to="student/activity-logs" style={{textDecoration:"none"}}>Activity Log</Link>
            </Box>
            <Box>
            <Link to="student/tickets" style={{textDecoration:"none"}}>Ticket</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
