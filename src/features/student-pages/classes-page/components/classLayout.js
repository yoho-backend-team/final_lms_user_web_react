import React from "react";
import { Grid } from "@mui/material";
import { ClassBackroundBg, ClassBg, ClassBg1 } from "utils/images";

const ClassLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        background: `url(${ClassBackroundBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        padding: 4,
        overflow: "auto",
      }}
    >
      <Grid
      container
      sx={{
        background: `url(${ClassBg1})`,
        backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom center',
          height: '35vh',
          width: '100%', 
          position: 'absolute', 
          bottom: 0,
      }}
    ></Grid>
      {children}
    </Grid>
  );
};

export default ClassLayout;
