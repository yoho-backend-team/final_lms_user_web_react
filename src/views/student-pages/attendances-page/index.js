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
import Joyride from "react-joyride";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);


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
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendance, setAttendance] = useState([]);
  const [attendance_data, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();
  const date = new Date();
  const [runTour, setRunTour] = useState(true);

  const getAttedenceDetails = async (month, year) => {
    try {
      showSpinner();
      const user = getStudentDetails();
      const response = await Client.Student.attendance.get({
        userId: user.uuid, 
        month: month, 
        year: year,
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
    getAttedenceDetails(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const checkElements = setInterval(() => {
      const elementsExist =
        document.querySelector(".attendance-title") &&
        document.querySelector(".stats-container") &&
        document.querySelector(".calendar-section") &&
        document.querySelector(".ticket-button");

      if (elementsExist) {
        clearInterval(checkElements);
        setRunTour(true);
      }
    }, 500);

    return () => clearInterval(checkElements);
  }, []);

  const steps = [
    {
      target: "body",
      content: "Welcome to the Attendance page! Here, you can track your attendance records.",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: ".month-selector",
      content: "Use this dropdown to select the month for which you want to view attendance.",
      disableBeacon: true,
    },
    {
      target: ".year-selector",
      content: "Select the year for attendance records from this dropdown.",
      disableBeacon: true,
    },
    {
      target: ".calendar-section",
      content: "This calendar provides a detailed view of your daily attendance records.",
      disableBeacon: true,
    },
    {
      target: ".ticket-button",
      content: "Need help? Click here to create a support ticket related to attendance.",
      disableBeacon: true,
    },
  ];


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

<Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        disableOverlayClose
        spotlightClicks
        disableScrolling
        styles={{ options: { zIndex: 10000 } }}
      />

      <Box className={classes.card}>
        {/* Header Section */}
        <Box className="attendance-title"
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
                <FormControl fullWidth sx={{ mt: 3 }}  className="month-selector">
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

                <FormControl fullWidth sx={{ mt: 2 }}  className="year-selector">
          <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year, index) => (
              <MenuItem key={index} value={year}>{year}</MenuItem>
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
                      title: "Classes Atten",
                      color: "#FFF5D1",
                      value: `${attendance_data?.attendedClassCount ?? 0}/${totalClasses}`,
                      textColor: "#9F8015"
                    },
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
                    
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: stat.color,
                        borderRadius: "0px",
                        padding: "20px",
                        width: tabView ? "100%" : "calc(50% - 10px)",
                        boxSizing: "border-box",
                        transition: "background-color 0.3s ease",
            '&:hover': {
              backgroundColor: "#dcdcdc"
            }
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
                <Button  className="ticket-button"
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
            <Grid item xs={12} md={8} className="calendar-section">
              <CustomCalendar 
                attendanceData={attendance} 
                getAttedenceDetails={getAttedenceDetails} 
                attendance_data={attendance_data}
                setSelectedMonth={setSelectedMonth}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Attendance;