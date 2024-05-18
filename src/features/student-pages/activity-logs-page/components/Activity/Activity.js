import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography, Card, Grid, useMediaQuery, useTheme, TextField, Select, MenuItem, Box } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';

function ActivityLog() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)',
  }));

  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [dateRange, setDateRange] = React.useState('pastWeek');

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const activities = [
    { time: '2024-05-18 09:30', icon: <PersonIcon/> , title: 'Account Details', description: 'Event after correct password confirmation' },
    { time: '2024-05-18 10:00', icon: <DeleteIcon />, title: 'Delete Process', description: 'Because it\'s awesome!' },
    { time: '2024-05-18 22:00', icon: <KeyIcon />, title: 'Password Change', description: 'Because you need rest' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledPaper elevation={3}>
        <Card>
          <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={isSmallScreen ? 12 : 6} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h3'>Activity Log</Typography>
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : 6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                renderInput={(params) => <TextField {...params} style={{ marginRight: '10px' }} />}
              />
              <DatePicker
                label="To"
                sx={{ml: 2}}
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                renderInput={(params) => <TextField {...params} style={{ marginRight: '10px' }} />}
              />
              <Select
                value={dateRange}
                onChange={handleDateRangeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Date Range' }}
                style={{ marginLeft: '10px', minWidth: 120 }}
              >
                <MenuItem value="pastWeek">Past week</MenuItem>
                <MenuItem value="pastMonth">Past month</MenuItem>
                <MenuItem value="pastYear">Past year</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Timeline position="right">
                {activities.map((activity, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{ textAlign: 'right', m: 'auto 0' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {activity.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimelineDot>
                          {activity.icon}
                        </TimelineDot>
                        <Typography variant="body2" sx={{ ml: 1 }}>{activity.title}</Typography>
                      </Box>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Box
                        sx={{
                          borderRadius: 2,
                          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'primary.light',
                          color: theme.palette.mode === 'dark' ? 'white' : 'black',
                          p: 2,
                          maxWidth: '300px',
                          ml: 'auto',
                          mb: 2
                        }}
                      >
                        <Typography variant="body1">{activity.description}</Typography>
                        <Typography variant="body2" color="text.secondary">{activity.time}</Typography>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Grid>
          </Grid>
        </Card>
      </StyledPaper>
    </LocalizationProvider>
  );
}

export default ActivityLog;