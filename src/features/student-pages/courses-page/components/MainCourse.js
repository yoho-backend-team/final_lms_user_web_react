import React, { useState } from "react";
import { Container, Grid, Box, Typography, styled, Paper, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CourseOne from "../components/CourseOne";
import CourseTwo from "../components/CourseTwo";
import Course from "../components/Course";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import back from '../../../../../src/assets/images/pages/background_1.png'

function Main() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    backgroundImage: `url(${back})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }));

  return (
    <StyledPaper>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mt={2}>
              <ArrowBackIcon style={{ marginBottom: "-5px", marginRight: "20px" }} />
              <Typography variant="h3">Course</Typography>
            </Box>
            <TabContext value={value}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TabList onChange={handleChange} value={value} aria-label="Course tabs">
                  <Tab label="About" value="1" />
                  <Tab label="Class/Notes & Materials" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Course/>
              </TabPanel>
              <TabPanel value="2">
                <CourseOne />
                <CourseTwo />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </StyledPaper>
  );
}

export default Main;
