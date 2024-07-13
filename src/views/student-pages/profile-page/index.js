import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  LinearProgress,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import studentheaderpic from "../../../assets/images/background/studentprofile.svg"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { getprofilewithId, UpdateprofilewithId } from 'features/student-pages/Profile-page/services';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BoySharpIcon from '@mui/icons-material/BoySharp';
import Groups2Icon from '@mui/icons-material/Groups2';
import BadgeIcon from '@mui/icons-material/Badge';
import { getImageUrl } from 'utils/common/imageUtlils';


const ProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    contact: '',
    address: '',
    pincode: '',
  });
 const [editing, setEditing] = useState(false);
 const [editedPersonalInfo, setEditedPersonalInfo] = useState({ ...personalInfo });


  const getProfile = async () => {
    try {
      const response = await getprofilewithId();
      setPersonalInfo({
        ...response,
        contact: response.contact_info.phone_number,
        address: `${response.contact_info.address1}, ${response.contact_info.city}`,
        pincode: response.contact_info.pincode,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const editProfile = async () => {
    try {
      const updatedData = await UpdateprofilewithId(editedPersonalInfo); 
      setPersonalInfo(updatedData); 
      setEditing(false); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  console.log(personalInfo, "personalInfo");

  const genderIcon = personalInfo.gender === 'male' ? <MaleIcon /> : <FemaleIcon />;

  const image = getImageUrl(personalInfo.image);

  

  const infoItems = [
    { icon: <MailOutlineIcon />, label: 'Mail Address', value: personalInfo.email },
    { icon: <PersonIcon />, label: 'Name', value: `${personalInfo.first_name} ${personalInfo.last_name}` },
    { icon: genderIcon, label: 'Gender', value: personalInfo.gender },
    { icon: <PhoneIcon />, label: 'Contact Number', value: personalInfo.contact },
    { icon: <CalendarTodayIcon />, label: 'Date of Birth', value: personalInfo.dob },
    { icon: <LocationOnIcon />, label: 'Pin Code', value: personalInfo.pincode },
    { icon: <HomeIcon />, label: 'Address', value: personalInfo.address },   
  ];  
  const Instituteinfo = [
    { icon: <AutoStoriesIcon />, label: 'Course', value: personalInfo?.userDetail?.course?.course_name },
    { icon: <Groups2Icon />, label: 'Batch', value: personalInfo?.userDetail?.course?.course_name },
    { icon: <BoySharpIcon />, label: 'Roll Number', value: personalInfo.userDetail?.id },
    { icon: <BadgeIcon />, label: 'Student ID', value: personalInfo?.userDetail?.id },    
  ];


  return (
    <Box sx={{ p: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4, position: 'relative' }}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={studentheaderpic}
                alt="Background"
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
              />
              <Avatar
                alt="userimage"
                src={image}
                variant="rounded"
                sx={{
                  width: 120,
                  height: 120,
                  position: 'absolute',
                  top: 70,
                  left: 30,
                }}
                
              />
                <div style={{ display:'flex',  position: 'absolute', top:140, left:180}}>
                <Button
                    variant="contained"
                    onClick={editing ? editProfile : () => setEditing(true)}
                    sx={{
                      borderRadius: '24px',
                      backgroundColor: editing ? '#4CAF50' : '#0D6EFD',
                      padding: '8px 18px',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      lineHeight: '16px',
                      width: '130px',
                      height: 'auto',
                      boxShadow: '0px 6px 34px -8px #A4A4A4',
                    }}
                  >
                    {editing ? 'Save Profile' : 'Edit Profile'}
                  </Button>

              <IconButton color="primary" href="https://www.linkedin.com/">
                <LinkedInIcon />
              </IconButton>
            </div>
            </Box>
            <CardContent sx={{ mt: 10 }}>
            <Typography variant="body1" sx={{ mb: 2, color:'#000000', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 700, lineHeight: '32px', textAlign: 'left' }}>
                Personal info
              </Typography>                          
                <Grid container spacing={2} justifyContent="space-between">
                {editing ? (
                <>
                  <TextField
                    label="Email"
                    value={editedPersonalInfo.email}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, email: e.target.value })}
                  />
                   <TextField
                    label="first_name"
                    value={editedPersonalInfo.first_name}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, first_name: e.target.value })}
                  />

                </>
              ) : (
    
                <>
                  {infoItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box display="flex" alignItems="center">
                        <div style={{ color: 'black' }}>{item.icon}</div>
                        <Box ml={1}>
                          <Typography
                            sx={{
                              fontFamily: 'Nunito Sans',
                              fontSize: '14px',
                              fontWeight: 700,
                              lineHeight: '15px',
                              textAlign: 'left',
                              color: 'black',
                            }}
                          >
                            {item.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              fontFamily: 'Nunito Sans',
                              fontSize: '12px',
                              fontWeight: 600,
                              lineHeight: '20px',
                              textAlign: 'left',
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
              </Grid>
              <Typography variant="body1" sx={{mt: 4, mb: 2, color:'#000000', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 700, lineHeight: '32px', textAlign: 'left' }}>
              Institute info
              </Typography>    
              <Grid container spacing={2} justifyContent="space-between">
                    {Instituteinfo.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}> 
                        <Box display="flex" alignItems="center">
                          <div style={{ color: 'black'}}>
                            {item.icon}
                          </div>
                          <Box ml={1}>
                          <Typography sx={{
                                  fontFamily: 'Nunito Sans',
                                  fontSize: '14px',
                                  fontWeight: 700,
                                  lineHeight: '15px',
                                  textAlign: 'left',
                                  color:'black'
                                }}
                              >
                              {item.value} 
                              </Typography>
                              <Typography variant="body2" style={{ 
                                  fontFamily: 'Nunito Sans',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  lineHeight: '20px',
                                  textAlign: 'left'
                              }}>
                                  {item.label}
                              </Typography>
                 
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
           </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Academic Info, Current Chapter/Topic, and Progress (30%) */}
        <Grid item xs={12} md={4}>
        
          <Box sx={{ p: 2, mb: 2 }}>
             <Typography variant="body1" sx={{mb: 2, color:'#000000', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 700, lineHeight: '32px', textAlign: 'left' }}>
               Academic Info
              </Typography> 
            <Typography variant="body2">Total Percentage: 75%</Typography>
            <Typography variant="body2">Projects Assigned: 2</Typography>
            <Typography variant="body2">Pending Course: 4</Typography>
          </Box>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Current Chapter / Topic</Typography>
            <Typography variant="body2">Chapter 2</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={72} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="textSecondary">{`72%`}</Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Progress</Typography>
            <img src="https://via.placeholder.com/400x200" alt="Progress Chart" style={{ width: '100%' }} />
          </Card>
        
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
