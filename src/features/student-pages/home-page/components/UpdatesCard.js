import React from "react";
import { Tab, Grid, Box, Card, Typography, Avatar } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Book, CalendarToday, Groups2, MoneyOff, InfoOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectStudentNotifications } from "features/common/redux/studentSelector";

const UpdatesCard = (props, notification) => {
  const { image } = props;
  const [value, setValue] = React.useState("today");
  const Notification = useSelector(selectStudentNotifications);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle no data condition
  const renderNoDataFound = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          mb: 5
        }}
      >
        <InfoOutlined sx={{ fontSize: 40, color: "#6fa8dc", mb: 2 }} />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 16,
            color: "black",
            fontFamily: "poppins",
            textAlign: "center"
          }}
        >
          No new messages found
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 400,
            fontSize: 14,
            fontFamily: "poppins",
            color: "gray",
            textAlign: "center",
            mt: 1
          }}
        >
          Any updates will appear here when available
        </Typography>
      </Box>
    );
  };
  
  return (
    <Card sx={{ boxShadow: "none", height: "620px" }}>
      <Grid>
        <Box sx={{ height: 85, overflow: "hidden" }}>
          <img src={image} alt="banner" style={{ width: "100%" }} />
        </Box>
        <Box
          px={2}
          mt={2}
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            height: "auto",
          }}
        >
         
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: 'black', fontFamily: 'poppins' }}
          >
            Updates
          </Typography>

          <Typography
            color="secondary"
            sx={{ fontWeight: 400, fontFamily: "poppins", fontSize: 14 }}
          >
            {Notification?.length || 0} new messages
          </Typography>
        </Box>
        <Box className="Tabs" sx={{ width: "100%", typography: "body1", height: "670px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Today   " value="today" />
                <Tab label="Previous" value="previous" />
              </TabList>
            </Box>
            <TabPanel value="today">
              {renderNoDataFound()}
            </TabPanel>
            <TabPanel value="previous">
              {renderNoDataFound()}
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Card>
  );
};

export default UpdatesCard;