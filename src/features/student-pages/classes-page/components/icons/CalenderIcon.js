import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarIcon from "./CalendarIcon";

const CalendarIconWithText = ({ date }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center", // Ensures vertical alignment
      gap: 1, // Adds spacing between the icon and the text
    }}
  >
    <CalendarIcon />
    <Typography
      variant="body2"
      sx={{
        color: "#6C757D",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {date}
    </Typography>
  </Box>
);

export default CalendarIconWithText;

