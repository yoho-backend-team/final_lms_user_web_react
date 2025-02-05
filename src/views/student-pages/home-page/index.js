import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box, Avatar } from "@mui/material";
import CourseCard from "features/student-pages/home-page/components/CourseCard";
import { useTheme } from "@emotion/react";
import AttendanceCard from "features/student-pages/home-page/components/AttendanceCard";
import PaymentsCard from "features/student-pages/home-page/components/PaymentsCard";
import UpdatesCard from "features/student-pages/home-page/components/UpdatesCard";
import ProfilePage from "../../../views/student-pages/profile-page/index.js";
import TicketStatusCard from "features/student-pages/home-page/components/TicketStatusCard.js";
import studentheaderpic from "../../../assets/images/background/studentprofile.svg";
import { getprofilewithId } from "features/student-pages/Profile-page/services/index.js";
import { getImageUrl } from "utils/common/imageUtlils.js";
import { BranchIcon } from "utils/images";
import { useSpinner } from "context/SpinnerProvider.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import studentdashboardimage from ".././../../assets/images/background/studentdashboardupdate.svg";
import dashboardtotalclass from ".././../../assets/images/icons/dashboardtotalclass.svg";
import completedclass from ".././../../assets/images/icons/completedclass.svg";
import pendingclass from ".././../../assets/images/icons/pendingclass.svg";
import liveclass from ".././../../assets/images/icons/liveclass.svg";
import offlineclass from ".././../../assets/images/icons/offlineclass.svg";
import { selectLoading, selectStudentDashboard } from "features/student-pages/home-page/redux/selectors.js";
import getAllReports from "features/student-pages/home-page/redux/thunks.js";
import { selectStudentNotifications } from "features/common/redux/studentSelector.js";
import { getInstituteDetails, getStudentDetails, getStudentInstituteDetails } from "store/atoms/authorized-atom.js";
import ReactTour from 'reactour';

const StudentDashboard = () => {
  const theme = useTheme();
  const [editProfileClicked, setEditProfileClicked] = useState(false);
  const [personalInfo, setPersonalInfo] = useState("");
  const [isTourOpen, setIsTourOpen] = useState(false);
  const Notification = useSelector(selectStudentNotifications);
  const studentDetails = getStudentInstituteDetails();

  const dispatch = useDispatch();
  const reports = useSelector(selectStudentDashboard);
  const loading = useSelector(selectLoading);
  const { showSpinner, hideSpinner } = useSpinner();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getprofilewithId();
        setPersonalInfo(response);
        // Start the tour after fetching the profile
        setIsTourOpen(true);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfileClick = () => {
    setEditProfileClicked(true);
  };

  const fetchReports = async () => {
    try {
      showSpinner();
      await dispatch(getAllReports());
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    fetchReports();
  }, [dispatch]);

  const image = getImageUrl(personalInfo.image);

  const student = {
    name: personalInfo.full_name,
    profileImage: image,
    studentID: personalInfo.id,
  };

  const instituteimage = getImageUrl(reports?.institute?.image);

  // Render ProfilePage if editProfileClicked is true
  if (editProfileClicked) {
    return <ProfilePage />;
  }

  const classesData = [
    {
      title: 'Total Class',
      value: reports?.classes?.[0]?.total,
      icon: <img src={dashboardtotalclass} alt="Total Class" />,
    },
    {
      title: 'Completed',
      value: reports?.classes?.[0]?.online_class?.completed + reports?.classes?.[0]?.offline_class?.completed,
      icon: <img src={completedclass} alt="completed class" />,
    },
    {
      title: 'Pending',
      value: reports?.classes?.[0]?.online_class.pending + reports?.classes?.[0]?.offline_class.pending,
      icon: <img src={pendingclass} alt="Pending Class" />,
    },
    {
      title: 'Live Class',
      value: reports?.classes?.[0]?.offline_class?.total,
      icon: <img src={liveclass} alt="Live class" />,
    },
    {
      title: 'Online Class',
      value: reports?.classes?.[0]?.online_class?.total,
      icon: <img src={offlineclass} alt="Online Class" />,
    },
    {
      title: 'Offline Class',
      value: reports?.classes?.[0]?.offline_class?.total,
      icon: <img src={offlineclass} alt="Offline Class" />,
    },
  ];

  const steps = [
    {
      selector: '.MainGrid-1',
      content: 'This is your profile section where you can view your details.',
    },
    {
      selector: '.MainGrid-2',
      content: 'Here you can see your courses and attendance.',
    },
    {
      selector: '.MainGrid-3',
      content: 'Updates and notifications will be shown here.',
    },
    {
      selector: '.MainGrid-1 .MuiButton-root',
      content: 'Click here to view or edit your profile.',
    },
    // Add more steps as needed
  ];

  return (
    <>
      <ReactTour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        rounded={5}
        accentColor="#5cbfba"
        className="tour" // Add a class for custom styling
      />
      <Grid container p={12}>
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
                      {reports?.user ? `${reports.user.first_name} ${reports.user.last_name}` : 'Unknown User'}
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
                        {reports?.user?.id}
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
                <Typography
                  variant="h4"
                  sx={{
                    color: 'black',
                    fontFamily: 'Nunito Sans',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 900,
                    lineHeight: 'normal',
                    mb: 1,
                    mx: { xs: 3, sm: 5 },
                  }}
                >
                  Class
                </Typography>
              </Grid>

              <Grid container spacing={2}>
                {classesData.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 2,
                        mt: 1,
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            color: 'var(--Colour-Neutral-1, #000)',
                            fontFeatureSettings: "'clig' off, 'liga' off",
                            fontFamily: 'Poppins',
                            fontSize: '20.921px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            letterSpacing: '-0.785px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.value}
                        </Typography>
                        <div style={{ width: 24, height: 24 }}>
                          {item.icon}
                        </div>
                      </Box>
                      <Typography
                        sx={{
                          color: "#8E8E8E",
                          fontFeatureSettings: "'clig' off, 'liga' off",
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
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
                      {reports?.institute?.institute_name}, Vellore
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ justifyContent: "center", display: "flex" }}
                  >
                    <Avatar
                      src={instituteimage}
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
        <Grid item xs={12} sm={6} md={5.5} lg={2} xl={4} className="MainGrid-2">
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
        <Grid item xs={12} sm={4} md={8} lg={2} xl={4} className="MainGrid-3">
          <UpdatesCard image={studentdashboardimage} notification={Notification} />
        </Grid>

        <Box sx={{ display: 'flex', backdropFilter: "blur(4px)", padding: "25px 60px 26px 58px", background: "#CCCCCC29", borderRadius: "8px", justifyContent: "space-between", width: "inherit", marginTop: '20px' }} >
          <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }} >
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }} >Course name: </Typography>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }} >{reports?.courses?.[0]?.course?.course_name}</Typography>
          </Box>
          <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }} >
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }} >Total Instructors: {reports?.batches?.[0]?.batch?.classes?.[0]?.instructors?.length}</Typography>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }} >{personalInfo?.courses?.length}</Typography>
          </Box>
          <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }} >
            <Box sx={{ display: "inline-flex", gap: "10px" }} >
              <Typography sx={{ color: "#000000", fontWeight: 900, fontSize: "16px" }} >Branch: </Typography>
              <Typography sx={{ color: "#000000", fontWeight: 600, fontSize: "16px" }} >{reports?.branch?.branch_identity}</Typography>
            </Box>
            <Box>
              <img src={BranchIcon} alt="branchicon" />
            </Box>
          </Box>
          <Box sx={{ padding: "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px", display: "flex", gap: "10px", alignItems: "center" }} >
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 900 }} >Projects: </Typography>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }} >{reports?.courses?.[0]?.course?.category?.category_name}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default StudentDashboard;