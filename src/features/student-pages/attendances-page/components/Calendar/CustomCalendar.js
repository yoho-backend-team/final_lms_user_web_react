import React, { useState, useEffect } from "react";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CustomCalendar({ attendanceData, getAttedenceDetails, attendance_data }) {
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    getAttedenceDetails(months[newMonth]);
  };

  const generateCalendar = () => {
    const year = new Date().getFullYear();
    const month = selectedMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const weeks = [];
    let currentWeek = Array(7).fill(null);

    // Populate first week with placeholders if needed
    for (let i = 0; i < firstDay; i++) {
      currentWeek[i] = null;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const weekday = (firstDay + day - 1) % 7;
      
      // Find the attendance status for this specific date
      const attendanceForDate = attendance_data?.formattedAttendance?.attendance?.find(
        (item) => {
          const itemDate = new Date(item?.date);
          return itemDate.getMonth() === month && 
                 itemDate.getDate() === day
        }
      );

      const attendanceStatus = attendanceForDate?.status || "Absent";

      currentWeek[weekday] = {
        day,
        status: attendanceStatus.toLowerCase()
      };

      if (weekday === 6 || day === daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    }

    // Render weeks
    return weeks.map((week, weekIndex) => (
      <Grid container key={weekIndex} spacing={1} sx={{ mb: 1 }}>
        {week.map((dayData, dayIndex) => (
          <Grid item xs key={dayIndex}>
            {dayData ? (
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: dayData.status === 'present' 
                    ? 'rgba(46, 204, 113, 0.1)' 
                    : 'rgba(231, 76, 60, 0.1)',
                  border: dayData.status === 'present' 
                    ? '1px solid rgba(46, 204, 113, 0.5)' 
                    : '1px solid rgba(231, 76, 60, 0.5)'
                }}
              >
                <CardContent 
                  sx={{ 
                    textAlign: 'center', 
                    p: 1,
                    '&:last-child': { pb: 1 } 
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', my: 0.5 }}>
                    {dayData.day}
                  </Typography>
                  <Button 
                    size="small"
                    sx={{
                      width: '100%',
                      backgroundColor: dayData.status === 'present' 
                        ? '#2ecc71' 
                        : '#e74c3c',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: dayData.status === 'present' 
                          ? '#27ae60' 
                          : '#c0392b'
                      },
                      fontSize: '0.7rem',
                      py: 0.5
                    }}
                  >
                    {dayData.status.charAt(0).toUpperCase() + dayData.status.slice(1)}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ height: '100%' }} />
            )}
          </Grid>
        ))}
      </Grid>
    ));
  };

  const handleNextMonth = () => {
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    setSelectedMonth(nextMonth);
    getAttedenceDetails(months[nextMonth]);
  };

  const handlePreviousMonth = () => {
    const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    setSelectedMonth(prevMonth);
    getAttedenceDetails(months[prevMonth]);
  };

  return (
    <Box sx={{ height: '67vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Attendance Calendar</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            IconComponent={ExpandMoreIcon}
          >
            {months.map((month, index) => (
              <MenuItem key={index} value={index}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {generateCalendar()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button 
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={handlePreviousMonth}
        >
          {months[selectedMonth === 0 ? 11 : selectedMonth - 1]}
        </Button>
        <Button 
          endIcon={<ChevronRightIcon />}
          onClick={handleNextMonth}
        >
          {months[selectedMonth === 11 ? 0 : selectedMonth + 1]}
        </Button>
      </Box>
    </Box>
  );
}

export default CustomCalendar;

