import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Typography, Card, CardContent, Grid, useMediaQuery, useTheme } from '@mui/material';

function StudentAttendance() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height:"auto",
    marginLeft: 'auto',
    marginRight: 'auto',
    background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)'
  }));

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [attendance, setAttendance] = useState({});
  const [globalAttendance, setGlobalAttendance] = useState('');

  // Array of months
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Array of attendance options
  const attendanceOptions = ['Present', 'Absent'];

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Function to handle attendance change for a specific day
  const handleAttendanceChange = (day) => {
    const currentStatus = attendance[day];
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    setAttendance({ ...attendance, [day]: newStatus });
  };

  // Function to handle global attendance change
  const handleGlobalAttendanceChange = (event) => {
    const status = event.target.value;
    setGlobalAttendance(status);

    const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
    const newAttendance = {};
    for (let i = 1; i <= daysInMonth; i++) {
      newAttendance[i] = status;
    }
    setAttendance(newAttendance);
  };

  // Function to get number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate days of the month
  const generateDays = () => {
    const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), selectedMonth, i);
      const dayOfWeek = daysOfWeek[date.getDay()];

      days.push(
        <Grid item xs={isSmallScreen ? 12 : 3} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h5">{i}</Typography>
              <Typography variant="subtitle1">{dayOfWeek}</Typography>
              <Button
                variant="contained"
                color={attendance[i] === 'Present' ? 'primary' : 'secondary'}
                onClick={() => handleAttendanceChange(i)}
              >
                {attendance[i] || 'Absent'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return days;
  };

  return (
    <StyledPaper elevation={3}>
      <Card>
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          <Grid item xs={isSmallScreen ? 12 : 4}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>Attendance</Typography>
             <FormControl>
                      <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                      >
                        {months.map((month, index) => (
                          <MenuItem key={index} value={index}>{month}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
            <Grid container spacing={2} style={{marginTop:"20px"}}>
              <Grid item xs={6}>
                <Card style={{backgroundColor:"orange"}}>
                  <CardContent>
                    <Typography variant='h5' gutterBottom>Present days</Typography>
                    <Typography variant='h3'>24/29</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card style={{backgroundColor:"yellow"}}>
                  <CardContent>
                    <Typography variant='h5' gutterBottom>Absent days</Typography>
                    <Typography variant='h3'>5</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card style={{backgroundColor:"blue"}}>
                  <CardContent>
                    <Typography variant='h5' gutterBottom>Classes Attended</Typography>
                    <Typography variant='h3'>27/34</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ marginTop:"50px",}}>
  <Button variant="contained" style={{width:"100%"}}>Create Ticket</Button>
</Grid>
          </Grid>
          <Grid item xs={isSmallScreen? 8: 8} >
            <Grid item xs={isSmallScreen? 12:12}>
             <Grid container spacing={2}>
              <Grid item xs={isSmallScreen? 12:12}>
                <Grid container style={{ display: "flex", justifyContent: "space-between", padding:"20px" }}>
                  <Grid item style={{ marginBottom: '20px', display: "flex" }}>
                    <Typography variant='h4' style={{ marginTop: "20px" }}>Calendar View</Typography>
                    <FormControl style={{ marginLeft: '5px' }}>
                      <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                      >
                        {months.map((month, index) => (
                          <MenuItem key={index} value={index}>{month}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel>Present & Absent</InputLabel>
                      <Select
                        value={globalAttendance}
                        onChange={handleGlobalAttendanceChange}
                      >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {attendanceOptions.map((option, index) => (
                          <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{padding:"25px"}}>
                  {generateDays()}     
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Card>
    </StyledPaper>
  );
}
export default StudentAttendance;