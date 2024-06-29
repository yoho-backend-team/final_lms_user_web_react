import React from 'react';
import { Box } from '@mui/material';
import ClassCard from "../card/ClassCard"


const classes = [
  { id: '1', title: 'React Hooks Explaination', subject: 'React', date: '23 Aug 2024', time: '10:30 AM', duration: '45min' },
  { id: '2', title: 'React State Management', subject: 'React', date: '24 Aug 2024', time: '10:30 AM', duration: '45min' },
  { id: '3', title: 'React Function Component', subject: 'React', date: '25 Aug 2024', time: '10:30 AM', duration: '45min' },
];

const defaultStyles = {
  calendarColor : "#000000",
  timerColor : "#2AAD37",
  durationTextColor : "#0D6EFD",
  durationColor : "rgba(61, 139, 253, 0.22)"
}

const UpcomingClassList = ({data}) => {


  return (
    <Box sx={{ mt: 3, px: '40px' }}>
      {data.map((cls) => (
        <ClassCard key={cls.id} cls={cls} style={defaultStyles} />
      ))}
    </Box>
  );
};

export default UpcomingClassList;
