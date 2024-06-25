import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import StudyMaterialIcon from 'assets/icons/study-material-icon';
import EllipseImage from '../../../assets/Ellipse 1928.svg';

const ProfilePage = () => {
  return (
    <Box sx={{ padding: '20px 30px', backgroundColor: '#F4F4F6' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Button startIcon={<ArrowBackIcon />} color="primary">
          Back to Dashboard
        </Button>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Edit
        </Button>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* Personal Info */}
          <Card sx={{ backgroundColor: '#FFF', borderRadius: 2, border: '1px solid var(--Gray-300, #DEE2E6)', boxShadow: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 700 }}>
                Personal Info
              </Typography>
              <Box sx={{ display: "flex",justifyContent: "space-between" }} >
              <Box>
                <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                  First Name
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>Janu</Typography>
              </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Last Name
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>Janu</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Enter Email ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>janu@design.com</Typography>
                </Box>
                <Box >
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Gender
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>Female</Typography>
                </Box>
                <Box >
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Contact
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>9876543210</Typography>
                </Box>
                </Box>
                <Box sx={{ display:"flex",gap:"60px",pt:"40px"}} >
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    20/1 Km street, mm nagar chengalpattu
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Pincode
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>897653</Typography>
                </Box>
                </Box>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 700 }}>
                Academics Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Department
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Design Development
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Course
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    UI / UX Design
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Batch
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Batch "A"
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Roll Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    100099
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Student ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    9niudwybutv7
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 700 }}>
                Documents
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <StudyMaterialIcon />
                    <Typography sx={{ ml: 1 }}>10th Mark sheet</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <StudyMaterialIcon />
                    <Typography sx={{ ml: 1 }}>12th Mark sheet</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <StudyMaterialIcon />
                    <Typography sx={{ ml: 1 }}>Aadhar Card</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <StudyMaterialIcon />
                    <Typography sx={{ ml: 1 }}>School TC</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          {/* Virtual ID */}
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Virtual ID
            </Typography>
            <Avatar alt="Jimmy" src="profile.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Typography variant="body1" sx={{ marginTop: 1 }}>Jimmy</Typography>
            <Typography variant="body2">Student ID: 9niudwybutv7</Typography>
            <Typography variant="body2">Batch: A</Typography>
          </Card>

          {/* Course Status */}
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2, textAlign: 'center', width: 196, height: 196, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Status
              </Typography>
              <img src={EllipseImage} alt="Ellipse" style={{ width: '100%', height: 'auto' }} />
              <CircularProgress variant="determinate" value={75} size={100} sx={{ marginBottom: 2 }} />
              <Typography variant="body1">Course Ends at: 29 May 2024</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
