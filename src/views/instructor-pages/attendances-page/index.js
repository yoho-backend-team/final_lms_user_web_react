import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  AttedenceMainBg,
  AttedenceHeaderImg,
  AttedenceHeader2Img,
} from "utils/images";
import InstructorAttendance from "features/instructor-pages/attendances-page/components/Calender";
import Client from "../../../api/index";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { useTabResponsive } from "utils/tabResponsive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    [theme.breakpoints.down('md')]: {
      padding: "20px 10px !important",
    },
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
  headerImgContainer: {
    position: "relative",
  },
  headerImg: {
    position: "absolute",
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
  },
  header2Img: {
    opacity: 0.5,
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
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
    width: "100%",
  },
  sidebar: {
    padding: "20px",
    [theme.breakpoints.up('md')]: {
      paddingTop: "40px",
      paddingLeft: "31px",
      overflowY: "auto",
      maxHeight: "calc(100vh - 150px)",
    },
  },
  content: {
    padding: "20px",
    [theme.breakpoints.up('md')]: {
      padding: "20px 20px 20px 0",
      overflowY: "auto",
      maxHeight: "calc(100vh - 150px)",
    },
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      width: "100%",
    },
  },
  statsBox: {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    minWidth: "200px",
    [theme.breakpoints.down('md')]: {
      minWidth: "100%",
    },
  },
  createTicketContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    paddingTop: "72px",
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileCreateTicketContainer: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginTop: '20px',
      width: '100%',
    },
  },
  filterIcon: {
    marginRight: "20px",
    marginTop: "15px",
    backgroundColor: "#5611B1",
    color: "white",
    "&:hover": {
      backgroundColor: "#4a0f9e"
    }
  },
}));

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];


const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const getCurrentMonth = () => {
  const date = new Date();
  return months[date.getMonth()];
};

const Attendance = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendance, setAttendance] = useState([]);
  const [attendance_data, setAttendanceData] = useState([]);
  const [attendance_report, setAttendance_report] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();
  const date = new Date();

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const getAttedenceDetails = async (month) => {
    try {
      showSpinner();
      const user = getInstructorDetails();
      const response = await Client.Instructor.attendance.get({
        userId: user.uuid, month: month
      });
      setAttendance_report(response?.data);
      setAttendanceData(response?.data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  const handleUpdateReports = async (month) => {
    try {
      showSpinner();
      const user = getInstructorDetails();
      const response = await Client.Instructor.attendance.get({
        userId: user.uuid, month: month
      });
      setAttendance_report(response?.data);
      setAttendanceData(response?.data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  const handleUpdateDetails = async (month) => {
    try {
      showSpinner();
      const user = getInstructorDetails();
      const response = await Client.Instructor.attendance.get({
        userId: user.uuid, month: month
      });
      setAttendanceData(response?.data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };
  
  const handleChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(newMonth);
    handleUpdateReports(newMonth);
  };

  const handleTicketView = () => {
    navigate(`/instructor/ticket?create=true`);
  };

  useEffect(() => {
    getAttedenceDetails(selectedMonth);
  }, [selectedMonth]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={classes.root}
        sx={{ padding: tabView ? "20px" : "56px 40px 17px 40px" }}
      >
        <Box className={classes.card}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              height: tabView ? "auto" : "58px",
              width: "100%",
              padding: tabView ? "20px" : "0",
            }}
          >
            <Typography
              sx={{
                color: "#282828",
                fontSize: tabView ? "20px" : "24px",
                fontWeight: 800,
                lineHeight: "24px",
                paddingBottom: tabView ? "10px" : "0",
                ml:"35px",
                mt:"27px"
              }}
            >
              Attendance
            </Typography>
            
            <IconButton 
              onClick={toggleFilter} 
              className={classes.filterIcon}
              sx={{
                ml:"-120px",
                backgroundColor: "#0D6EFD",
                borderRadius: "18px",
                padding: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#E3F2FD",
                }
              }}
            >
              <FilterListIcon  sx={{ color: "#E3F2FD" }}/>
            </IconButton>
            
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
              <Typography className={classes.monthText}>
                {selectedMonth} {date.getFullYear()}
              </Typography>
            </Box>
          </Box>

          <Grid container>
            <Grid item xs={12} md={4} className={classes.sidebar}>
              <Collapse in={filterVisible}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1, mb: 2 }}>
  {/* Month Selector */}
  <FormControl sx={{ flex: 1, border: "1px solid #2196F3", borderRadius: "8px", overflow: "hidden" }}>
    <Select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      IconComponent={ExpandMoreIcon}
      sx={{
        backgroundColor: "#E3F2FD",
        "&:hover": { backgroundColor: "#BBDEFB" },
        borderRadius: "8px",
        padding: "4px 12px",  // Reduced height
        height: "50px",  // Set a fixed height
      }}
    >
      {months.map((month, index) => (
        <MenuItem key={index} value={month}>{month}</MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Year Selector */}
  <FormControl sx={{ flex: 1, border: "1px solid #5611B1", borderRadius: "8px", overflow: "hidden" }}>
    <Select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      IconComponent={ExpandMoreIcon}
      sx={{
        backgroundColor: "white",
        "&:hover": { backgroundColor: "#F5F5F5" },
        borderRadius: "8px",
        padding: "4px 12px",  // Reduced height
        height: "50px",  // Set a fixed height
      }}
    >
      {years.map((year, index) => (
        <MenuItem key={index} value={year}>{year}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


                
              </Collapse>
              
              <Box className={classes.mobileCreateTicketContainer}>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#5611B1",
                    boxShadow: "0px 6px 34px -8px #5611B1",
                    borderRadius: "8px",
                    padding: "9px 24px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FBFBFB",
                    ":hover": { backgroundColor: "#5611B1" },
                  }}
                  component={Link}
                  to="/instructor/ticket?create=true"
                  onClick={handleTicketView}
                >
                  Create Ticket
                </Button>
              </Box>

              <Box className={classes.statsContainer}>
                <Box 
                  className={classes.statsBox}
                  sx={{ backgroundColor: "#FFE896",
                    minWidth: "180px",
                    minHeight: "120px",
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center", 
                    transition: "background-color 0.3s ease",
                    '&:hover': {
                      backgroundColor: "#FFD700"  // Brighter Yellow on Hover
                    }
                  }}
                >
                  <Typography sx={{ color: "#9F8015", fontSize: "20px", fontWeight: 600 }}>
                    Classes Atten
                  </Typography>
                  <Typography sx={{ fontSize: "40px", fontWeight: 600 }}>
                    {attendance_report?.total_class || 0}
                    <Typography component="span" sx={{ color: "#9F8015",fontSize: "40px", fontWeight: 600 }}>
                      /{attendance_report?.total_class || 0}
                    </Typography>
                  </Typography>
                </Box>

                <Box 
                  className={classes.statsBox}
                  sx={{ backgroundColor: "#B8FEBF", minWidth: "180px", minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                    transition: "background-color 0.3s ease",
                    '&:hover': {
                      backgroundColor: "#90EE90"  // Light Green on Hover
                    }
                  }}
                >
                  <Typography sx={{ color: "#2C9939", fontSize: "20px", fontWeight: 600 }}>
                    Present Days
                  </Typography>
                  <Typography sx={{ fontSize: "40px", fontWeight: 600 }}>
                    {attendance_report?.presentDays || 0}
                    <Typography component="span" sx={{ color: "#2C9939",fontSize: "40px", fontWeight: 600 }}>
                      /{attendance_report?.totalWorkingDays || 0}
                    </Typography>
                  </Typography>
                </Box>

                <Box 
                  className={classes.statsBox}
                  sx={{ backgroundColor: "#EBACAC", maxWidth: "40px", minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , 
                    transition: "background-color 0.3s ease",
                    '&:hover': {
                      backgroundColor: "#FF6B6B"  // Softer Red on Hover
                    }
                  }}
                >
                  <Typography sx={{ color: "#A04A4A", fontSize: "20px", fontWeight: 600 }}>
                    Absent Days
                  </Typography>
                  <Typography sx={{ fontSize: "40px", fontWeight: 600 }}>
                    {attendance_report?.absentDays || 0}
                    <Typography component="span" sx={{ color: "#A04A4A",fontSize: "40px", fontWeight: 600 }}>
                      /{attendance_report?.totalWorkingDays || 0}
                    </Typography>
                  </Typography>
                </Box>
              </Box>

              <Box className={classes.createTicketContainer}>
                <Button
                  sx={{
                    backgroundColor: "#5611B1",
                    boxShadow: "0px 6px 34px -8px #5611B1",
                    borderRadius: "8px",
                    padding: "9px 82px",
                    fontSize: "14px",
                    fontWeight: 500,
                    mt:"-50px",
                    color: "#FBFBFB",
                    ":hover":{
                      backgroundColor: "#5611B1",
                      
                    }
                  }}
                  component={Link}
                  to="/instructor/ticket?create=true"
                  onClick={handleTicketView}
                >
                  Create Ticket
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8} className={classes.content}>
              <InstructorAttendance 
                attendanceData={attendance} 
                getAttedenceDetails={getAttedenceDetails} 
                attendance_data={attendance_data}
                handleUpdateDetails={handleUpdateDetails}
                handleMonthChange={handleChange}
                setSelectedMonth={setSelectedMonth}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Attendance;
