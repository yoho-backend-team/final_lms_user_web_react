import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const HelpCenterView = () => {
  return (
    <>
      <Grid container spacing={3} xs={12}>
        <Grid item xs={12} md={7}>
          <Box>
            <Box>
              <Typography variant="h4">
                Explaining design to someone who doesn't understand what it is
                ??
              </Typography>
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h4">Step by Step</Typography>
              <ul style={{ marginLeft: "1.5rem" }}>
                <li style={{ marginBottom: "1rem" }}>
                  Step 1: Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  Step 2: Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  Step 3: When an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  Step 4: It has survived not only five centuries, but also the
                  leap into electronic typesetting, remaining essentially
                  unchanged.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  Step 5: It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum passages.
                </li>
              </ul>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h4">Video Guide</Typography>
            <Box sx={{ mt: 2 }}>
              <video
                controls
                width="100%"
                src="https://youtu.be/M9hbj3phdT8?si=UVgdq7ZEtWXwIeWF" 
                poster="path/to/your/poster.jpg" 
              >
                Your browser does not support the video tag.
              </video>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HelpCenterView;
