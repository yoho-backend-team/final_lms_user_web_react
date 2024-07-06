import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Progress = ({ value = 0 }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        sx={{ color: "#23A2CB", rotate: "190deg" }}
        value={value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: "#000000" }}
          component="div"
          color="textSecondary"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const CircularProgressWithLabel = () => {
  const progressValue = 72;

  return (
    <div>
      <Progress value={progressValue} />
    </div>
  );
};

export default CircularProgressWithLabel;
