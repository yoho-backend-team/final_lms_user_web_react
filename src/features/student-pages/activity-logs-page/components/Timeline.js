import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { Person, Delete, Lock } from '@mui/icons-material';
import { formatDate, formatTime } from 'utils/formatDate';
import { getAllStudentActivity } from '../services';


const TimelineComponent = ({filterData}) => {
  
  // const [activityLogs, setActivityLogs] = useState([]);
  
  

  // useEffect(() => {
  //   const fetchActivityLogs = async () => {
  //     try {
  //       const logs = await getAllStudentActivity();
  //       setActivityLogs(logs);
  //     } catch (error) {
  //       console.error("Error fetching activity logs:", error);
  //     }
  //   };
    

  //   fetchActivityLogs();
  // }, []);
  const getIcon = (type) => {
    switch (type) {
      case 'login':
        return <TimelineDot color="primary" sx={{ backgroundColor: "#0D6EFD" }}><Person sx={{ color: "#FFFFFF" }} /></TimelineDot>;
      case 'delete':
        return <TimelineDot sx={{ color: "#FFFFFF", backgroundColor: "#F76761" }}><Delete /></TimelineDot>;
      case 'passwordChange':
        return <TimelineDot sx={{ color: "#0E820B", backgroundColor: "#6AF467" }}><Lock /></TimelineDot>;
      case 'Ticket Create':
        return <TimelineDot sx={{ color: "#0E820B", backgroundColor: "#6AF467" }}><ConfirmationNumberOutlinedIcon /></TimelineDot>;
      default:
        return null;
    }
  };
  
  // const getLogs = (type, username) => {
  //   switch (type) {
  //     case 'login':
  //       return [
  //         `The User ${activityLogs[0]?.user?.username} Successfully Login`,
  //         `The User ${activityLogs[0]?.user?.username} Failed Login Process`,
  //       ];
  //     case 'delete':
  //       return [
  //         `The User ${activityLogs[0]?.user?.username} Successful event after correct password confirmation`,
  //         `The User ${activityLogs[0]?.user?.username} Failed event after wrong password confirmation`,
  //       ];
  //     case 'passwordChange':
  //       return [
  //         `The User ${activityLogs[0]?.user?.username} Successful event after correct password confirmation`,
  //       ];
  //     case 'Ticket Create':
  //       return [
  //         `The User  ${activityLogs[0]?.user?.username} ticket Created Sucessfully,`,
  //       ];
  //     default:
  //       return [];
  //   }
  // };
  

  return (
    <Timeline sx={{ width: "80vw" }}>
      {filterData?.map((log, index) => {
        const icon = getIcon(log.action);
        // const logs = getLogs(log.action, log.user.username);
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent sx={{ width: "250px", flex: "none"}}>
              <Typography variant="body2" sx={{ color: "#495057", fontSize: "12px", fontWeight: 500, lineHeight: "24px" ,marginRight: "28px",}} color="textSecondary">
                {formatDate(log?.updatedAt)} {formatTime(log?.updatedAt)}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              {icon}
              {index < filterData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="h1" sx={{ color: "#495057", fontSize: "14px", fontWeight: 700, lineHeight: "24px",mb: "40px"}}>
                {log.title}
              </Typography>
              
              <Box sx={{ display: 'flex',gap:"24px"}} >
            <Box sx={{ display: "flex",ml:"-33px",justifyContent:"center",alignItems:"center"}} >
            <TimelineSeparator sx={{ backgroundColor: "#D9D9D9", height: "1px", width: "91px",flex:"none"}} />
            <Typography sx={{ border : `4px solid #6AF467`, height: "20px",width:"20px", borderRadius: "20px"}} ></Typography>
            </Box>
              <Paper elevation={3} style={{ padding: '10px 24px' , margin: '10px 0', backgroundColor: "#E7E7E7", borderRadius: "8px", boxShadow: "none",  }} >
                <Typography variant="body2">
                {log.title} {log.user.email}
                </Typography>
                    <Typography variant="caption" display="block" color="textSecondary" sx={{ textAlign: "end",mb: "10px" }}>
                      {formatDate(log.createdAt)} {formatTime(log.createdAt)}
                    </Typography>
                  </Paper>
                </Box>
              
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default TimelineComponent;
