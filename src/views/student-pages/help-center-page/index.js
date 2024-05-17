import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import HelpCenterCard from "features/student-pages/help-center-page/components/HelpCenterCard";
import * as React from "react";
import HelpCenterView from "features/student-pages/help-center-page/components/HelpCenterView";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

const HelpCenterPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <TabContext value={value}>
        <Grid container spacing={2} xs={12} sx={{ alignItems: "flex-start" }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Grid container>
              <Grid item md={2} xs={12}>
                <Typography variant="h2">Help Center</Typography>
              </Grid>

              <Grid item md={8} xs={12}>
                <Box sx={{}}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      backgroundColor: "#e2e8ee",
                      borderRadius: 16,
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                    }}
                  >
                    <Tab
                      label="Mail"
                      value="1"
                      sx={{
                        backgroundColor:
                          value === "1" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "1" ? "#fff" : "#000",
                      }}
                    />
                    <Tab
                      label="Profile"
                      value="2"
                      sx={{
                        backgroundColor:
                          value === "2" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "2" ? "#fff" : "#000",
                      }}
                    />
                    <Tab
                      label="Classes"
                      value="3"
                      sx={{
                        backgroundColor:
                          value === "3" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "3" ? "#fff" : "#000",
                      }}
                    />
                    <Tab
                      label="Password"
                      value="4"
                      sx={{
                        backgroundColor:
                          value === "4" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "4" ? "#fff" : "#000",
                      }}
                    />
                    <Tab
                      label="Attendance"
                      value="5"
                      sx={{
                        backgroundColor:
                          value === "5" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "5" ? "#fff" : "#000",
                      }}
                    />
                    <Tab
                      label="Payment"
                      value="6"
                      sx={{
                        backgroundColor:
                          value === "6" ? "#2196f3" : "transparent",
                        borderRadius: 16,
                        color: value === "6" ? "#fff" : "#000",
                      }}
                    />
                  </TabList>
                </Box>
              </Grid>
              <Grid item md={2} xs={12}>
                <Box>
                  <Typography variant="h4">Try Other Option?</Typography>
                  <Box
                    sx={{
                      mt: 0.75,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <IconButton>
                        <ChatIcon />
                      </IconButton>
                      <Typography variant="caption">Chat</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <IconButton>
                        <CallIcon />
                      </IconButton>
                      <Typography variant="caption">Call</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <IconButton>
                        <MailIcon />
                      </IconButton>
                      <Typography variant="caption">Mail</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid sx={{ typography: "body1" }}>
              <TabPanel value="1">
                <HelpCenterCard />
              </TabPanel>
              <TabPanel value="2">
                {" "}
                <HelpCenterView />
              </TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item Four</TabPanel>
              <TabPanel value="5">Item Five</TabPanel>
              <TabPanel value="6">Item Six</TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  );
};

export default HelpCenterPage;
