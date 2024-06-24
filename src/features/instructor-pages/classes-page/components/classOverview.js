// ClassCard.js
import React,{useState} from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Breadcrumbs, Link } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useNavigate } from 'react-router-dom';
import Attendance from "./Attedence/Attedance";
import { ClassStudentViewCard,ClassCoordinatorViewCard,ClassInstructorViewCard } from 'utils/images';

const ClassCard = () => {
  const navigate = useNavigate()
  const [showAttendance, setShowAttendance] = useState(false);

  const handleStartAttendance = () => {
    setShowAttendance(true);
  };

  const handleBack = () => {
        navigate(-1)
  }

  return (
    <Box sx={{ paddingTop: "40px",width:"100%" }}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext sx={{ color: "blue" }} />} sx={{ mb: 2 }}>
        <Link underline="hover" sx={{ color: "#484848", fontSize: "28px", fontWeight: "700", lineHeight: "22px" }} color="inherit" href="#">
          Classes
        </Link>
        <Link underline="hover" sx={{ color: "#495057", fontSize: "20px", fontWeight: 500, lineHeight: "32px" }} color="inherit" href="#">
          Online Class
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Upcoming Class</Typography>
      </Breadcrumbs>
    {!showAttendance ? 
      <Box sx={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.14)', borderRadius: "10px", border: "1px solid #C3C3C3", backgroundColor: "white" }}>
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", gap: "24px", mb: 3 }}>
            <ArrowBackIcon onClick={()=>handleBack()} sx={{cursor:"pointer"}} />
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <Typography sx={{ color: "#ADB5BD", fontSize: "16px", fontWeight: 600, lineHeight: "16px", pr: 1 }}>Batch No:</Typography>
              <Typography sx={{ color: "#495057", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>#3022024</Typography>
            </Box>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={8} md={6}  >
              <Box sx={{paddingLeft:"40px"}} >
                <Typography variant="h5" sx={{ fontWeight: '800', mb: 2, color: "#000", fontSize: "20px", lineHeight: "16px" }}>Class Details</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#495057", fontSize: "20px", lineHeight: "32px" }}>
                  Basic of Python Chapter 3, Framework & Styling
                </Typography>
                <Typography sx={{ mb: 2, fontSize: "14px", fontWeight: 400, lineHeight: "16px", color: "#6C757D", pr: "171px" }}>
                  User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.
                </Typography>
                <Box sx={{ display: 'flex',justifyContent:"flex-start", mb: 2}}>
                  <Box sx={{gap: "40px",display:"flex", backgroundColor: "#DFC7FF", borderRadius: "16px", padding: "26px 38px"}} >
                    <Box>
                      <Typography variant="body2" sx={{ color: "#000", fontSize: "16px", fontWeight: 600, lineHeight: "16px", pb: "6px" }}>Date</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#7149A5" }}>13 Feb 2024</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: "#000", fontSize: "16px", fontWeight: 600, lineHeight: "16px", pb: "6px" }}>Start At</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#7149A5" }}>10:30 AM</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: "#000", fontSize: "16px", fontWeight: 600, lineHeight: "16px", pb: "6px" }}>End At</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#7149A5" }}>11:30 AM</Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ color: "#495057", fontSize: "20px", fontWeight: 800, lineHeight: "32px", pb: "10px" }}>Class Meeting Link</Typography>
                <Typography sx={{ color: "#828282", fontSize: "14px", fontWeight: 600, lineHeight: "32px" }}>Join the class @10:20 AM</Typography>
                <Box sx={{ display: 'flex', gap: "72px", pt: "5px" }}>
                  <Button variant="contained" sx={{ borderRadius: "24px", backgroundColor: "#5611B1", padding: "16px 88px", color: "white", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>Host Now</Button>
                  <Button variant="outlined" onClick={()=>handleStartAttendance()} sx={{ padding: "8px 18px", color: "#5611B1", fontSize: "14px", fontWeight: 600, lineHeight: "24px", border: "2px solid #5611B1", borderRadius: "24px" }}>Start Attendance</Button>
                </Box>
                <Box sx={{ display: 'flex', gap: "80px", pt: "5px" }}>
                  <Box sx={{ display: "inline-flex", gap: "10px", width: "200px" }}>
                    <InfoOutlinedIcon sx={{ color: "#828282" }} />
                    <Typography sx={{ color: "#828282", fontSize: "12px", fontWeight: 700, lineHeight: "20px" }}>Please host the class 10 minutes of the class starting time</Typography>
                  </Box>
                  <Box sx={{ display: "inline-flex", gap: "10px" }}>
                    <InfoOutlinedIcon sx={{ color: "#828282" }} />
                    <Typography sx={{ color: "#828282", fontSize: "11px", fontWeight: 400, lineHeight: "20px" }}>Once started with class please start your attendance</Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: "black", fontSize: "20px", fontWeight: 800, lineHeight: "32px" }}>Session Notes</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
                  <Typography sx={{ color: "black", fontSize: "14px", fontWeight: 400, lineHeight: "16px" }}>Once Class Finished Upload video</Typography>
                  <Button startIcon={<FileUploadOutlinedIcon sx={{ color: "#5611B1" }} />} sx={{ border: "2px solid #5611B1", borderRadius: "24px" }}>Notes</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8} md={6}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Other Details</Typography>
                <Box sx={{ display: 'flex', gap: "40px", mb: 2 }}>
                  <Box
                   sx={{
                    backgroundImage : `url(${ClassStudentViewCard})`,
                    width : "240px",
                    height : "150px"
                   }}
                  >
                    <Typography variant="body2" sx={{ color : "#000", fontSize: "14px", fontWeight: 600, lineHeight: "16px",p:"20px" }} >Students</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500',fontSize:"12px",lineHeight:"16px",color:"#435D85",p:"20px" }}>Total 67</Typography>
                  </Box>
                  <Box
                   sx={{
                    backgroundImage : `url(${ClassInstructorViewCard})`,
                    width : "240px",
                    height : "150px"
                   }}
                  >
                    <Typography variant="body2" sx={{ color : "#000", fontSize: "14px", fontWeight: 600, lineHeight: "16px",p:"20px" }} >Instructors</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500',fontSize:"12px",lineHeight:"16px",color:"#435D85",p:"20px" }} >Total 4</Typography>
                  </Box>
                </Box>
                <Box 
                sx={{ 
                    mt: 2,
                    backgroundImage : `url(${ClassCoordinatorViewCard})`,
                    width : "240px",
                    height : "150px", 
                    pt : "40px"
                }}
                >
                  <Typography variant="body2" sx={{ color : "#000", fontSize: "14px", fontWeight: 600, lineHeight: "16px",p:"20px" }} >Student Details</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '500',fontSize:"12px",lineHeight:"16px",color:"#435D85",p:"20px" }} >Jerome Bell</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color : "#000", fontSize:"20px" }}>Study Materials</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>Upload Notes</Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Once the class is finished, please upload the Study Materials.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      :
      <Attendance setShowAttendance={setShowAttendance} />
    }
    </Box>
  );
};

export default ClassCard;
