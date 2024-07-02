import React from 'react';
import { Box } from '@mui/material';
import ClassCard from "../card/ClassCard"


const classes = [
  { id: '1', title: 'Basics of User Experience', subject: 'UX Design', date: '32 Jan 2024', time: '10:30 AM', duration: '45min' },
  { id: '2', title: 'Basics of Front End', subject: 'Front End', date: '33 Jan 2024', time: '10:30 AM', duration: '45min' },
  { id: '3', title: 'Basics of Back End', subject: 'Back End', date: '34 Jan 2024', time: '10:30 AM', duration: '45min' },
];

const defaultStyles = {
  calendarColor : "#000000",
  timerColor : "#2AAD37",
  durationTextColor : "rgba(13, 110, 253, 1)",
  durationColor : "rgba(61, 139, 253, 0.22)"
}

const LiveClassList = ({data}) => {


  return (
    <Box sx={{ mt: 3, px: '40px' }}>
      {data.map((cls) => (
        <ClassCard key={cls.id} cls={cls} style={defaultStyles} />
      ))}
    </Box>
  );
};

export default LiveClassList;
