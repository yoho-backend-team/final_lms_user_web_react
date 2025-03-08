import React, { useState } from "react"; 
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
  useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function InstructorAttendance({ attendance_data, getAttedenceDetails, handleUpdateDetails }) {
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [runTour, setRunTour] = useState(true);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const tourSteps = [
    { target: "body", content: "Welcome to the Attendance Calendar!", placement: "center" },
    { target: "#month-selector", content: "Select a month to view attendance records." },
    { target: "#calendar-view", content: "View attendance status for each day." },
    { target: "#prev-month", content: "Go to the previous month." },
    { target: "#next-month", content: "Go to the next month." }
  ];

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(months[newMonth]);
    handleUpdateDetails(months[newMonth]);
  };

  const generateCalendar = () => {
    const firstDay = new Date(new Date().getFullYear(), selectedMonth, 1).getDay();
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate();
    
    const weeks = [];
    let currentWeek = Array(7).fill(null);

    for (let i = 0; i < firstDay; i++) {
      currentWeek[i] = null;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const weekday = (firstDay + day - 1) % 7;
      const attendanceForDate = attendance_data?.workingDays?.find((item) => {
        const itemDate = new Date(item?.date);
        return itemDate.getMonth() === selectedMonth && itemDate.getDate() === day;
      });

      const attendanceStatus = attendanceForDate?.status === "present" ? "present" : "";
      currentWeek[weekday] = { day, status: attendanceStatus };

      if (weekday === 6 || day === daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    }

    return weeks.map((week, weekIndex) => (
      <Grid container key={weekIndex} spacing={1} sx={{ mb: 1 }}>
        {week.map((dayData, dayIndex) => (
          <Grid item xs key={dayIndex}>
            {dayData ? (
              <Card 
              sx={{ 
                height: "100%",
                backgroundColor: dayData.status === "present" ? "rgba(46, 204, 113, 0.1)" : "transparent",
                border: "2px solid rgba(242, 128, 128, 0.5)",  // Lighter red border
                borderRadius: "1px",
                padding: "5px"
              }}
              >
                <CardContent sx={{ textAlign: "center", p: 2 ,height:"90px"}}>
                  <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex]}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", my: 0.5 }}>
                    {dayData.day}
                  </Typography>
                  {dayData.status === "present" && (
                    <Button 
                      size="small"
                      sx={{
                        width: "100%",
                        backgroundColor: "#2ecc71",
                        color: "white",
                        '&:hover': {
                          backgroundColor: "#27ae60"
                        },
                        fontSize: "0.7rem",
                        py: 0.5
                      }}
                    >
                      Present
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ height: "100%" }} />
            )}
          </Grid>
        ))}
      </Grid>
    ));
  };

  return (
    <Box sx={{ height: "67vh", display: "flex", flexDirection: "column", p: 2 }}>
      {/* <Joyride steps={tourSteps} run={runTour} continuous showSkipButton showProgress disableOverlayClose spotlightClicks styles={{ options: { zIndex: 10000 } }} /> */}
      
      <Box sx={{ flexGrow: 1, overflowY: "auto" }} id="calendar-view">
        {generateCalendar()}
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button id="prev-month" startIcon={<KeyboardArrowLeftIcon />}>Previous</Button>
        <Button id="next-month" endIcon={<ChevronRightIcon />}>Next</Button>
      </Box>
    </Box>
  );
}

export default InstructorAttendance;
