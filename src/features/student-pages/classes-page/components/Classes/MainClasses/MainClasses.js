import React, { useState } from "react";
import { Grid, Typography, Select, MenuItem, Box, InputLabel, FormControl, styled, Paper } from "@mui/material";
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useMediaQuery from "@mui/material/useMediaQuery";

// Import your tab components here
import StudentOnlineClassHistory from "../OnlineClasses/ClassHistory/ClassHistory";
import StudentOnlineLiveClasses from "../OnlineClasses/LiveClass/LiveClass";
import StudentOnlineCompletedClass from "../OnlineClasses/Completed Classes/CompletedClasses";
import StudentOnlineUpcoming from "../OnlineClasses/Upcoming Classes/UpcomingClasses";
import StudentOfflineClassHistory from "../OfflineClasses/ClassHistory/ClassHistory";
import StudentOfflineLiveClasses from "../OfflineClasses/LiveClass/LiveClass";
import StudentOfflineCompletedClass from "../OfflineClasses/Completed Classes/CompletedClasses";
import StudentOfflineUpcoming from "../OfflineClasses/Upcoming Classes/UpcomingClasses";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  width: 'auto',
  height: '100vh',
  marginLeft: 'auto',
  marginRight: 'auto',
  background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)'
}));

const Main = () => {
  const [value, setValue] = useState('1');
  const [classType, setClassType] = useState('Online');
  const matches = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClassChange = (event) => {
    setClassType(event.target.value);
  };

  return (
    <StyledPaper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              Classes
            </Typography>
            <Box sx={{ padding: matches ? "20px" : "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "white", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", flexDirection: matches ? 'row' : 'column' }}>
              <Typography variant="h3">
                {classType} Classes <LaptopWindowsIcon style={{ marginLeft: "10px", marginBottom: matches ? "-5px" : "0" }} />
              </Typography>
              <FormControl sx={{ minWidth: 120, marginTop: matches ? "0" : "10px" }}>
                <InputLabel id="class-select-label">Classes</InputLabel>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                  value={classType}
                  label="Class Type"
                  onChange={handleClassChange}
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TabContext value={value}>
              <Box sx={{ backgroundColor: "white", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }}>
                <TabList onChange={handleChange} aria-label="class tabs">
                  <Tab label="Upcoming Classes" value="1" />
                  <Tab label="Completed Classes" value="2" />
                  <Tab label="Class History" value="3" />
                  <Tab label="Live Class" value="4" />
                </TabList>
              </Box>
              {classType === 'Online' && (
                <>
                  <TabPanel value="1"><StudentOnlineUpcoming /></TabPanel>
                  <TabPanel value="2"><StudentOnlineCompletedClass /></TabPanel>
                  <TabPanel value="3"><StudentOnlineClassHistory /></TabPanel>
                  <TabPanel value="4"><StudentOnlineLiveClasses /></TabPanel>
                </>
              )}
              {classType === 'Offline' && (
                <>
                  <TabPanel value="1"><StudentOfflineUpcoming /></TabPanel>
                  <TabPanel value="2"><StudentOfflineCompletedClass /></TabPanel>
                  <TabPanel value="3"><StudentOfflineClassHistory /></TabPanel>
                  <TabPanel value="4"><StudentOfflineLiveClasses /></TabPanel>
                </>
              )}
            </TabContext>
          </Grid>
        </Grid>
    </StyledPaper>
  );
}

export default Main;