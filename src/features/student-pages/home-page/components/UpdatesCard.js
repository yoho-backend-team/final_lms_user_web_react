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
        <Box sx={{ height: 85, overflow: "auto" }}>
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
              {!Notification || Notification.length === 0 ? (
                renderNoDataFound()
              ) : (
                <>
                  {/* message */}
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5}}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-10px" }}
                        >
                          <Groups2 sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                              mt:1,
                              mr:-5,
                            }}
                          >
                            Community
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 6}}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 14,
                          ml:8,
                          
                          color: "black",
                          fontFamily: "poppins",
                        }}
                      >
                        {Notification?.[0]?.body}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          ml:8,
                          fontFamily: "poppins",
                          mb:"10px",
                        }}
                      >
                        {Notification?.[0]?.title}
                      </Typography>
                    </Box>
                  </Box>
                  {/* message */}
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-10px" }}
                        >
                          <CalendarToday sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                              mt:1,
                              ml:1.5,
                            }}
                          >
                            Attendance
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 14,
                          color: "black",
                          fontFamily: "poppins",
                          mr:8,
                        }}
                      >
                        Today 02/04/2024{" "}
                        <span style={{ color: "grey" }}>(You Present)</span>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "poppins",
                          ml:1,
                        }}
                      >
                        {Notification?.[1]?.body}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 ,mb:"-10px"}}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 }}
                        >
                          <CalendarToday sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                             
                              fontFamily: "poppins",
                              ml:1.5,
                              mt:1,
                              
                            }}
                          >
                           {Notification?.[1]?.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                   
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ ml: 15,mb:"10px" }}>
                        <Typography
                          sx={{
                            mt: -1,
                            fontWeight: 400,
                            fontSize: 14,
                            color: "black",
                            fontFamily: "poppins",
                            mr:8,
                          }}
                        >
                          Today 02/04/2024{" "}
                          <span style={{ color: "red" }}>(You Absent)</span>
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 400,
                            fontSize: 12,
                            fontFamily: "poppins",
                            ml:1,
                          }}
                        >
                          {Notification?.[1]?.body}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5}}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-15px" }}
                        >
                          <Book sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                              mt:1,
                              ml:1.5,
                            }}
                          >
                            Class
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -4,
                          fontWeight: 400,
                          fontSize: 14,
                          color: "black",
                          mt:"1px",
                          fontFamily: "poppins",
                          mr:8,
                        }}
                      >
                        <span style={{ color: "green" }}>
                          3 classes scheduled for the day
                        </span>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "poppins",
                          mr:8,
                        }}
                      >
                        "SQL" group chat 22 others messaged and 2 instructors and
                        students including you
                      </Typography>
                    </Box>
                  </Box>
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 ,mb:"-10px"}}
                        >
                          <MoneyOff sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                              mt:1,
                              ml:1.5,
                            }}
                          >
                            Payment
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "red",
                          fontFamily: "poppins",
                          ml:1,
                        }}
                      >
                        Due for Apr
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "poppins",
                          mr:8,
                        }}
                      >
                        "SQL" group chat 22 others messaged
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </TabPanel>
            <TabPanel value="previous">
              {!Notification || Notification.length === 0 ? (
                renderNoDataFound()
              ) : (
                <>
                  {/* message */}
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-10px" }}
                        >
                          <CalendarToday sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                            }}
                          >
                            Attendance
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "black",
                          fontFamily: "poppins",
                        }}
                      >
                        Today 02/04/2024{" "}
                        <span style={{ color: "grey" }}>(You Present)</span>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "poppins",
                        }}
                      >
                        Attendance collected for the day
                      </Typography>
                    </Box>
                  </Box>
                  {/* message */}

                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 ,mb:"-10px"}}
                        >
                          <CalendarToday sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mb:"15px",
                              fontFamily: "poppins",
                            }}
                          >
                            Attendance
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "black",
                          fontFamily: "poppins",
                        }}
                      >
                        Today 02/04/2024{" "}
                        <span style={{ color: "red" }}>(You Absent)</span>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "poppins",
                        }}
                      >
                        Attendance collected for the day
                      </Typography>
                    </Box>
                  </Box>
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-10px" }}
                        >
                          <CalendarToday sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                            }}
                          >
                            Attendance
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "black",
                          fontFamily: "poppins",
                        }}
                      >
                        Today 02/04/2024{" "}
                        <span style={{ color: "grey" }}>(You Present)</span>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "poppins",
                        }}
                      >
                        Attendance collected for the day
                      </Typography>
                    </Box>
                  </Box>
                  <Box mb={5}>
                    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Avatar
                          sx={{ backgroundColor: "#6fa8dc", borderRadius: 2,mb:"-10px" }}
                        >
                          <MoneyOff sx={{ color: "black" }} />
                        </Avatar>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "black",
                              mt:"10px",
                              fontFamily: "poppins",
                              mt:1,
                              ml:1.5
                            }}
                          >
                            Payment
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          fontFamily: "poppins",
                        }}
                      >
                        11 mins ago
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 15 }}>
                      <Typography
                        sx={{
                          mt: -1,
                          fontWeight: 400,
                          fontSize: 12,
                          color: "red",
                          fontFamily: "poppins",
                          mr:8,
                        }}
                      >
                        Due for Apr
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          fontFamily: "poppins",
                           mr:8,
                        }}
                      >
                        "SQL" group chat 22 others messaged
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Card>
  );
};

export default UpdatesCard;

















