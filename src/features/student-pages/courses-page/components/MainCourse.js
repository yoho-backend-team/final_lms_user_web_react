import React, { useState } from 'react';
import { Grid, Paper, styled, Typography, Card, CardContent, Rating, Button, Container, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TranslateIcon from '@mui/icons-material/Translate';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DescriptionIcon from '@mui/icons-material/Description';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import back1 from '../../../../assets/images/pages/background_1.png';
import back2 from '../../../../assets/images/pages/background_2.png';

const StylePaper = styled(Paper)(({ theme }) => ({
    backgroundImage: `url(${back2})`,
    backgroundSize: 'cover',
    minWidth: '100%',
    padding: theme.spacing(2),
}));

function MainCourse() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ backgroundImage: `url(${back1})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <StylePaper elevation={3}>
                <Container sx={{ margin: "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mt={4}>
                            <Typography variant="h3">
                                <ArrowBackIcon style={{ marginBottom: '-5px', marginRight: '20px' }} />
                                Course
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{ margin: "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mt={2}>
                            <TabContext value={value}>
                                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TabList onChange={handleChange} value={value} aria-label="Course tabs">
                                        <Tab label="About" value="1" />
                                        <Tab label="Class/Notes & Materials" value="2" />
                                    </TabList>
                                </Grid>
                                <TabPanel value="1">
                                    {/* Content for the "About" tab */}
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Content for the "Class/Notes & Materials" tab */}
                                </TabPanel>
                            </TabContext>
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{ margin: "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant='h4'>Course Details</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='subtitle1' color='textSecondary'>Purchased on: 23 Jan 2024</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant='body1'>
                                                Level-Up As a Python Developer And Go From #Zero To Hired
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h6' gutterBottom>
                                        Basic of Python Chapter 3, Framework & Styling <Rating name="half-rating" defaultValue={4} precision={0.5} /> (4.0)
                                    </Typography>
                                    <Typography variant='body1'>
                                        User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={2}>
                                <Grid item>
                                    <Button variant='outlined' sx={{ marginRight: "10px" }}>Duration: 6 months</Button>
                                    <Button variant='outlined' sx={{ marginRight: "10px" }}>Type: Online</Button>
                                    <Button>Status 72%</Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={2} justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Card sx={{ backgroundColor: "#cb2ad9" }}>
                                        <CardContent>
                                            <TranslateIcon sx={{ color: "white" }} />
                                            <Typography variant='subtitle2' sx={{ color: "#fff" }}>English & Tamil</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ backgroundColor: "#2a4ed9" }}>
                                        <CardContent>
                                            <CardMembershipIcon sx={{ color: "white" }} />
                                            <Typography variant='subtitle2' sx={{ color: "#fff" }}>3 Certificates</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ backgroundColor: "#0fad11" }}>
                                        <CardContent>
                                            <DescriptionIcon sx={{ color: "white" }} />
                                            <Typography variant='subtitle2' sx={{ color: "#fff" }}>Notes</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='h4'>Course Chapters / Topic</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='subtitle1' color='textSecondary'>6 chapters</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1' color='textSecondary'>146 classes</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ height: '500px', overflowY: 'auto' }} mt={2}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Grid item xs={10} key={index}>
                                        <Card sx={{ backgroundColor: "#193ae3", marginBottom: "20px" }}>
                                            <CardContent>
                                                <Typography variant='h6' sx={{ color: "#fff" }}>
                                                    Foundation of Python & SQL Basic...
                                                </Typography>
                                                <Button
                                                    variant='outlined'
                                                    sx={{
                                                        backgroundColor: "#fff",
                                                        color: "black",
                                                        fontWeight: "bolder",
                                                        fontSize: "16px",
                                                        marginY: "10px"
                                                    }}
                                                >
                                                    12 Classes
                                                </Button>
                                                <Typography variant='subtitle2' sx={{ color: "#e3d0d0" }}>
                                                    Both Python & SQL Fundamentals
                                                </Typography>
                                                <Typography variant='subtitle2' sx={{ color: "black" }}>
                                                    Enrolled
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StylePaper>
        </div>
    );
}

export default MainCourse;
