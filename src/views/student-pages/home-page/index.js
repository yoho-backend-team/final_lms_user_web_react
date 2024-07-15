import React, { useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box, Avatar } from "@mui/material";
import CourseCard from "features/student-pages/home-page/components/CourseCard";
import {
  Assessment,
  CheckCircle,
  Devices,
  NearbyError,
  Podcasts,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import AttendanceCard from "features/student-pages/home-page/components/AttendanceCard";
import PaymentsCard from "features/student-pages/home-page/components/PaymentsCard";
import UpdatesCard from "features/student-pages/home-page/components/UpdatesCard";
import ProfilePage from "../../../views/student-pages/profile-page/index.js";
import TicketStatusCard from "features/student-pages/home-page/components/TicketStatusCard.js";
import studentheaderpic from "../../../assets/images/background/studentprofile.svg"

const StudentDashboard = () => {
  const theme = useTheme();
  const [editProfileClicked, setEditProfileClicked] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfileClicked(true);
  };

  // Student details
  const student = {
    name: "Ramakrishnan P",
    profileImage: "https://cdn.tamaggo.com/1663756964157.png",
    studentID: "LMSSTUD1243",
  };

  // Render ProfilePage if editProfileClicked is true
  if (editProfileClicked) {
    return <ProfilePage />;
  }

  return (
    <Grid container p={8} sx={{ p: { xs: 5, sm: 9 } }}>
      <Grid item xs={12} sm={4} className="MainGrid-1">
        <Card sx={{ boxShadow: "none" }}>
          <Box>
            <img
              src={studentheaderpic}
              alt="account-banner"
              style={{ height: 80, width: "100%" }}
            />
          </Box>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid xs={8}>
              <Box p={2} sx={{ mt: -8 }}>
                <Avatar
                  alt="user-name"
                  src={student.profileImage}
                  sx={{ height: 60, width: 60, borderRadius: 2, mb: 1 }}
                />

                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "black",
                      fontFamily: "poppins",
                    }}
                  >
                    {student.name}
                  </Typography>
                  <Box sx={{ display: "flex ", mt: 1 }}>
                    <Typography
                      color="black"
                      sx={{
                        mr: 1,
                        fontWeight: 600,
                        fontSize: 12,
                        fontFamily: "poppins",
                      }}
                    >
                      Student ID :
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 12,
                        fontFamily: "poppins",
                      }}
                    >
                      {student.studentID}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                sx={{ p: 1, px: 2, borderRadius: 5 }}
                onClick={handleEditProfileClick}
              >
                View Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} alignItems="center">
              {" "}
              <Typography variant="h4" sx={{ mb: 1, mx: { xs: 3, sm: 5 } }}>
                Class
              </Typography>
            </Grid>

            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              {" "}
              <Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="h2">146</Typography>
                  <Assessment color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Total Class</Typography>
              </Box>
            </Grid>
            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">56</Typography>
                  <CheckCircle color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Completed</Typography>
              </Box>
            </Grid>
            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">90</Typography>
                  <NearbyError color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Pending</Typography>
              </Box>
            </Grid>
            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">1</Typography>
                  <Podcasts color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Live Class</Typography>
              </Box>
            </Grid>
            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">146</Typography>
                  <Assessment color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Total Class</Typography>
              </Box>
            </Grid>
            <Grid
              xs={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">123</Typography>
                  <Devices color="secondary" />
                </Box>
                <Typography sx={{ color: "grey" }}>Online Class</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ px: 2 }}>
            <Card
              sx={{
                borderRadius: "10px 10px 0px 0px",
                border: "1px solid ",
                borderColor: theme.palette.secondary.main,
                backgroundColor: theme.palette.secondary.light,
              }}
            >
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    Institute Name :
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "black",
                      mt: 2,
                    }}
                  >
                    Rajalakshmi Institute, Vellore
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebBO174VR6evP4d1N0W5M8GdBBsCvzQKF4vjlfgBva26Doib78Zcc084ekRdejEZ_HnQ&usqp=CAU"
                    sx={{ height: 100, width: 100, backgroundColor: "white" }}
                  ></Avatar>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Card>
        <Grid item xs={12}>
        <TicketStatusCard />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} className="MainGrid-2">
        <Grid item xs={12} px={3} mb={2}>
        <CourseCard />        
        </Grid>
        <Grid item xs={12} px={3} mb={2}>
        <AttendanceCard />          
        </Grid>
        <Grid item xs={12} px={3}>
           <PaymentsCard />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} className="MainGrid-3">
        <UpdatesCard image={"https://i.postimg.cc/qq8XHVBg/Frame-28674.png"} />
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;
