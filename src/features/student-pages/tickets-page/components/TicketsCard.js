import React from 'react';
import { Card, Typography, CardContent, Box, Grid, Button } from '@mui/material';
import Chip from 'components/mui/chip';
import Icon from 'components/icon';

// import IconifyIcon from 'components/icon';
import IconButton from '@mui/material/IconButton';

const TicketsCard = () => {
  const dummyData = [
    {
      ticketNumber: 'Ticket #1234567890',
      date: 'Jully 10',
      title: 'Attendance Issue',
      description: 'This is a system generated payslip and does not require signature.29/1, Chennai, Tamil Nadu - 600117'
    },
    {
      ticketNumber: 'Ticket #5555555555',
      date: 'June 30',
      title: 'Attendance Issue',
      description: 'This is a system generated payslip and does not require signature.29/1, Chennai, Tamil Nadu - 600117'
    },
    {
      ticketNumber: 'Ticket #22222222222',
      date: 'April 10',
      title: 'Attendance Issue',
      description: 'This is a system generated payslip and does not require signature.29/1, Chennai, Tamil Nadu - 600117'
    },
    {
      ticketNumber: 'Ticket #3333333333',
      date: 'December 20',
      title: 'Attendance Issue',
      description: 'This is a system generated payslip and does not require signature.29/1, Chennai, Tamil Nadu - 600117'
    },
    {
      ticketNumber: 'Ticket #666666666',
      date: 'Feb 25',
      title: 'Attendance Issue',
      description: 'This is a system generated payslip and does not require signature.29/1, Chennai, Tamil Nadu - 600117'
    }
    // Add more dummy data as needed
  ];

  return (
    <Grid container spacing={2}> 
      {dummyData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ mb: 1 }}>
            <CardContent sx={{p:2 }}>
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">{data.ticketNumber}</Typography>
                <Typography variant="subtitle1">
                  <Chip rounded label="Jan 01" skin="light" color="primary" />
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {data.title}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1.75 }}>
                  <Typography variant="body1">
                    {data.description}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems: 'center' }}>
                  <IconButton  aria-label="capture screenshot" color="primary">
                    <Icon icon="subway:pin" fontSize="1.25rem" />
                  </IconButton>
                  <Typography>05</Typography>
                </Box> 

                <Box>
                  <Button size="small" variant="contained" sx={{px:2}}>
                    In progress
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketsCard;
