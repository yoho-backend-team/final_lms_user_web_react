import React from "react";
import { Container, Grid, Box, styled, Paper, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useState } from "react";
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";

// Import your tab components here
import CourseOne from "../components/CourseOne";
import CourseTwo from "../components/CourseTwo";
import Course from "../components/Course"

import back from '../../../../assets/images/pages/background_2.png'


function Main() {
  const [value, setValue] = useState('1');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const matches = useMediaQuery("(min-width:600px)");

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    // background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)',
    backgroundImage:`url(${back})`
  }));

  return (
    <StyledPaper>
      <Container maxWidth="lg" sx={{ marginLeft: matches ? "20px" : "20px", }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item xs={12} display="flex" alignItems="center" mt={2}>
              <ArrowBackIcon style={{ marginBottom: "-5px", marginRight: "20px" }} />
              <Typography variant="h3">Course</Typography>
            </Grid>
            <TabContext value={value}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="About" value="1" />
                  <Tab label="class/Notes & Materials" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1"><Course /></TabPanel>
              <TabPanel value="2"><CourseOne /><CourseTwo /></TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </StyledPaper>
  );
}

export default Main;