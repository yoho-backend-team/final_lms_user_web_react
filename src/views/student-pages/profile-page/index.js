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
import EllipseImage from '../../../assets/Ellipse 1928.svg'

const ProfilePage = () => {
  return (
    <Box sx={{ padding: '20px 30px', backgroundColor: '#F4F4F6' }}>
      <Grid display={"flex"} justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Button startIcon={<ArrowBackIcon />} color="primary">
          Back to Dashboard
        </Button>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Edit
        </Button>
      </Grid>

      <Grid xs={12} container spacing={20} >
         <Grid item xs={8}>
  <Card sx={{
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    border: '1px solid var(--Gray-300, #DEE2E6)',
    boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.10)',
    p: '20px'
  }}>
    <CardContent>
    <Typography
  variant="h5"
  gutterBottom
  sx={{
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px'
  }}
>
  Personal info
</Typography>
      <Grid container spacing={2} sx={{ display: "inline-flex", alignItems: "center" }}>
        <Grid item  xs={4} sx={{ paddingRight: '20px' }}>
        <Typography
      variant="body1"
      sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}
    >
      First Name
    </Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>Janu</Typography>
        </Grid>
        <Grid item  xs={4} sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Last Name</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>Janu</Typography>
        </Grid>
        <Grid item  xs={4} sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Enter Email ID</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>janu@design.com</Typography>
        </Grid>
        <Grid item  xs={4} sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Gender</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>female</Typography>
        </Grid>
        <Grid item  xs={4} sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Contact</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>9876543210</Typography>
        </Grid>
        <Grid item sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Address</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>20/1 Km street, mm nagar chengalpattu</Typography>
        </Grid>
        <Grid item sx={{ paddingRight: '20px' }}>
          <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Pincode</Typography>
          <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>897653</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>


        {/* Virtual ID */}
       

        {/* Academic Info */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px'
  }}>
                Academics info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Department</Typography>
                  <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>Design Development</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Course</Typography>
                  <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>UI / UX Design</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Batch</Typography>
                  <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>batch "A"</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Roll Number</Typography>
                  <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>100099</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body1" sx={{
        color: 'var(--Gray-700, #495057)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '32px' // 200%
      }}>Student ID</Typography>
                  <Typography variant="body2" sx={{
    color: 'var(--Gray-700, #495057)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px' // 200%
  }}>9niudwybutv7</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px'
  }}>
                Documents
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                <Box>
                <StudyMaterialIcon />
              </Box>
              <Typography sx={{ ml: 1 }}>10th Mark sheet</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                <Box>
                <StudyMaterialIcon />
              </Box>
                <Typography sx={{ ml: 1 }}>12th Mark sheet</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                <Box>
                <StudyMaterialIcon />
              </Box>
                <Typography sx={{ ml: 1 }}>Aadhar Card</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                <Box>
                <StudyMaterialIcon />
              </Box>
                  <Typography sx={{ ml: 1 }}>school tc</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> 
         </Grid>
         <Grid item xs={4}>
         <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2, width: 250, height: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Virtual ID
            </Typography>
            <Avatar alt="Jimmy" src="profile.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Typography variant="body1" sx={{ marginTop: 1 }}>Jimmy</Typography>
            <Typography variant="body2">Student ID: 9niudwybutv7</Typography>
            <Typography variant="body2">Batch: A</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
      <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 2, textAlign: 'center', width: 196, height: 196, flexShrink: 0 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Course Status
          </Typography>
          <img src={EllipseImage} alt="Ellipse" style={{ width: '100%', height: 'auto', fill: '#0D6EFD' }} />
          <CircularProgress variant="determinate" value={75} size={100} sx={{ marginBottom: 2 }} />
          <Typography variant="body1">Course Ends at: 29 May 2024</Typography>
        </CardContent>
      </Card>
    </Grid>
         </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
