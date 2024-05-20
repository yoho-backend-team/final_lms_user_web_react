import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import UpdateIcon from '@mui/icons-material/Update';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DescriptionIcon from '@mui/icons-material/Description';
import TranslateIcon from '@mui/icons-material/Translate';
import Rating from '@mui/material/Rating';



function StudentMainCourse() {
    const [value, setValue] = useState('1');
    const matches = useMediaQuery('(min-width:600px)');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(5),
        width: 'auto',
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)'
    }));

 



    return (
        <StyledPaper elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} mt={2}>
                    <Typography variant="h3">
                        <ArrowBackIcon style={{ marginBottom: "-5px", marginRight: "20px" }} />
                        Course
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={2} mb={3}>
                    <Grid item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <TabContext value={value}>
                            <Box>
                                <TabList onChange={handleChange}>
                                    <Tab label="About" value="1" />
                                    <Tab label="Class/Notes & Materials" value="2" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {/* Left Content */}
                <Grid item xs={matches ? 7 : 12} mt={4}>
                    {/* Course Details */}
                    <Grid item xs={9} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant='h4'>Course Details</Typography>
                        <Typography variant='h4'>Purchased on: 23 Jan 2024</Typography>
                    </Grid>
                    <Grid item xs={9} mt={2}>
                        <Card>
                            <CardContent>
                                <Typography variant='body1'>
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} mt={2}>
                        <Typography variant='h4' gutterBottom>
                               Basic of Python Chapter 3, Frame work & Styling  <Rating name="half-rating" defaultValue={1} precision={0.5} /> (4.0)
                        </Typography>
                            </Grid>
                            <Grid item xs={6} mt={2}>
                           <Grid style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography variant='h5'>
                              By Rajalakshmi Institute
                            </Typography>
                            <Typography variant='h5'>
                              <UpdateIcon style={{marginBottom:"-5px"}}/>12hrs 
                            </Typography>
                            </Grid>
                            </Grid>
                            <Grid item xs={10} mt={2} >
                            <Typography variant='body1'>
                             User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.
                            </Typography>
                            </Grid>
                    <Grid item xs={12} mt={2}>
                        <Button variant='outlined' style={{marginRight:"10px"}}>Durations: 6months</Button>
                        <Button variant='outlined' style={{marginRight:"10px"}}>Type: Online</Button>
                       <Button>Status 72%</Button>
                    </Grid>
                <Grid item xs={12} mt={2}>
                <Typography variant='h4' gutterBottom>Benefits</Typography>
                    <Grid sx={{display:"flex"}}>
                        <Card style={{width:"150px", height:"100px", backgroundColor:"#cb2ad9", marginRight:"25px"}} >
                            <CardContent>
                            <TranslateIcon style={{color:"white", width:"50px", marginLeft:"20px"}}/>
                            <Grid  style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Typography variant='h5' style={{color:"#fff"}}>English & Tamil</Typography>
                            </Grid>
                             </CardContent>
                          </Card>
                        <Card style={{width:"150px", height:"100px", backgroundColor:"#2a4ed9", marginRight:"25px"}}>
                           <CardContent>
                            <CardMembershipIcon style={{color:"white", width:"50px", marginLeft:"20px"}}/>
                            <Grid  style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Typography variant='h5' style={{color:"#fff"}}>3 Certificates</Typography>
                            </Grid>
                          </CardContent>
                        </Card>
                    <Card style={{width:"150px", height:"100px", backgroundColor:"#0fad11"}}>
                        <CardContent>
                            <DescriptionIcon style={{color:"white", width:"50px", marginLeft:"20px"}}/>
                            <Grid  style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Typography variant='h5' style={{color:"#fff"}}>Notes</Typography>
                            </Grid> 
                        </CardContent>
                    </Card>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Right Content */}
        <Grid xs={matches ? 5 : 12} mt={4}>
            <Grid item xs={12}>
                <Grid style={{display:"flex", justifyContent:"space-between", marginBottom:"20px", alignItems:"center"}}>
                    <Typography variant='h4'>Course Chapters/topic</Typography>
                    <Typography variant='h4'><FiberManualRecordSharpIcon style={{marginBottom:"-5px", width:"10%"}}/>6 Chapters</Typography>
                    <Typography variant='h4'><FiberManualRecordSharpIcon style={{marginBottom:"-5px", width:"10%"}}/>146 classes</Typography>
                </Grid>
            </Grid>
    <Grid container justifyContent="center" style={{ height: '500px', overflowY: 'scroll'}}>
        <Grid item xs={11}>
           <Grid>
            <Card style={{backgroundColor:"#193ae3"}}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h3'style={{color:"#fff"}}>Foundation of Python &SQL Basic...</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{backgroundColor:"#fff", color:"black", border:"none", fontWeight:"bolder", fontSize:"18px"}}>12</Button>
                            <Typography variant='h5'style={{color:"black"}}>Classes</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <Typography variant='h4' style={{color:"#e3d0d0"}}>Both Python & SQL Fundamentals</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h4' style={{color:"black"}}>Enrolled</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid mt={2}>
        <Card style={{backgroundColor:"#eb3cb7"}}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h3' style={{color:"#fff"}}>Frame Work and Styling</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{backgroundColor:"#fff", color:"black", border:"none", fontWeight:"bolder", fontSize:"18px"}}>12</Button>
                            <Typography variant='h5'  style={{color:"black"}}>Classes</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <Typography variant='h4' style={{color:"#e3d0d0"}}>Front Development Advance Level</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h4'  style={{color:"black"}}>Enrolled</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </Grid>
             <Grid mt={2}>
                     <Card style={{backgroundColor:"#fcb634"}}>
                <CardContent>
                    <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h3'style={{color:"#fff"}}>Prototype and Functionalities...</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined'style={{backgroundColor:"#fff", color:"black", border:"none", fontWeight:"bolder", fontSize:"18px"}}>12</Button>
                            <Typography variant='h5'  style={{color:"black"}}>Classes</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <Typography variant='h4' style={{color:"#e3d0d0"}}>Beta Version Full Development</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h4'  style={{color:"black"}}>Enrolled</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  
                        </Grid>  
                        <Grid mt={2}>
        <Card style={{backgroundColor:"green"}}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h3' style={{color:"#fff"}}>Frame Work and Styling</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{backgroundColor:"#fff", color:"black", border:"none", fontWeight:"bolder", fontSize:"18px"}}>12</Button>
                            <Typography variant='h5'  style={{color:"black"}}>Classes</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <Typography variant='h4' style={{color:"#e3d0d0"}}>Front Development Advance Level</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h4'  style={{color:"black"}}>Enrolled</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </Grid>
                        </Grid> 
                   </Grid>   
                   </Grid>           
            </Grid>
        </StyledPaper>
    );
}
export default StudentMainCourse;