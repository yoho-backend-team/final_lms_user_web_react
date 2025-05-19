import React, { useEffect } from "react";
import { Card, Grid, Box, Avatar, Typography, Button } from "@mui/material";
import { StudentBg1, BranchIcon, UpdateCardBg } from "utils/images";
import {
  Assessment,
  CheckCircle,
  Devices,
  NearbyError,
  Podcasts,
} from "@mui/icons-material";
import AttendanceCard from "features/instructor-pages/home-page/components/AttedenceCard";
import UpdatesCard from "features/student-pages/home-page/components/UpdatesCard";
import { useTheme } from "@emotion/react";
import TicketCard from "features/instructor-pages/home-page/components/TicketCard";
import CourseProgressCard from "features/instructor-pages/home-page/components/courseProgressCard";
import { useTabResponsive } from "utils/tabResponsive";
import {
  getBranchDetails,
  getInstituteDetails,
  getInstructorDetails,
} from "store/atoms/authorized-atom";
import Client from "../../../api/index";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorDashboard, selectLoading } from "features/instructor-pages/home-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import getAllReports from "features/instructor-pages/home-page/redux/thunks";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { Link } from "react-router-dom";
import { useSocket } from "context/instructorSocket";
import { addNotification } from "features/common/redux/slices";
import { selectNotificationList } from "features/common/redux/selector";
import BackgroundImage from 'assets/images/background/instructor.png'; 
import ReactTour from 'reactour';

const InstructorDashBoard = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectInstructorDashboard);
  const loading = useSelector(selectLoading);
  const theme = useTheme();
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const socket = useSocket();
  const NotificationList = useSelector(selectNotificationList);
  const instructor = getInstructorDetails();

  const fetchReports = async () => {
    try {
      showSpinner();
      await dispatch(getAllReports());
      const response = await Client.Instructor.notification.get();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    const handleNotification = (notification) => {
      dispatch(addNotification(notification));
    };
    socket?.on("receiveNotification", handleNotification);

    return () => {
      socket?.off("receiveNotification", handleNotification);
    };
  }, [socket]);

  useEffect(() => {
    fetchReports();
  }, [dispatch]);

  // Tour Steps
  const steps = [
    {
      selector: '.MainGrid-1',
      content: 'This is your profile section where you can view your details.',
      highlight: true,
    },
    {
      selector: '.MainGrid-2',
      content: 'Here you can see your attendence,classes and their statuses.',
      highlight: true,
    },
    {
      selector: '.MainGrid-3',
      content: 'Updates and notifications will be shown here.',
      highlight: true,
    },
    {
      selector: '.MainGrid-1 .MuiButton-root',
      content: 'Click here to view or edit your profile.',
      highlight: true,
    },
    // Add more steps as needed
  ];

  const [isTourOpen, setIsTourOpen] = React.useState(true);

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
    <Grid
      container
      p={tabView ? 4 : 8}
      sx={{ p: { xs: 2, sm: tabView ? "40px 10px 10px 10px" : "48px 70px 20px 70px" } }}
      gap={tabView ? "0px" : "30px"}
      xs={12}
    >
      {/* <ReactTour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        rounded={5}
        accentColor="#5cbfba"
        className="tour" // Add a class for custom styling
      /> */}
      <Grid item xs={tabView ? 6 : 3.2} className="MainGrid-1">
        <Card style={{height:"630px", width: tabView ? "410px" : undefined}}>
          <Box>
            <img
              src={StudentBg1}
              alt="student"
              style={{ height: "120px", width: "100%", objectFit: "fill" }}
            />
          </Box>
          <Grid
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              marginTop: '20px'
            }}
          >
            <Grid xs={8}>
              <Box p={"1.5rem"} sx={{ mt: -15.5 }}>
                <Avatar
                  src={reports?.user?.image ? getImageUrl(reports?.user?.image) : profilePlaceholder}
                  alt={reports?.user?.full_name || "instructor"}
                  variant="rounded"
                  sx={{ borderRadius: "5px", width: "80px", height: "80px" }}
                />
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "black",
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      mt: 2
                    }}
                  >
                    {reports?.user?.full_name}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "poppins",
                        fontSize: 15,
                        mr: 1,
                        fontWeight: "bold"
                      }}
                    >
                      Trainee ID :
                    </Typography>
                    <Typography sx={{ fontSize: 15 }}>LMSTRN231</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="contained"
                component={Link}
                to={"/instructor/profile"}
                size="medium"
                sx={{
                  p: 3,
                  px: 4,
                  mt: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#5611B1",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    backgroundColor: "#5611B1",
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  },
                  ":active": {
                    transform: "scale(0.98)",
                  },
                }}
                onClick={() => setIsTourOpen(true)} // Start the tour on button click
              >
                View Profile
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: '20px'}}>
            <Grid item xs={12} alignItems="center">
              <Typography variant="h4" sx={{ mb: 1, mx: { xs: 3, sm: 5 } }}>
                Class
              </Typography>
            </Grid>
            {/* Class Data */}
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="h2">{reports?.classes?.[0]?.total}</Typography>
                  <Assessment sx={{ color: "#5611B1" }} />
                </Box>
                <Typography sx={{ color: "grey" }}>Total Class</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">{reports?.classes?.[0]?.online_class?.completed + reports?.classes?.[0]?.offline_class?.completed}</Typography>
                  <CheckCircle sx={{ color: "#5611B1" }} />
                </Box>
                <Typography sx={{ color: "grey" }}>Completed</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">{reports?.classes?.[0]?.online_class.pending + reports?.classes?.[0]?.offline_class.pending}</Typography>
                  <NearbyError sx={{ color: "#5611B1" }} />
                </Box>
                <Typography sx={{ color: "grey" }}>Pending</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">{reports?.classes?.[0]?.offline_class?. total}</Typography>
                  <Podcasts sx={{ color: "#5611B1" }} />
                </Box>
                <Typography sx={{ color: "grey" }}>Live Class</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">{reports?.classes?.[0]?.online_class?.total}</Typography>
                  <Assessment sx={{ color: "#5611B1" }} />
                </Box>
                <Typography sx={{ color: "grey" }}>Total Class</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2">{reports?.classes?.[0]?.offline_class?.total}</Typography>
                  <Devices sx={{ color: "#5611B1" }} />
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
                backgroundColor: "#DFC7FF",
                marginTop: '20px'
              }}
            >
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  marginTop: '20px'
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#330076",
                    }}
                  >
                    Institute Name :
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#330076",
                      mt: 2,
                      marginTop: '20px'
                    }}
                  >
                    {reports?.institute?.institute_name}, Vellore
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebBO174VR6evP4d1N0W5M8GdBBsCvzQKF4vjlfgBva26Doib78Zcc084ekRdejEZ_HnQ&usqp=CAU"
                    sx={{ height: 100, width: 100, backgroundColor: "white" }}
                  ></Avatar>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Card>
        {/* {tabView ? <CourseProgressCard /> : null} */}
      </Grid>
      {!tabView && (
        <Grid item sm={3.3} className="MainGrid-2">
          <AttendanceCard Attendance={reports?.attendance} />
          <CourseProgressCard />
          <TicketCard ticket={reports?.tickets} />
        </Grid>
      )}
      {!tabView && (
        <Grid item sm={4.8} className="MainGrid-3">
          <Card>
            <UpdatesCard image={UpdateCardBg} />
          </Card>
        </Grid>
      )}
      {tabView && (
        <Grid item xs={6}>
          {/* <UpdatesCard image={UpdateCardBg} notification={NotificationList} /> */}
          <AttendanceCard Attendance={reports?.attendance} />
          <CourseProgressCard /> 
          <TicketCard ticket={reports?.tickets} />
        </Grid>
      )}

      {tabView && (
        <Grid item xs={12} style={{marginTop:'20px'}}>
          <UpdatesCard image={UpdateCardBg} notification={NotificationList} />
        </Grid>
      )}
      <Box sx={{ display: 'flex', backdropFilter: "blur(4px)", padding: "25px 60px 26px 58px", background: "#CCCCCC29", borderRadius: "8px", justifyContent: "space-between", width: "inherit" }}>
        <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }}>Total Course Handling: </Typography>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }}>{reports?.batches?.length}</Typography>
        </Box>
        <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }}>Batch's Holding: </Typography>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }}>{reports?.courses?.length}</Typography>
        </Box>
        <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }}>
          <Box sx={{ display: "inline-flex", gap: "10px" }}>
            <Typography sx={{ color: "#000000", fontWeight: 900, fontSize: "16px" }}>Branch: </Typography>
            <Typography sx={{ color: "#000000", fontWeight: 600, fontSize: "16px" }}>{reports?.branch?.branch_identity}</Typography>
          </Box>
          <Box>
            <img src={BranchIcon} />
          </Box>
        </Box>
        <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }}>Category: </Typography>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }}>{reports?.courses?.[0]?.course?.category?.category_name}</Typography>
        </Box>
      </Box>
    </Grid>
        </Box>
  );
};

export default InstructorDashBoard;