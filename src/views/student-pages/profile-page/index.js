import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StudyMaterialIcon from 'assets/icons/study-material-icon';
import EllipseImage from '../../../assets/Ellipse 1928.svg';

const ProfilePage = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Janu',
    lastName: 'Janu',
    email: 'janu@design.com',
    gender: 'Female',
    contact: '9876543210',
    address: '20/1 Km street, mm nagar chengalpattu',
    pincode: '897653',
  });

  const [documents, setDocuments] = useState([
    '10th Mark sheet',
    '12th Mark sheet',
    'Aadhar Card',
    'School TC',
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handleDocumentDelete = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = () => {
    setDocuments([...documents, 'New Document']);
  };

  return (
    <Box sx={{ padding: '20px 30px', backgroundColor: '#F4F4F6' }}>
      <Box sx={{ display: "flex", pt:"60px"}} justifyContent="space-between" alignItems="center" >
        <Button startIcon={<ArrowBackIcon />} color="primary" sx={{ boxShadow: "none", ":hover":{boxShadow:"none",backgroundColor:"none"}}} >
          Back to Dashboard
        </Button>
        <Button variant='contained' sx={{ borderRadius: 2,cursor:"pointer", color : "white", borderRadius:"8px",backgroundColor:"#0d6efd", boxShadow: "0px 6px 34px -8px #0d6efd" }} onClick={() => {setEditMode(!isEditMode);console.log('clicked')}}>
          {isEditMode ? 'Save' : 'Edit'}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* Personal Info */}
          <Card sx={{ backgroundColor: '#FFF', borderRadius: 2, border: '1px solid var(--Gray-300, #DEE2E6)', boxShadow: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#000', fontFamily: 'Poppins', fontWeight: 700 }}>
                Personal Info
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    First Name
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.firstName}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Last Name
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.lastName}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Enter Email ID
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="email"
                      value={personalInfo.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.email}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Gender
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="gender"
                      value={personalInfo.gender}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.gender}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Contact
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="contact"
                      value={personalInfo.contact}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.contact}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '60px', pt: '40px' }}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Address
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="address"
                      value={personalInfo.address}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.address}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                    Pincode
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="pincode"
                      value={personalInfo.pincode}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'var(--Gray-700, #495057)', fontFamily: 'Poppins', fontWeight: 500 }}>
                      {personalInfo.pincode}
                    </Typography>
                  )}
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
                {documents.map((document, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <StudyMaterialIcon />
                        <Typography sx={{ ml: 1 }}>{document}</Typography>
                      </Box>
                      {isEditMode && (
                        <IconButton onClick={() => handleDocumentDelete(index)} size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                ))}
                {isEditMode && (
                  <Grid item xs={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleDocumentUpload}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      Upload
                    </Button>
                  </Grid>
                )}
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
