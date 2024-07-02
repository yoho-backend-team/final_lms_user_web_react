import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatDate, formatTime } from 'utils/formatDate';

const AttendanceHeader = ({setShowAttendance,classDetails}) => {
  console.log(classDetails,"classDetails")
  return (
    <Box sx={{ backgroundColor: '#5611B1', padding: '20px 40px', borderRadius: '10px', color: 'white', width: '100%',borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px" }}>
      <Box container alignItems="center" sx={{display:"flex",color:"white"}} justifyContent="space-between">
          <ArrowBackIcon sx={{cursor:"pointer"}} onClick={()=>setShowAttendance(false)}  />
          <Box>
            <Typography sx={{ fontWeight: 500, color:"white",fontSize:"16px",lineHeight:"32px" }}>{classDetails?.class_name}</Typography>
          </Box>
          <Box>
            <Typography sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap',color:"#B28AE7",fontSize:"12px",fontWeight:600,lineHeight:"16px" }}>
              Course:
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', color: "white", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
              {classDetails?.course?.course_name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap',color:"#B28AE7",fontSize:"12px",fontWeight:600,lineHeight:"16px" }}>
              <span>Batch</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', color: "white", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
              <span>#{classDetails?.batch?.id}</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' ,color:"#B28AE7",fontSize:"12px",fontWeight:600,lineHeight:"16px"}}>
              <span>Trainer:</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', color: "white", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
              <span>{classDetails?.instructors?.[0]?.full_name}</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' ,color:"#B28AE7",fontSize:"12px",fontWeight:600,lineHeight:"16px"}}>
              <span>Date:</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', color: "white", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
              <span>{formatDate(classDetails?.start_date)}</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap',color:"#B28AE7",fontSize:"12px",fontWeight:600,lineHeight:"16px" }}>
              <span>Started At:</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', color: "white", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
              <span>{formatTime(classDetails?.start_time)}</span>
            </Typography>
          </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: "10px" }}>
              <Typography variant="h3" sx={{ fontWeight: 600, fontSize: "40px", lineHeight: "50px", color: "white" }}>43</Typography>
              <Typography sx={{ fontWeight: 500, fontSize:"14px", lineHeight: "24px", color: "#B28AE7", width: "53px" }} >No of Present</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: "10px"  }}>
              <Typography variant="h3" sx={{ fontWeight: 600, fontSize: "40px", lineHeight: "50px", color: "white" }}>5</Typography>
              <Typography sx={{ fontWeight: 500, fontSize:"14px", lineHeight: "24px", color: "#B28AE7", width: "53px" }} >No of Absent</Typography>
            </Box>
      </Box>
    </Box>
  );
};

export default AttendanceHeader;
