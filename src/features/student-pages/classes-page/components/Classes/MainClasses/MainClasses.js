import React, { useState } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  styled,
  Paper,
} from "@mui/material";
import { SpatialAudioOff } from "@mui/icons-material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
import back from "../../../../../../assets/images/pages/background_1.png";
import { useTheme } from "@emotion/react";
import { OnlinePrediction } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import backgroundimg from "../../../../../../assets/images/background.png"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  // width: 'auto',
  height: "100vh",
  // marginLeft: 'auto',
  // marginRight: 'auto',
  backgroundColor: "#F2F2F2",
}));

const Main = () => {
  const theme = useTheme();
  const [value, setValue] = useState("1");
  const [classType, setClassType] = useState("Online");
  const matches = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClassChange = (event) => {
    setClassType(event.target.value);
  };

  return (
    <StyledPaper>
      <div
  style={{
    backgroundImage: `url(${backgroundimg})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    position:"relative",
    backgroundAttachment:"fixed"
 
  }}
>

      
      {/* <Container maxWidth="lg" sx={{ marginLeft: matches ? "20px" : "20px" }}> */}
      <Grid container spacing={2}>
        <Grid item xs={12}> 
          <Typography variant="h2" gutterBottom sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 700 }}>
            Classes
          </Typography>
          <Box
            sx={{
              padding: matches ? "20px" : "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              flexDirection: matches ? "row" : "column",
            }}
          >
            <Typography variant="h3" sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 500, fontsize: '20px',lineheight: '32px' }}>
              {classType} Classes{" "}
              {classType == "Online" ? (
                <OnlinePrediction
                  color={classType == "Online" ? "primary" : "success"}
                  style={{
                    marginLeft: "10px",
                    marginBottom: matches ? "-5px" : "0",
                  }}
                />
              ) : (
                <SpatialAudioOff
                  color={classType == "Online" ? "primary" : "success"}
                  style={{
                    marginLeft: "10px",
                    marginBottom: matches ? "-5px" : "0",
                  }}
                />
              )}
            </Typography>
            <FormControl
    sx={{ 
      display: "inline-flex",
      padding: "0px 0px",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      borderRadius: "10px",
      border: "2px solid #0D6EFD", 
    }}
  >
    <Select
      labelId="class-select-label"
      id="class-select"
      value={classType}
      label="Class Type"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          boxShadow: "none"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          boxShadow: "none"
        }
      }}
      onChange={handleClassChange}
      IconComponent={ExpandMoreIcon}
    >
      <MenuItem
          value="Online"
          sx={{
            color: 'var(--Colour-Neutral-1, #000)',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '22px' // 157.143%
          }}
        >
          Online
        </MenuItem>
        <MenuItem
          value="Offline"
          sx={{
            color: 'var(--Colour-Neutral-1, #000)',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '22px' // 157.143%
          }}
        >
          Offline
        </MenuItem>
    </Select>
  </FormControl>
          </Box>
          <TabContext value={value}>
            <Box
              sx={{
                backgroundColor: "white",
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <TabList 
    onChange={handleChange} 
    aria-label="class tabs"
    sx={{
      '& .MuiTab-root': {
        fontFamily: 'Poppins',  
        fontWeight: 600,        
        color: '#000',          
      },
      '& .Mui-selected': {
        color: '#0000FF',       
        fontWeight: 700,        
      },
    }}
  >
    <Tab label="Upcoming Classes" value="1" />
    <Tab label="Completed Classes" value="2" />
    <Tab label="Class History" value="3" />
    <Tab label="Live Class" value="4" />
  </TabList>
            </Box>
            {classType === "Online" && (
              <>
                <TabPanel value="1">
                  <StudentOnlineUpcoming/>
                </TabPanel>
                <TabPanel value="2">
                  <StudentOnlineCompletedClass />
                </TabPanel>
                <TabPanel value="3">
                  <StudentOnlineClassHistory />
                </TabPanel>
                <TabPanel value="4">
                  <StudentOnlineLiveClasses />
                </TabPanel>
              </>
            )}
            {classType === "Offline" && (
              <>
                <TabPanel value="1">
                  <StudentOfflineUpcoming />
                </TabPanel>
                <TabPanel value="2">
                  <StudentOfflineCompletedClass />
                </TabPanel>
                <TabPanel value="3">
                  <StudentOfflineClassHistory />
                </TabPanel>
                <TabPanel value="4">
                  <StudentOfflineLiveClasses />
                </TabPanel>
              </>
            )}
          </TabContext>
        </Grid>
      </Grid>
      {/* </Container> */}
      </div>
    </StyledPaper>
  );
};

export default Main;
