import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import { Person, Delete, Lock } from '@mui/icons-material';

const events = [
  {
    date: '11-07-2023 4:30 am',
    icon:  <TimelineDot color="primary" sx={{backgroundColor:"#0D6EFD"}} ><Person sx={{color:"#FFFFFF"}} /></TimelineDot> ,
    heading: 'Accessing the Account details',
    logs: [
      'The User "ABC" Successful event after correct password confirmation',
      'The User "ABC" Failed event after wrong password confirmation',
    ],
  },
  {
    date: '11-07-2023 4:30 am',
    icon: <TimelineDot sx={{ color: "#FFFFFF",backgroundColor:"#F76761"}} > <Delete /> </TimelineDot>,
    heading: 'Delete Process',
    logs: [
      'The User "ABC" Successful event after correct password confirmation',
      'The User "ABC" Failed event after wrong password confirmation',
    ],
  },
  {
    date: '11-07-2023 4:30 am',
    icon: <TimelineDot sx={{color:"#0E820B",backgroundColor:"#6AF467"}} ><Lock /></TimelineDot>,
    heading: 'Password Change',
    logs: [
      'The User "ABC" Successful event after correct password confirmation',
    ],
  },
];

const TimelineComponent = () => {
  return (
    <Timeline sx={{ width:"80vw"}} >
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ width: "250px",flex:"none"}} >
            <Typography variant="body2" sx={{ color: "#495057",fontSize:"12px",fontWeight:500,lineHeight:"24px" }} color="textSecondary">
              {event.date}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
              {event.icon}
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="h1" sx={{ color: "#495057",fontSize:"14px",fontWeight:700,lineHeight:"24px" }} >
              {event.heading}
            </Typography>
            {event.logs.map((log, idx) => (
              <>
            <Box sx={{ display: 'flex',gap:"24px"}} >
            <Box sx={{ display: "flex",ml:"-33px",justifyContent:"center",alignItems:"center"}} >
            <TimelineSeparator sx={{ backgroundColor: "#D9D9D9", height: "1px", width: "91px",flex:"none"}} />
            <Typography sx={{ border : `4px solid ${ idx + 1 === 1 ? "#6AF467" : "#F76761"}`, height: "20px",width:"20px", borderRadius: "20px"}} ></Typography>
            </Box>
              <Paper elevation={3} style={{ padding: '10px 24px' , margin: '10px 0', backgroundColor: "#E7E7E7", borderRadius: "8px", boxShadow: "none",  }} key={idx}>
                <Typography variant="body2">
                  {log}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary" sx={{ textAlign: "end"}} >
                  {event.date}
                </Typography>
              </Paper>
              </Box>
              </>
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
