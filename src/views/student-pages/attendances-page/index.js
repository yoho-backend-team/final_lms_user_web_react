import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  AttedenceMainBg,
  AttedenceHeaderImg,
  AttedenceHeader2Img,
} from "utils/images";
import Client from "../../../api/index";
import { useTabResponsive } from "utils/tabResponsive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import CustomCalendar from "features/student-pages/attendances-page/components/Calendar/CustomCalendar";
import { getStudentDetails } from "store/atoms/authorized-atom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  card: {
    backgroundImage: `url(${AttedenceMainBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    borderRadius: "18px",
    position: "relative",
    overflow: "hidden",
  },
  headerImg: {
    position: "absolute",
  },
  header2Img: {
    opacity: 0.5,
  },
  monthText: {
    position: "absolute",
    color: "white",
    top: "7px",
    right: 0,
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "20px",
    fontWeight: 700,
  },
  formControl: {
    minWidth: 120,
  },
  sidebar: {
    paddingTop: "40px",
    paddingLeft: "31px",
    overflowY: "auto",
    maxHeight: "calc(100vh - 150px)",
  },
  content: {
    padding: "20px 20px 20px 0",
    overflowY: "auto",
    maxHeight: "calc(100vh - 150px)",
  },
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getCurrentMonth = () => {
  const date = new Date();
  return months[date.getMonth()];
};

const Attendance = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
  const [attendance, setAttendance] = useState([]);
  const [ attendance_data,setAttendanceData] = useState([])
  const [loading, setLoading] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const date = new Date()

  const getAttedenceDetails = async (month) => {
    try {
      showSpinner();
      const user = getStudentDetails();
      const response = await Client.Student.attendance.get({
        userId: user.uuid, month: selectedMonth  , instituteId: user.institute_id?.uuid , user: user?._id     
      });
      console.log(response,"respoonse")
      setAttendanceData(response?.data)
    } catch (error) {
      toast.error(error?.message)
    } finally {
      hideSpinner();
    }
  };
  
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    getAttedenceDetails(event.target.value)
  };

  useEffect(() => {
    getAttedenceDetails(selectedMonth);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  console.log(attendance_data,"attendance")

  const totalClasses = (attendance_data?.onlineClassCount ?? 0) + (attendance_data?.offlineClassCount ?? 0);

  return (
    <Box
      className={classes.root}
      sx={{ padding: tabView ? "36px 20px 20px 20px" : "56px 40px 17px 40px" }}
    >
      <Box className={classes.card}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            height: "58px",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#282828",
                fontSize: "24px",
                fontWeight: 800,
                lineHeight: "24px",
                pt: "34px",
                pl: "31px",
              }}
            >
              Attendance
            </Typography>
          </Box>
          <Box className={classes.headerImgContainer}>
            <img
              src={AttedenceHeaderImg}
              className={classes.headerImg}
              alt="Header 1"
            />
            <img
              src={AttedenceHeader2Img}
              className={classes.header2Img}
              alt="Header 2"
            />
            <Typography className={classes.monthText}>{months[selectedMonth]}{date.getFullYear()}</Typography>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={tabView ? 12 : 4} className={classes.sidebar}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pr: "40px",
              }}
            >
              <FormControl className={classes.formControl}>
                <Select
                  id="month-select"
                  size="small"
                  value={selectedMonth}
                  onChange={handleChange}
                  IconComponent={() => (
                    <ExpandMoreIcon sx={{ color: "black" }} />
                  )}
                  sx={{
                    border: "1px solid #5611B1",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    display: "flex",
                    padding: "8px 14px",
                    gap: "8px",
                  }}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: tabView ? "flex" : "none" }}>
                <Button
                  component={Link}
                  to='/student/create-ticket'
                  sx={{
                    backgroundColor: "#5611B1",
                    boxShadow: "0px 6px 34px -8px #5611B1",
                    borderRadius: "8px",
                    padding: tabView ? "9px 24px" : "9px 82px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FBFBFB",
                  }}
                >
                  Create Ticket
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                pt: "20px",
                display: tabView ? "inline-flex" : "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  padding: tabView
                    ? "36px 20px 20px 20px"
                    : "36px 35px 36px 27px",
                  backgroundColor: "#B8FEBF",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#2C9939",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Present days
                    </Typography>
                  </Box>
                  <Box sx={{ display: "inline-flex" }}>
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        color: "blacks",
                      }}
                    >
                      {attendance_data?.totalPresentDays}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        color: "#2C9939",
                      }}
                    >
                      /{attendance_data?.totalWorkingDays}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "36px 35px 36px 27px",
                  backgroundColor: "#EBACAC",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#A04A4A",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Absent days
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        color: "blacks",
                      }}
                    >
                      {attendance_data?.totalAbsentDays}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "36px 35px 36px 27px",
                  backgroundColor: "#FFE896",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#9F8015",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Classes Atten
                    </Typography>
                  </Box>
                  <Box sx={{ display: "inline-flex" }}>
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        color: "blacks",
                      }}
                    >
                      {attendance_data?.attendedClassCount}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        color: "#9F8015",
                      }}
                    >
                      /{totalClasses}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: tabView ? "none" : "flex",
                flexDirection: "column-reverse",
                pt: "72px",
              }}
            >
              <Box>
                <Button
                  sx={{
                    backgroundColor: "#5611B1",
                    boxShadow: "0px 6px 34px -8px #5611B1",
                    borderRadius: "8px",
                    padding: "9px 82px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FBFBFB",
                    ":hover":{
                      backgroundColor: "#5611B1",
                    }
                  }}
                >
                  Create Ticket
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={tabView ? 12 : 8} className={classes.content}>
            <CustomCalendar attendanceData={attendance} getAttedenceDetails={getAttedenceDetails} attendance_data={attendance_data}  />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Attendance;
