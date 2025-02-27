import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function InstructorAttendance({ 
  attendance_data, 
  getAttedenceDetails, 
  handleUpdateDetails, 
  selectedMonth, 
  setSelectedMonth 
}) {
  const [runTour, setRunTour] = useState(true);
  const [calendar, setCalendar] = useState([]);

  // Convert month name to index
  const monthIndex = months.indexOf(selectedMonth);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (selectedMonth) {
      generateCalendar();
    }
  }, [selectedMonth, attendance_data]);  // Dependency array ensures updates

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, monthIndex, 1).getDay();
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

    let weeks = [];
    let currentWeek = new Array(firstDay).fill(null);

    // for (let i = 0; i < firstDay; i++) {
    //   currentWeek[i] = null;
    // }

    for (let day = 1; day <= daysInMonth; day++) {
      const weekday = (firstDay + day - 1) % 7;
      const attendanceForDate = attendance_data?.workingDays?.find((item) => {
        const itemDate = new Date(item?.date);
        return itemDate.getMonth() === monthIndex && itemDate.getDate() === day;
      });

      const attendanceStatus = attendanceForDate?.status === "present" ? "present" : "absent";
      currentWeek.push({ day, status: attendanceStatus });

      if (currentWeek.length === 7 || day === daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      setCalendar(weeks);
    }
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(newMonth);
    handleUpdateDetails(newMonth);
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => months[months.indexOf(prev) === 0 ? 11 : months.indexOf(prev) - 1]);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => months[months.indexOf(prev) === 11 ? 0 : months.indexOf(prev) + 1]);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
      <Joyride steps={[
        { target: "body", content: "Welcome to the Attendance Calendar!", placement: "center" },
        { target: "#month-selector", content: "Select a month to view attendance records." },
        { target: "#calendar-view", content: "View attendance status for each day." },
        { target: "#prev-month", content: "Go to the previous month." },
        { target: "#next-month", content: "Go to the next month." }
      ]} run={runTour} continuous showSkipButton showProgress disableOverlayClose spotlightClicks styles={{ options: { zIndex: 10000 } }}  />

      {/* Calendar View */}
      <Box id="calendar-view" sx={{ marginTop: "25px" }}>
        <Grid container spacing={1}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Grid item xs={1.71} key={day}>
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>{day}</Typography>
            </Grid>
          ))}
        </Grid>
        
        {calendar.map((week, weekIndex) => (
          <Grid container key={weekIndex} spacing={1}>
            {week.map((day, dayIndex) => (
              <Grid item xs={1.71} key={dayIndex}>
                <Card  sx={{ 
                backgroundColor: day?.status === "present" ? "rgba(59, 232, 53, 0.3)" : "transparent",
                border: day?.status === "present" ? "1px solid rgb(33, 231, 52)" :
                day?.status === "absent" ? "1px solid rgba(253, 36, 36, 0.8)" : "#f0f0f0",  // Lighter red border
                minHeight: day?.day ? "50px":'',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: '5px'
              }}> {day?.day && 
                <CardContent>
                    <Typography sx={{ textAlign: "center" }}>
                      {day?.day}
                    </Typography>
                    <Typography sx={{ fontSize:'10px', position:'absolute', fontWeight: 600 }}>
                      {day?.status === 'present' ? 'Present':''}
                    </Typography>
                  </CardContent>
              }                  
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Button id="prev-month" onClick={handlePrevMonth} startIcon={<KeyboardArrowLeftIcon />}>
          Previous
        </Button>
        <Button id="next-month" onClick={handleNextMonth} endIcon={<ChevronRightIcon />}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default InstructorAttendance;
