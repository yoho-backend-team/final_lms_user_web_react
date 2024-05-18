import React from "react";
import { Container, Grid, Typography, Select, MenuItem, Box, InputLabel, FormControl, styled, Paper } from "@mui/material";
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useState } from "react";
import TabPanel from '@mui/lab/TabPanel';
import useMediaQuery from "@mui/material/useMediaQuery";

// Import your tab components here
import StudentOfflineClassHistory from "../ClassHistory/ClassHistory";
import StudentOfflineLiveClasses from "../LiveClass/LiveClass";
import StudentOfflineCompletedClass from "../Completed Classes/CompletedClasses";
import StudentOfflineUpcoming from "../Upcoming Classes/UpcomingClasses";

function Main() {
  const [value, setValue] = useState('1');
  const [classes, setClass] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ClassHandleChange = (event) => {
    setClass(event.target.value);
  };

  const matches = useMediaQuery("(min-width:600px)");

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)'
}));

  return (
   <StyledPaper>
    <Container maxWidth="lg" sx={{ marginLeft: matches ? "20px" : "20px",}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>
            Classes
          </Typography>
          
            <Box sx={{ padding: matches ? "20px" : "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor:"white", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", flexDirection: matches ? 'row' : 'column' }}>
              <Typography variant="h3">
                Offline Classes <LaptopWindowsIcon style={{ marginLeft: "10px", marginBottom: matches ? "-5px" : "0" }} />
              </Typography>
              <FormControl sx={{ minWidth: 120, marginTop: matches ? "0" : "10px" }}>
                <InputLabel id="demo-simple-select-label">Offline Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={classes}
                  label="Online Class"
                  onChange={ClassHandleChange}
                >
                  <MenuItem value="live class">live Class</MenuItem>
                </Select>
              </FormControl>
            </Box>
         
          <TabContext value={value}> 
              <Box sx={{ backgroundColor:"white", borderBottomRightRadius:"10px", borderBottomLeftRadius:"10px"}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Upcoming Classes" value="1" />
                  <Tab label="Completed Classes" value="2" />  
                  <Tab label="Class History" value="3" />
                  <Tab label="Live Class" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1"><StudentOfflineUpcoming /></TabPanel>
              <TabPanel value="2"><StudentOfflineCompletedClass /></TabPanel>
              <TabPanel value="3"><StudentOfflineClassHistory /></TabPanel>
              <TabPanel value="4"><StudentOfflineLiveClasses /></TabPanel>
            </TabContext>
        </Grid>
      </Grid>
    </Container>
    </StyledPaper> 
  );
}

export default Main;