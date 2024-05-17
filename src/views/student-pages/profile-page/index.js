// import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BoyIcon from "@mui/icons-material/Boy";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MaleIcon from "@mui/icons-material/Male";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PercentIcon from "@mui/icons-material/Percent";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ReactApexChart from 'react-apexcharts';
import { useState } from "react";

const ApexChart = () => {
  const [series, setSeries] = useState([
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Progress', // Add chart title here
      align: 'center', // Options: 'left', 'center', 'right'
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "1st Week",
        "2nd Week",
        "3rd Week",
        "4th Week",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        color="primary"
        style={{ color: "black" }}
      >
        Back to Dashboard
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box>
                <img
                  src="https://w0.peakpx.com/wallpaper/23/429/HD-wallpaper-blue-abstract-lines-background-banner-background-on-lovepik.jpg"
                  alt="account-banner"
                  style={{ height: 100, width: "100%" }}
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
                <Grid item xs={2}>
                  <Box p={2} sx={{ mt: -8 }}>
                    <Avatar
                      alt="user-name"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOme6vZXapI-HTNJXRwstlO_vjjF59Wt6cQ&s"
                      sx={{ height: 100, width: 100, borderRadius: 2, mb: 1 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={10} sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    sx={{ p: 1, px: 2, borderRadius: 5, marginRight: 2 }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    sx={{ p: 1, px: 1, borderRadius: 1 }}
                    href="https://www.linkedin.com/"
                  >
                    <LinkedInIcon />
                  </Button>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  fontWeight: "bold",
                  m: 1,
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                Personal info
              </Typography>

              <Grid container spacing={2} paddingY={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlineIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        Raman@gmail.com
                      </Typography>
                      <Typography variant="body2">Mail Address</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PermIdentityIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        Raman P
                      </Typography>
                      <Typography variant="body2">Name</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MaleIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        Male
                      </Typography>
                      <Typography variant="body2">Gender</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2} paddingY={2}>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlineIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        9887267898
                      </Typography>
                      <Typography variant="body2">Contact Number</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PermIdentityIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        18 May 2005
                      </Typography>
                      <Typography variant="body2">Date of Birth</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MaleIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        603204
                      </Typography>
                      <Typography variant="body2">Pin Code</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={3}>
                <Grid item xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        20/1 Km Street, MM Nagar Chengalpattu
                      </Typography>
                      <Typography variant="body2">Address</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={2}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    m: 1,
                    fontSize: "20px",
                    color: "#000",
                  }}
                >
                  Institute Info
                </Typography>
              </Grid>
              <Grid container spacing={2} paddingY={2}>
                <Grid item md={3} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MenuBookIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        Python Full Course
                      </Typography>
                      <Typography variant="body2">Course</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Diversity1Icon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        Batch "A"
                      </Typography>
                      <Typography variant="body2">Batch</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BoyIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        100098
                      </Typography>
                      <Typography variant="body2">Roll Number</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RememberMeIcon style={{ marginRight: "8px" }} />
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        LMSSTU231
                      </Typography>
                      <Typography variant="body2">Student ID</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    m: 1,
                    fontSize: "20px",
                    color: "#000",
                  }}
                >
                  Documents
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            sx={{ fontWeight: "bold", m: 1, fontSize: "20px", color: "#000" }}
          >
            Academic Info
          </Typography>
          <Grid container spacing={2} paddingY={4} paddingLeft={3}>
            <Grid item xs={12} md={6} sm={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PercentIcon style={{ marginRight: "8px", color: "orange" }} />
                <div>
                  <Typography
                    variant="body1"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    75%
                  </Typography>
                  <Typography variant="body2">Total Percentage</Typography>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6} sm={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AssignmentTurnedInIcon
                  style={{ marginRight: "8px", color: "green" }}
                />
                <div>
                  <Typography
                    variant="body1"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Typography>
                  <Typography variant="body2">Project Assigned</Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sm={6} paddingLeft={3}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LibraryBooksIcon
                style={{ marginRight: "8px", color: "green" }}
              />
              <div>
                <Typography
                  variant="body1"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  4
                </Typography>
                <Typography variant="body2">Pending Course</Typography>
              </div>
            </div>
          </Grid>
          <Grid container spacing={2} paddingY={4} paddingLeft={3}>
            <Grid item xs={12} md={6} sm={6}>
              <Typography
                variant="body1"
                style={{ color: "black", fontWeight: "bold", fontSize: "15px" }}
              >
                Current Chapter / Topic
              </Typography>
              <Typography variant="body2">Chapter 2</Typography>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Box sx={{ position: "relative", width: 80, height: 80 }}>
                <CircularProgress
                  variant="determinate"
                  value={72}
                  size={70}
                  thickness={4}
                />
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  72%
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <ApexChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
