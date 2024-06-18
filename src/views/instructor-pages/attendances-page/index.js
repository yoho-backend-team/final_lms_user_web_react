// src/Attendance.js
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,Card
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Attendance = () => {
  const [month, setMonth] = React.useState('April');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
          <Paper
            elevation={3}
            sx={{
              textAlign: 'center',
              padding: 2,
              backgroundColor: i % 5 === 0 ? '#ffebee' : '#e8f5e9',
            }}
          >
            <Typography variant="h6">{i < 10 ? `0${i}` : i}</Typography>
            <Typography variant="body2">
              {i % 5 === 0 ? 'Absent' : 'Present'}
            </Typography>
          </Paper>
        </Grid>
      );
    }
    return days;
  };

  return (
    <Card
    sx={{p:"40px"}}>
    <Box sx={{ padding: 4 }}>
      <Grid container xs={12} spacing={2}>
        <Grid item sx={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Attendance
          </Typography>
        </Box>
        <Box>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e8f5e9' }}>
            <Typography variant="h6">Present days</Typography>
            <Typography variant="h4">24/29</Typography>
          </Paper>
        </Box>
        <Box>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#ffebee' }}>
            <Typography variant="h6">Absent days</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Box>
        <Box>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff9c4' }}>
            <Typography variant="h6">Total classes attended by Student</Typography>
            <Typography variant="h4">27/34</Typography>
          </Paper>
        </Box>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Month"
              onChange={handleChange}
            >
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        </Grid>
        <Grid item xs={8} >
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Calendar view
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {renderDays()}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={{ marginTop: 2 }}
          >
            Raise Ticket
          </Button>
        </Grid>
        </Grid>
      </Grid>
    </Box>
    </Card>
  );
};

export default Attendance;
