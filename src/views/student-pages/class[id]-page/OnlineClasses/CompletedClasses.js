import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box, Paper, Breadcrumbs, Link, IconButton, Avatar, AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import StudyMaterialIcon from 'assets/icons/study-material-icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import back from 'assets/images/pages/background_1.png';
import StudentClassLayout from 'features/student-pages/classes-page/components/layout';
import { useNavigate } from 'react-router-dom';


const breadcrumbs = [
  <Link key="1" sx={{ color: '#484848', fontFamily: 'Poppins', fontSize: '28px', fontWeight: 700, lineHeight: '22px' }} color="inherit" href="/">
    Classes
  </Link>,
  <Link key="2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, lineHeight: '32px' }} color="inherit" href="/">
    Online Class
  </Link>,
  <Link key="3" sx={{ color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, lineHeight: '22px' }} color="inherit" href="/">
    Upcoming Class
  </Link>,
  <Typography key="4" sx={{ color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, lineHeight: '22px' }} color="text.primary">
    Basic of User ...
  </Typography>,
];

const studyMaterials = [
  { title: "Chapter-01", description: "JavaScript Development Workbook" },
  { title: "Chapter-02", description: "JavaScript Development Workbook" },
];

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
        <Grid item xs={12} >
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Box >
        <Box sx={{ padding: "15px 20px 20px 50px", backgroundColor: "white", border: "1px solid #C3C3C3", borderRadius: "10px" }}>
          <Grid>
            <ArrowBackIcon sx={{ marginBottom: "20px",zIndex:"1000",cursor:"pointer" }}
            onClick={handleBackClick} 
            style={{ cursor: 'pointer' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h1" sx={{ paddingBottom: "20px" }}>UX</Typography>
              <Typography variant="body2" sx={{ color: '#979797', fontFamily: 'Poppins', fontSize: '14px', fontStyle: 'italic', fontWeight: 500, lineHeight: '22px' }}>
                Held on: 23 April 2024
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, lineHeight: '32px' }}>UX Class 13022024</Typography>
            <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 400, lineHeight: '16px' }}>
              User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.
            </Typography>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-600, #6C757D)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 400, lineHeight: '16px' }}>Course</Typography>
              <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Advanced Certification in UI UX Design</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: '10px', marginLeft: '-120px' }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Batch</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>#3022024</Typography>
              </Box>
              <Box sx={{ marginRight: '10px', marginLeft: '10px' }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Batch Name</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>UX Design team</Typography>
              </Box>
              <Box sx={{ marginRight: '10px', marginLeft: '10px' }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Duration</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>1 : 24 : 36</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: '10px', marginLeft: '-120px' }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Date</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>#13 Feb 2024</Typography>
              </Box>
              <Box sx={{ marginRight: '10px', marginLeft: '10px' }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Start At</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>10 : 30 AM</Typography>
              </Box>
              <Box sx={{ marginRight: '10px', marginLeft: '10px', gap: "40px" }}>
                <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>End At</Typography>
                <Typography variant="h1" sx={{ paddingBottom: '40px', color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>11 : 30 AM</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Instructors</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h1" sx={{ paddingBottom: "10px", color: '#ADB5BD', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Coordinator</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: '20px' }}>
              <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-500, #ADB5BD)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>Students</Typography>
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

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: '20px' }}>
            <Typography variant="h1" sx={{ paddingBottom: "10px", color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, lineHeight: '14px' }}>Study Materials</Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {studyMaterials.map((material, index) => (
                <Box key={index} sx={{ display: "flex", ml: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                  <Box>
                    <StudyMaterialIcon />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ width: '86.316px', height: '24px', flexShrink: 0, color: '#000', textAlign: 'justify', fontFamily: 'Lato', fontSize: '16px', fontWeight: '700', lineHeight: 'normal' }}>
                      {material.title}
                    </Typography>
                    <Typography variant="body2" sx={{ width: '186px', height: '18px', flexShrink: 0, color: '#000', textAlign: 'justify', fontFamily: 'Lato', fontSize: '12px', fontWeight: '300', lineHeight: 'normal' }}>
                      {material.description}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "auto" }}>
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

        </Box>
      </Box>

    </StudentClassLayout>
  );
}
