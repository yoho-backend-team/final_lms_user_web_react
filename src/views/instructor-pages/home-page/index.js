import { Card, Grid, Box, Avatar, Typography, Button } from "@mui/material";
import { StudentBg, StudentProfile, UpdateCardBg } from "utils/images";
import {
  Assessment,
  CheckCircle,
  Devices,
  NearbyError,
  Podcasts,
} from "@mui/icons-material";
import AttendanceCard from "features/instructor-pages/home-page/components/AttedenceCard"
import UpdatesCard from "features/student-pages/home-page/components/UpdatesCard";
import { useTheme } from "@emotion/react";
import TicketCard from "features/instructor-pages/home-page/components/TicketCard";
import CourseCard from "features/instructor-pages/home-page/components/courseCard";
import CourseProgressCard from "features/instructor-pages/home-page/components/courseProgressCard";
import { useTabResponsive } from "utils/tabResponsive";
import {
  getBranchDetails,
  getInstituteDetails,
} from "store/atoms/authorized-atom";
import { BranchIcon } from "utils/images";
import Client from "../../../api/index"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { selectInstructorDashboard, selectLoading } from "features/instructor-pages/home-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import getAllReports from "features/instructor-pages/home-page/redux/thunks";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";

const InstructorDashBoard = () => {
  const dispatch = useDispatch()
  const reports = useSelector(selectInstructorDashboard)
  const loading = useSelector(selectLoading)
  const theme = useTheme();
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner()

  const fetchReports = async () => {
    try {
    showSpinner()
    dispatch(getAllReports())
    } catch (error) {
      toast.error(error?.message)
    }finally{
     hideSpinner()
    }
   }

  useEffect(() => {
    fetchReports()
  },[dispatch])

 

  console.log(reports,"reports",loading)
  return (
    <Grid
      container
      p={tabView ? 4 : 8}
      sx={{ p: { xs: 2, sm: tabView ? "40px 10px 10px 10px" : "48px 100px 20px 100px" } }}
      gap={tabView ? "0px" : "30px"}
      xs={12}
    >
      <Grid item xs={tabView ? 6 : 3.2}>
        <Card>
          <Box>
            <img
              src={StudentBg}
              alt="student"
              style={{ height: 75, width: "100%" }}
            />
          </Box>
          <Grid
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid xs={8}>
              <Box p={2} sx={{ mt: -5 }}>
                <Avatar
                  src={ reports?.user?.image ? getImageUrl(reports?.user?.image) : profilePlaceholder  }
                  variant="square"
                  sx={{ borderRadius: 1 }}
                />

                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "black",
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {reports?.user?.full_name}
                  </Typography>

                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "poppins",
                        fontSize: 12,
                        mr: 1,
                      }}
                    >
                      Trainee ID :
                    </Typography>
                    <Typography>LMSTRN231</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ p: 1, px: 2, borderRadius: 5 }}
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
                  <Typography variant="h2">{reports?.classes?.[0]?.total}</Typography>
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
                  <Typography variant="h2">{ reports?.classes?.[0]?.online_class?.completed + reports?.classes?.[0]?.offline_class?.completed }</Typography>
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
                  <Typography variant="h2">{ reports?.classes?.[0]?.online_class.pending + reports?.classes?.[0]?.offline_class.pending }</Typography>
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
                  <Typography variant="h2">{reports?.classes?.[0]?.offline_class?.total}</Typography>
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
                  <Typography variant="h2">{reports?.classes?.[0]?.online_class?.total}</Typography>
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
                  <Typography variant="h2">{reports?.classes?.[0]?.offline_class?.total}</Typography>
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
                backgroundColor: "#DFC7FF",
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebBO174VR6evP4d1N0W5M8GdBBsCvzQKF4vjlfgBva26Doib78Zcc084ekRdejEZ_HnQ&usqp=CAU"
                    sx={{ height: 100, width: 100, backgroundColor: "white" }}
                  ></Avatar>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Card>
        {tabView ? <CourseProgressCard /> : <TicketCard ticket={reports?.tickets} />}
      </Grid>
      {!tabView && (
        <Grid item sm={3.3}>
          <AttendanceCard Attendance = { reports?.attendance } />
          <CourseProgressCard />
        </Grid>
      )}
      {!tabView && (
        <Grid item sm={4.8}>
          <Card>
            <UpdatesCard image={UpdateCardBg} />
          </Card>
        </Grid>
      )}
      {tabView && (
        <Grid item xs={6}>
          <UpdatesCard image={UpdateCardBg} />
          <AttendanceCard Attendance = { reports?.attendance } />
          <TicketCard ticket = { reports?.tickets} />
        </Grid>
      )}
      <Box sx={{ display: 'flex', backdropFilter:"blur(4px)",padding : "25px 60px 26px 58px",background:"#CCCCCC29",borderRadius:"8px", justifyContent: "space-between", width : "inherit" }} >
          <Box sx={{ padding : "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px",display:"flex", gap: "10px",alignItems: "center"}} >
              <Typography sx={{ color : "#000000", fontSize:"16px",fontWeight:900}} >Total Course Handling: </Typography>
              <Typography sx={{ color : "#000000", fontSize: "16px", fontWeight:600}} >{reports?.batches?.length}</Typography>
          </Box>
          <Box sx={{ padding : "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px",display:"flex", gap: "10px", alignItems: "center"}} >
            <Typography sx={{ color : "#000000", fontSize: "16px", fontWeight: 900 }} >Batch's Holding: </Typography>
            <Typography sx={{ color : "#000000", fontSize: "16px", fontWeight: 600}} >{reports?.courses?.length}</Typography>
          </Box>
          <Box sx={{ padding : "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px",display:"flex", gap: "10px", alignItems: "center"}} >
            <Box sx={{ display: "inline-flex", gap: "10px"}} >
              <Typography sx={{ color: "#000000", fontWeight: 900, fontSize: "16px"}} >Branch: </Typography>
              <Typography sx={{ color : "#000000", fontWeight:  600, fontSize: "16px"}} >{reports?.branch?.branch_identity}</Typography>
            </Box>
            <Box>
              <img src={BranchIcon} />
            </Box>
          </Box>
          <Box sx={{ padding : "10px 19px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.08)", borderRadius: "27px",display:"flex", gap: "10px", alignItems: "center"}} >
            <Typography sx={{ color : "#000000", fontSize: "16px", fontWeight: 900}} >Category: </Typography>
            <Typography sx={{ color : "#000000", fontSize: "16px", fontWeight: 600}} >{reports?.courses?.[0]?.course?.category?.category_name}</Typography>
          </Box>
      </Box>
    </Grid>
  );
};

export default InstructorDashBoard;
