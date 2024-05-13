import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const HelpCenterView = () => {
  return (
    <>
      <Grid container spacing={3} xs={12}>
        <Grid item sx={12} md={7}>
          <Box>
            <Box>
              <Typography variant="h4">
                {" "}
                Explaining design to someone who doesn't understand what it is ??
              </Typography>
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item sx={12} md={5}>
          <Box>
            <Typography variant="h4">Video Guide</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HelpCenterView;
