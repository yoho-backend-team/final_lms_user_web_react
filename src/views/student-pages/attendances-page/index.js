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
  IconButton,
  Collapse,
  Paper,
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
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import CustomCalendar from "features/student-pages/attendances-page/components/Calendar/CustomCalendar";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { useNavigate } from "react-router-dom";
import Joyride from "react-joyride";
import { getAllAttendances } from "features/student-pages/attendances-page/redux/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectStudentAttendance } from "features/student-pages/attendances-page/redux/selectors";

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
  filterContainer: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
});

const Attendance = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendance, setAttendance] = useState([]);
  const [attendance_data, setAttendanceData] = useState([]);
  const attendanceData1 = useSelector( selectStudentAttendance)
  const [loading, setLoading] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const date = new Date();
  const [runTour, setRunTour] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const getAttedenceDetails = async (month, year) => {
    try {
      showSpinner();
      const user = await getStudentDetails();
      const params_data = {
        userId: user?.uuid, 
        month: month, 
        year: year,
        instituteId: user?.institute_id?.uuid
      }
      dispatch(getAllAttendances(params_data))
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };
  
  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(newMonth, selectedYear);
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    getAttedenceDetails(selectedMonth, newYear);
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
      target: ".filter-button",
      content: "Click this filter icon to show month and year selection options.",
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

  const totalClasses = (attendanceData1?.onlineClassCount ?? 0) + (attendanceData1?.offlineClassCount ?? 0);

  return (
    <Box
      className={classes.root}
      sx={{ 
        padding: tabView ? "20px" : "56px 40px 17px 40px",
      }}
    >
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                color: "#282828",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Attendance
            </Typography>
            <IconButton 
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                ml:"25px",
                backgroundColor: "#0D6EFD",
                borderRadius: "18px",
                padding: "8px",
               
              }}
            >
              <FilterListIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
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
                {months[selectedMonth]} {selectedYear}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Filter Section */}
        <Collapse in={showFilters}>
          <Box 
            sx={{ 
              padding: "0 31px",
              marginBottom: 2,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            
              {/* Month Selector */}
              <FormControl sx={{ minWidth: 180 }}>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  IconComponent={ExpandMoreIcon}
                  className="month-selector"
                  sx={{
                    backgroundColor: "#E3F2FD",
                    '&:hover': {
                      backgroundColor: "#BBDEFB",
                    },
                    borderRadius: "8px",
                    border: "1px solid #2196F3",
                  }}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Year Selector */}
              <FormControl sx={{ minWidth: 180 }}>
                <Select 
                  value={selectedYear} 
                  onChange={handleYearChange}
                  className="year-selector"
                  sx={{
                    backgroundColor: "#E8F5E9",
                    '&:hover': {
                      backgroundColor: "#C8E6C9",
                    },
                    borderRadius: "8px",
                    border: "1px solid #4CAF50",
                  }}
                >
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
           
          </Box>
        </Collapse>

        {/* Scrollable Content Container */}
        <Box className={classes.scrollContainer}>
          <Grid container spacing={2}>
            {/* Sidebar Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: "0 20px" }}>
                {/* Stats Boxes */}
                <Box
                  sx={{
                    mt: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                  className={classes.statsContainer}
                >
                  {[
                    {
                      title: "Classes Atten",
                      color: "#FFE896",
                      value: `${attendanceData1?.attendedClassCount ?? 0}/${totalClasses}`,
                      textColor: "#9F8015",
                      hoverColor: "#FFD700",
                    },
                    {
                      title: "Present Days",
                      color: "#B8FEBF",
                      value: `${attendanceData1?.totalPresentDays ?? 0}/${attendanceData1?.totalWorkingDays ?? 0}`,
                      textColor: "#2C9939",
                      hoverColor: "#90EE90",
                    },
                    {
                      title: "Absent Days",
                      color: "#EBACAC",
                      value: attendanceData1?.totalAbsentDays ?? 0,
                      textColor: "#A04A4A",
                      hoverColor: "#FF6B6B",
                    },
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: stat.color,
                        minWidth: "195px",
                        minHeight: "120px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: stat.hoverColor,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: stat.textColor,
                          fontSize: "20px",
                          fontWeight: 600,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography sx={{ fontSize: "40px", fontWeight: 600 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Create Ticket Button */}
                <Button  
                  className="ticket-button"
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
                attendance_data={attendanceData1}
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