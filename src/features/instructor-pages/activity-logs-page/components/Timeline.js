import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import { Person } from '@mui/icons-material';
import { formatDate, formatTime } from 'utils/formatDate';

const TimelineComponent = ({ activity_logs }) => {
  return (
    <Timeline sx={{ width: "80vw" }}>
      {activity_logs?.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ width: "350px", flex: "none" }}>
            <Typography variant="body2" sx={{ color: "#495057", fontSize: "15px", fontWeight: 500, lineHeight: "24px" }}>
              {formatDate(event?.createdAt)} {formatTime(event?.createdAt)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ backgroundColor: "#0D6EFD" }}>
              <Person sx={{ color: "#FFFFFF" }} />
            </TimelineDot>
         
            <TimelineConnector sx={{ backgroundColor: "#0D6EFD", width: "4px" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="h1" sx={{ color: "#495057", fontSize: "18px", fontWeight: 700, lineHeight: "24px" }}>
              {event.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: "24px" }}>
              <Box sx={{ display: "flex", ml: "-33px", justifyContent: "center", alignItems: "center" }}>
                <TimelineSeparator sx={{ backgroundColor: "#D9D9D9", height: "5px", width: "91px", flex: "none" }} />
                <Typography sx={{ border: `4px solid #6AF467`, height: "20px", width: "20px", borderRadius: "12px" }}></Typography>
              </Box>
              <Paper elevation={3} style={{ padding: '10px 24px', margin: '10px 0', backgroundColor: "#E7E7E7", borderRadius: "8px", boxShadow: "none" }}>
                <Typography variant="body2">
                  {event?.details}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary" sx={{ textAlign: "end" }}>
                  {formatDate(event?.createdAt)} {formatTime(event?.createdAt)}
                </Typography>
              </Paper>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
