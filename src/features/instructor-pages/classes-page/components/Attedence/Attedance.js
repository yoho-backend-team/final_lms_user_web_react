import React from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Avatar } from '@mui/material';
import AttendanceHeader from './AttedenceHeader';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const students = [
  { id: '12345', name: 'Arlene McCoy', avatar: 'https://via.placeholder.com/150' },
  { id: '12346', name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
];

const Attendance = ({setShowAttendance}) => {
  return (
    <>
    <AttendanceHeader setShowAttendance={setShowAttendance} />
    <Box sx={{ backgroundColor : "white",height:"auto", borderRadius: "10px",borderTopLeftRadius:"0px",borderTopRightRadius:"0px", border: "1px solid #C3C3C3", boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.14)" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:"40px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "20px", lineHeight: "24px", color: "#000" }}>
          Attendance List
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#5611B1", boxShadow: "0px 6px 34px -8px #0D6EFD", borderRadius: "8px", padding: "9px 24px", color: "#FBFBFB", fontSize: "14px", fontWeight: 500, lineHeight: "22px"}}>
          Submit
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ padding: "40px"}} >
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student.id} sx={{}} >
            <Card sx={{ padding: '10px', display: 'flex', flexDirection:"column",backgroundColor:"#FFFFFF",boxShadow:"none", borderRadius: "12px" }}>
              <Box sx={{display:"flex", justifyContent: "flex-end",pr:"15px",pt:"6px"}} >
                <MoreHorizOutlinedIcon />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center"}} >
              <Avatar src={student.avatar} alt={student.name} sx={{ width:"60px",height:"60px" }} />
              </Box>
              <Box sx={{ flexGrow: 1 , justifyContent: "center",display:"flex",flexDirection:"column", alignItems: "center", py: "10px"}}>
                <Box sx={{ display: "inline-flex"}} >
                    <Typography variant="body2" sx={{ color: "#232323", fontSize: "14px", fontWeight:600, lineHeight: "24px"}} >
                      ID:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#232323", fontSize: "12px", fontWeight:400, lineHeight: "24px"}} >
                      {student.id}
                    </Typography>
                </Box>
                <Box sx={{ display: "inline-flex"}} >
                  <Typography variant="body1" sx={{ color: "#232323", fontSize: "14px", fontWeight:600, lineHeight: "24px"}} >
                    Name: 
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#232323", fontSize: "12px", fontWeight:400, lineHeight: "24px"}} >
                    {student.name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{display:"flex",backgroundColor:"#E9ECEF",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",WebkitJustifyContent:"space-around"}} >
                <Typography sx={{padding:"8px 17px", color: "#6C757D", fontsize:"16px",fontWeight: 500, lineHeight:"24px"}} >
                  Present
                </Typography>
                <Typography sx={{padding:"8px 19px",color: "#6C757D", fontSize: "16px", fontWeight: "500", lineHeight: "24px"}} >
                  Absent
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Attendance;
