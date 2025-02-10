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
  StudentAttendanceHeader,
  StudentAttendanceHeader2
} from "utils/images";
import Client from "../../../api/index";
import { useTabResponsive } from "utils/tabResponsive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import CustomCalendar from "features/student-pages/attendances-page/components/Calendar/CustomCalendar";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { useNavigate } from "react-router-dom";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh", 
    width: "100vw",
    overflow: "hidden",
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
  scrollContainer: {
    height: "calc(100vh - 120px)", 
    overflowY: "auto", 
    paddingRight: "10px", 
    "@media (max-width: 600px)": {
      height: "calc(100vh - 80px)", 
    },
  },
  sidebar: {
    paddingTop: "40px",
    paddingLeft: "31px",
    overflowY: "auto",
    maxHeight: "100%",
  },
  content: {
    padding: "20px 20px 20px 0",
    height: "100%",
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "15px",
    },
  },
});

const Attendance = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [attendance, setAttendance] = useState([]);
  const [attendance_data, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();
  const date = new Date();

  const getAttedenceDetails = async (month) => {
    try {
      showSpinner();
      const user = getStudentDetails();
      const response = await Client.Student.attendance.get({
        userId: user.uuid, 
        month: month, 
        instituteId: user.institute_id?.uuid
      });
      setAttendanceData(response?.data);
      setAttendance(response?.data?.attendanceDetails || []);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };
 console.log(attendance,"att")
  
  const handleChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(newMonth);
  };

  useEffect(() => {
    getAttedenceDetails(selectedMonth);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
console.log(attendance_data,'attendance')
  const totalClasses = (attendance_data?.onlineClassCount ?? 0) + (attendance_data?.offlineClassCount ?? 0);

  return (
    <Box
      className={classes.root}
      sx={{ 
        padding: tabView ? "20px" : "56px 40px 17px 40px",
      }}
    >
      <Box className={classes.card}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 31px",
          }}
        >
          <Typography
            sx={{
              color: "#282828",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            Attendance
          </Typography>
          {!tabView && (
            <Box>
              <img
                src={StudentAttendanceHeader}
                alt="Header 1"
                style={{ position: "absolute", top: 0, right: 0 }}
              />
              <Typography 
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {months[selectedMonth]} {date.getFullYear()}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Scrollable Content Container */}
        <Box className={classes.scrollContainer}>
          <Grid container spacing={2}>
            {/* Sidebar Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: "0 20px" }}>
                {/* Month Selector */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={selectedMonth}
                    onChange={handleChange}
                    IconComponent={ExpandMoreIcon}
                  >
                    {months.map((month, index) => (
                      <MenuItem key={index} value={index}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Stats Boxes */}
                <Box
                 sx={{
                
                  mt: "20px",
    
                }}
                 className={classes.statsContainer}>
                  {[
                    {
                      title: "Present days",
                      color: "#D5FFDA",
                      value: `${attendance_data?.totalPresentDays ?? 0}/${attendance_data?.totalWorkingDays ?? 0}`,
                      textColor: "#2C9939"
                    },
                    {
                      title: "Absent days",
                      color: "#FFD5D5",
                      value: attendance_data?.totalAbsentDays ?? 0,
                      textColor: "#A04A4A"
                    },
                    {
                      title: "Classes Atten",
                      color: "#FFF5D1",
                      value: `${attendance_data?.attendedClassCount ?? 0}/${totalClasses}`,
                      textColor: "#9F8015"
                    }
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: stat.color,
                        borderRadius: "10px",
                        padding: "20px",
                        width: tabView ? "100%" : "calc(50% - 10px)",
                        boxSizing: "border-box"
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: stat.textColor, 
                          fontSize: "18px", 
                          mb: 2 
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontSize: "32px", 
                          fontWeight: "bold" 
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Create Ticket Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 10,
                    backgroundColor: "#0D6EFD",
                    color: "white",
                    '&:hover': {
                      backgroundColor: "#0D6EFD",
                    }
                  }}
                  onClick={() => navigate("/student/tickets?create=true")}
                >
                  Create Ticket
                </Button>
              </Box>
            </Grid>

            {/* Calendar Section */}
            <Grid item xs={12} md={8}>
              <CustomCalendar 
                attendanceData={attendance} 
                getAttedenceDetails={getAttedenceDetails} 
                attendance_data={attendance_data}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Attendance;
