import {  Typography, Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "sticky",
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'column',
        // flexShrink: 0
      }}
    >
      <Box component="footer" square variant="outlined">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography>help ?</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>Activity Log</Box>
            <Box>Ticktet</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
