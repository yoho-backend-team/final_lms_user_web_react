import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const Footer = () => {

  const location = useLocation()

  const isActive = (current_location) => {
    const isCurrentLocation = current_location === location.pathname
    return isCurrentLocation
  }


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
           <Box sx={{ display: "flex", gap: 5 }}>
          <Box component={Link} to={"/student/help-center"} sx={{ textDecoration: "none" , display: 'inline-flex', gap: "10px", alignItems : "center"}} >
            <HelpOutlineOutlinedIcon sx={{ color : isActive("/student/help-center") ? "#0D6EFD" : "#6C757D" }} />
            <Typography
              style={{ gap: 2 , color : isActive("/instructor/help-center") ? "#0D6EFD" : "#6C757D", fontSize : "14px" }}
            >
              Help Center
            </Typography>
          </Box>
          <Box sx={{ display: 'inline-flex', gap: "10px", alignItems : "center" }} >
            <HelpOutlineOutlinedIcon sx={{ color : isActive("/student/Faq") ? "#0D6EFD" : "#6C757D" }} />
            <Link to={"/instructor/Faq"} style={{ textDecoration: "none", color : isActive("/instructor/Faq") ? "#0D6EFD" : "#6C757D" }}>
              FAQ
            </Link>
          </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box sx={{ display: "inline-flex", gap: "10px", alignItems : "center" }} >
              <RestoreOutlinedIcon sx={{ color : isActive("/student/activity-logs") ? "#0D6EFD" : "#6C757D"}} />
              <Link
                to={"/student/activity-logs"}
                style={{ textDecoration: "none", color : isActive("/student/activity-logs") ? "#0D6EFD" : "#6C757D" }}
              >
                Activity Log
              </Link>
            </Box>
            <Box sx={{ textAlign: "center", display: "inline-flex", gap: "10px", alignContent: "center"}} >
              <ConfirmationNumberOutlinedIcon sx={{ color : isActive("/student/tickets") ? "#0D6EFD" : "#6C757D",rotate:"145deg"}} />
              <Link to={"/student/tickets"} style={{ textDecoration: "none", color :  isActive("/student/tickets") ? "#0D6EFD" : "#6C757D" }}>
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
