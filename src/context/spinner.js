import React from "react";
import { CircularProgress, Backdrop, Typography, Box } from "@mui/material";
import Gif_Loader from "components/loader/gif_loader";

const Spinner = ({ open, text }) => {
  return (
    <Backdrop
      open={open}
      style={{
        zIndex: 1301,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Gif_Loader />
      {/* <Box display="flex" flexDirection="column" alignItems="center"> */}
        {/* <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginTop: 10 }}>
          {text}
        </Typography> */}
      {/* </Box> */}
    </Backdrop>
  );
};

export default Spinner;
