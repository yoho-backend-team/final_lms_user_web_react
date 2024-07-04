import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Grid, 
  Typography, 
  Card, 
  Button,
  Avatar, 
  Box,
  CardContent, 
  Popover, 
  AvatarGroup, 
  Paper, 
  Breadcrumbs, 
  Tooltip, 
  CardMedia, 
  Link 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from '@mui/material/useMediaQuery';
import back from 'assets/images/pages/background_1.png';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StudentClassLayout from 'features/student-pages/classes-page/components/layout';
import { useNavigate } from 'react-router-dom';


const breadcrumbs = [
  <Link 
    underline="hover" 
    key="1" 
    sx={{
      color: '#484848',
      fontFamily: 'Poppins',
      fontSize: '28px',
      fontStyle: 'normal', 
      fontWeight: 700, 
      lineHeight: '22px'
    }}
    color="inherit" 
    href="/"
  >
    Classes
  </Link>,
  <Link 
    underline="hover" 
    key="2" 
    sx={{ 
      color: 'var(--Gray-700, #495057)', 
      fontFamily: 'Poppins', 
      fontSize: '20px', 
      fontStyle: 'normal', 
      fontWeight: 500, 
      lineHeight: '32px'
    }} 
    color="inherit" 
    href="/"
  >
    Online Class
  </Link>,
  <Link 
    underline="hover" 
    key="3" 
    sx={{ 
      color: 'var(--Gray-600, #6C757D)', 
      fontFamily: 'Poppins', 
      fontSize: '14px', 
      fontStyle: 'normal', 
      fontWeight: 500, 
      lineHeight: '22px'
    }} 
    color="inherit" 
    href="/"
  >
    Upcoming Class
  </Link>,
  <Typography 
    key="4" 
    sx={{ 
      color: 'var(--Gray-600, #6C757D)', 
      fontFamily: 'Poppins', 
      fontSize: '14px', 
      fontStyle: 'normal', 
      fontWeight: 500, 
      lineHeight: '22px'
    }} 
    color="text.primary"
  >
    Basic of User ...
  </Typography>,
];

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const PadPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundImage: `url(${back})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover"
}));

export default function OnlineUpcomingClasses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');

  const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <StudentClassLayout >
      <Grid container spacing={2} sx={{ paddingLeft:"44px",paddingBottom:"35px"}} >
        <Grid item xs={12} sx={{ paddingTop: '10px' ,overflow: 'auto' }} >
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Box sx={{ padding: "20px 0px 10px 40px"}} >
        <Box sx={{ padding: "15px 20px 20px 50px", backgroundColor:"white", border:"1px solid #C3C3C3", borderRadius:"10px"}} >
          <Grid>
          <ArrowBackIcon sx={{ marginBottom: "20px",zIndex:"1000",cursor:"pointer" }}
            onClick={handleBackClick} 
            style={{ cursor: 'pointer' }} />
            <Typography variant="h1" sx={{pb:"20px"}} >UX</Typography>
            <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: '32px'}} >UX Class 13022024</Typography>
            <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: '16px'}} >User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.</Typography>
          </Grid>
          <Box sx={{ display: "flex", justifyContent:"space-between", gap:"30px"}} >
            <Box sx={{ display:"flex", flexDirection:"column"}} >
              <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: '16px'}} >Course</Typography>
              <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', textAlign: 'center', fontFamily: 'Poppins', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px'}} >Advanced Certification in UI UX Design</Typography>
            </Box>
            <Box sx={{ display:"flex"}} >
              <Box sx={{marginRight:'10px', marginLeft:'-120px'}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Batch</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px', gap: "24px"}} >#3022024</Typography>
              </Box>
              <Box sx={{marginRight:'10px', marginLeft:'10px'}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Batch Name</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px'}} > UX Design team</Typography>
              </Box>
              <Box sx={{marginRight:'10px', marginLeft:'10px'}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Duration</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px'}} >1 : 24 : 36</Typography>
              </Box>
            </Box>
            <Box sx={{ display:"flex"}} >
              <Box sx={{marginRight:'10px', marginLeft:'-120px'}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Date</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px', gap: "24px"}} >#13 Feb 2024</Typography>
              </Box>
              <Box sx={{marginRight:'10px', marginLeft:'10px'}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Start At</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px'}} >10 : 30 AM</Typography>
              </Box>
              <Box sx={{marginRight:'10px', marginLeft:'10px', gap:"40px"}}>
                <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >End At</Typography>
                <Typography variant="h1" sx={{pb: '40px', color: 'var(--Gray-700, #495057)', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: '24px'}} >11 : 30 AM</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent:"space-between"}} >
            <Box sx={{ display:"flex", flexDirection:"column"}} >
              <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Instructors</Typography>
              <AvatarGroup max={4} total={24}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.png" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.png" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/3.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/4.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/6.png" />
              </AvatarGroup>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Jerome Bell and 5 more
              </Typography>
            </Box>
            <Box sx={{ display:"flex", flexDirection:"column"}} >
              <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Coordinator</Typography>
              <AvatarGroup max={4} total={24}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.png" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.png" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/3.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/4.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/6.png" />
              </AvatarGroup>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Jerome Bell and 5 more
              </Typography>
            </Box>
            <Box sx={{ display:"flex", flexDirection:"column"}} >
              <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Students</Typography>
              <AvatarGroup max={4} total={24}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.png" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.png" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/3.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/4.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.png" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/6.png" />
              </AvatarGroup>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Jerome Bell and 5 more
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display:"flex", flexDirection:"column", justifyContent:"space-between"}} >
            <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: '32px'}} >Class Meeting Link</Typography>
            <Typography variant="h1" sx={{pb: '40px', color: '#828282', textAlign: 'center', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: '32px'}} >Join the class @10:20 AM</Typography>
            <Button variant="contained" color="primary" sx={{ alignSelf: 'start' }}>
              Join Class
            </Button>
            <Box sx={{ display:"flex", gap:"10px", py:"10px", alignItems:"center"}} >
              <InfoOutlinedIcon/>
              <Typography variant="h1" sx={{pb:"10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '16px'}} >Make sure your presence in the class & If you not able to Atten the class please inform to the Coordinator</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </StudentClassLayout>
  );
}
