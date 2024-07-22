import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        flexDirection: "column",

        width: "100%",
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
           <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="student/help-center" style={{ textDecoration: "none" }}>
            Help Center
          </Link>
          <Link to="student/Faq" style={{ textDecoration: "none" }}>
            Faq
          </Link>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Link
                to="student/activity-logs"
                style={{ textDecoration: "none" }}
              >
                Activity Log
              </Link>
            </Box>
            <Box>
              <Link to="student/tickets" style={{ textDecoration: "none" }}>
                Ticket
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
