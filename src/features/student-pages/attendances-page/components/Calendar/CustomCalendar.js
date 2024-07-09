import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton
} from '@mui/material';
import design from "../../../../../assets/images/icons/studentattendance.png"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Client from "../../../../../api/index";
import { useSpinner } from 'context/SpinnerProvider';
import { getStudentBranchDetails, getStudentDetails, getStudentInstituteDetails } from 'store/atoms/authorized-atom';


function StudentAttendance() {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    backgroundColor: "#F2F2F2",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }));

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [attendance, setAttendance] = useState({});
  const [selectedCalenderMonth, setSelectedCalenderMonth] = useState(
    new Date().getMonth(),
  );

  const [globalAttendance, setGlobalAttendance] = useState('');
  const { showSpinner, hideSpinner } = useSpinner()
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

  const attendanceOptions = ["Present", "Absent"];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleCalenderMonthChange = (event) => {
    setSelectedCalenderMonth(event.target.value);
  };

  const handleGlobalAttendanceChange = (event) => {
    const status = event.target.value;
    setGlobalAttendance(status);

    const daysInMonth = getDaysInMonth(
      new Date().getFullYear(),
      selectedCalenderMonth,
    );
    const newAttendance = {};
    for (let i = 1; i <= daysInMonth; i++) {
      newAttendance[i] = status;
    }
    setAttendance(newAttendance);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedCalenderMonth);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), selectedCalenderMonth, i);
      const dayOfWeek = daysOfWeek[date.getDay()];
 
      let attendanceStatus = '';
      if (dayOfWeek === 'Sunday') {
        attendanceStatus = 'Holiday';
      } else {
        if (attendance && attendance.length > 0) {
          const month_attendance = attendance?.formattedAttendance?.attendance
          const dayAttendance = month_attendance.find(item => new Date(item.date).getDate() === i);
     
          if (dayAttendance) {
            attendanceStatus = dayAttendance.status;
          } else {
            attendanceStatus = 'absent';
          }
        } else {
          attendanceStatus = 'absent';
        }
      }
 
      const isHoliday = dayOfWeek === 'Sunday';
 
      days.push(
        <Grid item xs={isSmallScreen ? 12 : 2.4} key={i}>
          <Card
            sx={{
              borderRadius: "8.659px",
              border: "0.5px solid #CDCDCD",
              flexShrink: 0,
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: "11.5px",
                  fontWeight: 400,
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  color: "black",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                }}
              >
                {dayOfWeek}
              </Typography>
              <Typography
                sx={{ fontSize: "21px", fontWeight: "300", textAlign: "end" }}
              >
                {i}
              </Typography>
              <Button
                sx={{
                  backgroundColor: attendanceStatus === ''
                    ? 'white'
                    : isHoliday
                    ? '#FEFFC4'
                    : attendanceStatus === 'Present'
                    ? '#D2FDD6'
                    : '#FDDED2',
                  color: attendanceStatus === ''
                    ? '#666666'
                    : isHoliday
                    ? '#BEA000'
                    : attendanceStatus === 'Present'
                    ? '#14BC10'
                    : '#FF4B4B',
                  padding: '5px 9px',
                  borderRadius: '8.659px',
                  width: '58px',
                  height: '18px',
                  alignItems: 'center',
                  gap: '8.765px',
                  flexShrink: 0,
                }}
              >
                {attendanceStatus}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    }
 
    return days;
  };
 

  useEffect(() => {
    const getAttedence = async () => {
      try {
        const user = getStudentDetails();
        const response = await Client.Student.attendance.get({ instituteId: user.institute_id?.uuid , month:selectedMonth});  
        setAttendance(response?.data);
        console.log(response)
      } catch (error) {
        console.log(error, "error");
      }
    }
    getAttedence();
  }, []);

  console.log(attendance,"attendance",attendance?.formattedAttendance?.[months[selectedMonth]])

  return (
    <StyledPaper elevation={3}>
      <Card>
        <Grid container spacing={2} sx={{ padding: "30px" }}>
          <Grid item xs={isSmallScreen ? 12 : 4}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "#282828",
                fontFamily: "Nunito Sans",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 800,
              }}
            >
              Attendance
            </Typography>
            <Grid
              item
              xs={12}
              md={6}
              style={{ position: "relative", textAlign: "right" }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={design}
                  alt="design"
                  style={{
                    width: "auto",
                    height: "auto",
                    marginBottom: "40px",
                    alignItems: "flex-end",
                    marginLeft: "180%",
                    marginTop: "-90%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "350%",
                    left: "565%",
                    transform: "translate(-50%, 50%)",
                    padding: "8px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#FFF",
                      fontFamily: "Figtree",
                      fontSize: "20px",
                      fontWeight: 700,
                      lineHeight: "normal",
                      textAlign: "center",
                      minWidth: "200px",
                    }}
                  >
                    {months[selectedMonth]} {new Date().getFullYear()}
                  </Typography>
                </div>
              </div>
            </Grid>
            <FormControl
              style={{
                marginLeft: "5px",
                borderRadius: "8px",
                border: "1px solid #0D6EFD",
                background: "#FFF",
              }}
            >
              <Select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card
                  style={{
                    borderRadius: "10px",
                    background: "#D5FFDA",
                    Height: "150px",
                    padding: "36px 35px 36px 27px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        color: "#2C9939",
                        fontFamily: "Nunito Sans",
                        fontSize: "19px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Present days
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#000",
                          fontFamily: "Barlow Condensed",
                          fontSize: "40px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.8px",
                          marginRight: "5px",
                        }}
                      >
                        {attendance?.data?.totalPresentDays}
                      </Typography>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#2C9939",
                          fontFamily: "Barlow Condensed",
                          fontSize: "40px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.8px",
                          marginRight: "5px",
                        }}
                      >
                        /
                      </Typography>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#2C9939",
                          fontFamily: "Barlow Condensed",
                          fontSize: "24px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.48px",
                        }}
                      >
                        {attendance?.totalWorkingDays}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card
                  style={{
                    borderRadius: "10px",
                    background: "#FFD5D5",
                    Height: "150px",
                    padding: "36px 35px 36px 27px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        color: "#A04A4A",
                        fontFamily: "Nunito Sans",
                        fontSize: "19px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Absent days
                    </Typography>
                    <Typography
                      variant="h3"
                      style={{
                        color: "#000",
                        fontFamily: "Barlow Condensed",
                        fontSize: "40px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        marginRight: "5px",
                      }}
                    >
                      {attendance?.totalAbsentDays}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card
                  style={{
                    borderRadius: "10px",
                    background: "#FFF5D1",
                    Height: "150px",
                    padding: "17px 13px 36px 33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        color: "#9F8015",
                        fontFamily: "Nunito Sans",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "24px",
                      }}
                    >
                      Total class attend by Student
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#000",
                          fontFamily: "Barlow Condensed",
                          fontSize: "40px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.8px",
                          marginRight: "5px",
                        }}
                      >
                        {attendance?.totalPresentDays}
                      </Typography>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#9F8015",
                          fontFamily: "Barlow Condensed",
                          fontSize: "40px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.8px",
                          marginRight: "5px",
                        }}
                      >
                        /
                      </Typography>
                      <Typography
                        variant="h3"
                        style={{
                          color: "#9F8015",
                          fontFamily: "Barlow Condensed",
                          fontSize: "24px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          letterSpacing: "0.48px",
                        }}
                      >
                        {attendance?.data?.totalWorkingDays}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "200px" }}>
              <Button
                component={Link}
                to="/student/create-ticket"
                variant="contained"
                style={{
                  width: "212px",
                  backgroundColor: "#0D6EFD",
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "9px 24px",
                  gap: "8px",
                  boxShadow: "0px 6px 34px -8px #0D6EFD",
                  borderRadius: "8px",
                  marginTop: "330px",
                }}
              >
                Raise Ticket
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={isSmallScreen ? 12 : 8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Grid
                    item
                    style={{
                      display: "flex",
                      marginTop: isSmallScreen ? "10px" : "30px",
                      flexDirection: isSmallScreen ? "column" : "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        marginTop: "8px",
                        color: "#000",
                        fontFamily: "Nunito Sans",
                        fontSize: isSmallScreen ? "16px" : "20px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                    >
                      Calendar View
                    </Typography>

                    <FormControl
                      style={{
                        marginLeft: isSmallScreen ? "0" : "5px",
                        marginTop: isSmallScreen ? "10px" : "0",
                        marginBottom: isSmallScreen ? "10px" : "0",
                        width: isSmallScreen ? "100%" : "auto",
                        borderRadius: "8px",
                        border: "1px solid #0D6EFD",
                        background: "#FFF",
                      }}
                    >
                      <Select
                        value={selectedCalenderMonth}
                        onChange={handleCalenderMonthChange}
                      >
                        {months.map((month, index) => (
                          <MenuItem key={index} value={index}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    style={{
                      marginTop: isSmallScreen ? "10px" : "30px",
                      marginLeft: isSmallScreen ? "0" : "20px",
                    }}
                  >
                    <FormControl
                      style={{ width: isSmallScreen ? "100%" : "200px" }}
                    >
                      <InputLabel
                        style={{
                          color: "#000",
                          fontFamily: "Figtree",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        Present & Absent
                      </InputLabel>

                      <Select
                        value={globalAttendance}
                        onChange={handleGlobalAttendanceChange}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {attendanceOptions.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ padding: "25px" }}>
                {generateDays()}
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "#7A7A7A",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "22px",
                  marginTop: "20px",
                }}
              >
                Rise a ticket if any mistake in attendance
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div style={{ position: "relative", textAlign: "right" }}>
                <IconButton edge="start" color="inherit" aria-label="previous">
                  <NavigateBeforeIcon />
                </IconButton>
                <Typography
                  style={{
                    color: "#0D6EFD",
                    fontFamily: "Nunito Sans",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                    display: "inline-block",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {months[(selectedMonth - 1 + 12) % 12]}
                </Typography>
                <Typography
                  style={{
                    color: "#0D6EFD",
                    fontFamily: "Nunito Sans",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                    display: "inline-block",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {months[selectedMonth]}
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="next">
                  <NavigateNextIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </StyledPaper>
  );
}

export default StudentAttendance;
