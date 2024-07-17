import React from "react";
import { Tab, Grid, Box, Card, Typography, Avatar } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Book, CalendarToday, Groups2, MoneyOff } from "@mui/icons-material";

const UpdatesCard = (props) => {
  const { image } = props;
  const [value, setValue] = React.useState("today");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ boxShadow: "none" }}>
      <Grid>
        <Box sx={{ height: 105, overflow: "hidden" }}>
          <img src={image} alt="banner" style={{ width: "100%" }} />
        </Box>
        <Box
          px={2}
          mt={2}
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "black", fontFamily: "poppins" }}
          >
            Updates{" "}
          </Typography>
          <Typography
            color="secondary"
            sx={{ fontWeight: 400, fontFamily: "poppins", fontSize: 12 }}
          >
            12 new messages
          </Typography>
        </Box>
        <Box className="Tabs" sx={{ width: "100%", typography: "body1" }}>
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
              {/* message */}
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 }}
                    >
                      <Groups2 sx={{ color: "black" }} />
                    </Avatar>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "black",
                          fontFamily: "poppins",
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography
                    sx={{
                      mt: -1,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "black",
                      fontFamily: "poppins",
                    }}
                  >
                    You have new message in the group chat
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                      fontSize: 12,
                      fontFamily: "poppins",
                    }}
                  >
                    "SQL" group chat 22 others messaged
                  </Typography>
                </Box>
              </Box>
              {/* message */}
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
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
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
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
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 }}
                    >
                      <Book sx={{ color: "black" }} />
                    </Avatar>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "black",
                          fontFamily: "poppins",
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography
                    sx={{
                      mt: -1,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "black",
                      fontFamily: "poppins",
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
                      fontSize: 12,
                      fontFamily: "poppins",
                    }}
                  >
                    "SQL" group chat 22 others messaged and 2 instructors and
                    students including you
                  </Typography>
                </Box>
              </Box>
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 }}
                    >
                      <MoneyOff sx={{ color: "black" }} />
                    </Avatar>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "black",
                          fontFamily: "poppins",
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography
                    sx={{
                      mt: -1,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "red",
                      fontFamily: "poppins",
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
                    }}
                  >
                    "SQL" group chat 22 others messaged
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="previous">
              {/* message */}
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
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

              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
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
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
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
              <Box mb={2}>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ backgroundColor: "#6fa8dc", borderRadius: 2 }}
                    >
                      <MoneyOff sx={{ color: "black" }} />
                    </Avatar>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "black",
                          fontFamily: "poppins",
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
                      fontSize: 11,
                      fontFamily: "poppins",
                    }}
                  >
                    11 mins ago
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography
                    sx={{
                      mt: -1,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "red",
                      fontFamily: "poppins",
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
                    }}
                  >
                    "SQL" group chat 22 others messaged
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Card>
  );
};

export default UpdatesCard;
