import React from "react";
import { Box,Typography } from "@mui/material";
import ClassCard, { ClassCardHeader } from "../card/ClassCard"

const classes = [
  {
    id: "1",
    title: "React Hooks Explaination",
    subject: "React",
    date: "23 Aug 2024",
    time: "10:30 AM",
    duration: "45min",
  },
  {
    id: "2",
    title: "React State Management",
    subject: "React",
    date: "24 Aug 2024",
    time: "10:30 AM",
    duration: "45min",
  },
  {
    id: "3",
    title: "React Function Component",
    subject: "React",
    date: "25 Aug 2024",
    time: "10:30 AM",
    duration: "45min",
  },
];

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "#0D6EFD",
  durationColor: "rgba(61, 139, 253, 0.22)",
};

const UpcomingClassList = ({ data, classType ,group}) => {
  
  return (
    <Box
     sx={{ mt: 3, px: "40px" }}>
      
      {data.length > 0 ? (
      data.map((cls) => (
        <>
        <ClassCardHeader/>
        <ClassCard
          key={cls.id}
          cls={cls}
          style={defaultStyles}
          type={classType}
          group={group}
        />
        </>
       
      ))
    ) : (
      <Box sx={{ py: 5,textAlign:"center"  }}>
         <img src="https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-illustration-download-in-svg-png-gif-file-formats--no-found-misplaced-files-business-pack-illustrations-8062128.png" alt="No data available" style={{ maxWidth: '100%', height: '270px' }} />
        <Typography variant="h6" color="textSecondary" fontSize={'32px'} >
          No Upcoming Classes
        </Typography>
        <Typography variant="body2" color="textSecondary" fontSize={'25px'}>
          Check back later for updates.
        </Typography>
      </Box>
    )}
      
    </Box>
  );
};

export default UpcomingClassList;
