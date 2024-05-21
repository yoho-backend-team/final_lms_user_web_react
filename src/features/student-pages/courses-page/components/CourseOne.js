import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, Tab, CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import Rating from '@mui/material/Rating';

import back from '../../../../../src/assets/images/pages/background_2.png';
import pdf from '../../../../assets/images/Elite/pdf.png';
import stu1 from '../../../../assets/images/Elite/stu1.jpg';
import stu2 from '../../../../assets/images/Elite/stu2.jpg';
import stu3 from '../../../../assets/images/Elite/stu3.jpg';
import stu4 from '../../../../assets/images/Elite/stu1.jpg';

const chapters = [stu3, stu1, stu2, stu4];
const studyMaterials = [1, 2, 3, 4];
const notes = [1];

function StudentMainCourse() {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Grid container spacing={3}>
            <Grid item xs={matches ? 7 : 12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Course Details</Typography>
                        <Typography variant='subtitle1' color='textSecondary'>Purchased on: 23 Jan 2024</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='body1'>
                                    Level-Up As a Python Developer And Go From #Zero To Hired
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6' gutterBottom>
                            Basic of Python Chapter 3, Framework & Styling <Rating name="half-rating" defaultValue={1} precision={0.5} /> (4.0)
                        </Typography>
                        <Typography variant='body1'>
                            User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='outlined' style={{ marginRight: "10px" }}>Duration: 6 months</Button>
                        <Button variant='outlined' style={{ marginRight: "10px" }}>Type: Online</Button>
                        <Button>Status 72%</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6' gutterBottom>Benefits</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card style={{ backgroundColor: "#cb2ad9" }}>
                                    <CardContent>
                                        <TranslateIcon style={{ color: "white" }} />
                                        <Typography variant='subtitle2' style={{ color: "#fff" }}>English & Tamil</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ backgroundColor: "#2a4ed9" }}>
                                    <CardContent>
                                        <CardMembershipIcon style={{ color: "white" }} />
                                        <Typography variant='subtitle2' style={{ color: "#fff" }}>3 Certificates</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ backgroundColor: "#0fad11" }}>
                                    <CardContent>
                                        <DescriptionIcon style={{ color: "white" }} />
                                        <Typography variant='subtitle2' style={{ color: "#fff" }}>Notes</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={matches ? 5 : 12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Course Chapters/Topic</Typography>
                        <Typography variant='body2'>6 Chapters, 146 classes</Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" style={{ height: '500px', overflowY: 'auto' }}>
                    <Grid item xs={11}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card style={{ backgroundColor: "#193ae3" }}>
                                    <CardContent>
                                        <Typography variant='h6' style={{ color: "#fff" }}>Foundation of Python & SQL Basic...</Typography>
                                        <Button variant='outlined' style={{ backgroundColor: "#fff", color: "black", fontWeight: "bolder", fontSize: "16px" }}>12 Classes</Button>
                                        <Typography variant='subtitle2' style={{ color: "#e3d0d0" }}>Both Python & SQL Fundamentals</Typography>
                                        <Typography variant='subtitle2' style={{ color: "black" }}>Enrolled</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/* Additional chapters */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function StudentOneCourse() {
    const matches = useMediaQuery('(min-width:600px)');
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const courses = [
        { bg: "#193ae3", buttonBg: "#193ae3", buttonLabel: "1st", chapter: "Foundation of Python &SQL Basic...", notes: 2, videos: 32, progress: "97%" },
        { bg: "#c645b1", buttonBg: "darkviolet", buttonLabel: "2nd", chapter: "Framework & Styling", notes: 2, videos: 22, progress: "88%" },
        { bg: "#e2d148", buttonBg: "orange", buttonLabel: "3rd", chapter: "Prototype Functionalities...", notes: 0, videos: 0, progress: "0%" },
        { bg: "#f05b95", buttonBg: "pink", buttonLabel: "4th", chapter: "Database Management with Python", notes: 0, videos: 0, progress: "0%" },
        { bg: "#38d099", buttonBg: "lightgreen", buttonLabel: "5th", chapter: "Backend Linking & Hosting", notes: 0, videos: 0, progress: "0%" },
        { bg: "#44aba3", buttonBg: "#46cbc5", buttonLabel: "6th", chapter: "Padding with Python", notes: 0, videos: 0, progress: "0%" },
    ];

    return (
        <Grid
            style={{
                backgroundImage: `url(${back})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '120vh',
                padding: matches ? '120px' : '20px', // Adjust padding based on screen size
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" mt={2}>
                        <ArrowBackIcon style={{ marginBottom: '-5px', marginRight: '20px' }} />
                        <Typography variant="h3">Course</Typography>
                    </Box>
                    <TabContext value={value}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabList onChange={handleChange} value={value} aria-label="Course tabs">
                                <Tab label="About" value="1" />
                                <Tab label="Class/Notes & Materials" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <StudentMainCourse />
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container spacing={2} mt={4}>
                                {courses.map((course, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card style={{ backgroundColor: course.bg }}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} display="flex" justifyContent="space-between">
                                                        <Button variant="contained" style={{ backgroundColor: course.buttonBg, color: '#fff' }}>
                                                            {course.buttonLabel}
                                                        </Button>
                                                        <Typography variant="h4" style={{ color: '#fff'}}>Chapter</Typography>
                                                        </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="space-between" mt={3}>
                                                        <Typography variant="h5" style={{ color: '#fff' }}>
                                                            {course.chapter}
                                                        </Typography>
                                                        <Typography variant="h2" style={{ color: '#fff' }}>
                                                            {course.progress}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="space-between" mt={4}>
                                                        <Box display="flex" alignItems="center">
                                                            <DescriptionIcon style={{ color: '#fff', marginRight: '4px' }} />
                                                            <Typography variant="h5" style={{ color: '#fff' }}>
                                                                {course.notes} Notes
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" alignItems="center">
                                                            <SlideshowIcon style={{ color: '#fff', marginRight: '4px' }} />
                                                            <Typography variant="h5" style={{ color: '#fff' }}>
                                                                {course.videos} Videos
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            {/* Additional grids for chapters, study materials, and notes */}
                            <Grid container spacing={2} mt={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
                                {chapters.map((image, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index} style={{ flexShrink: 0 }}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <CardMedia
                                                style={{ height: "200px", borderRadius: "10px", width: "80%" }}
                                                image={image}
                                                title={`Chapter ${index + 1}`}
                                            />
                                            <CardContent>
                                                <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography variant="h6" style={{ marginRight: "auto" }}>Chapter {index + 1}</Typography>
                                                    <Typography variant="h6">
                                                        <AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />01:32
                                                    </Typography>
                                                </Grid>
                                                <Typography variant="body2" color="text.secondary" mt={2}>By Raja Kannan</Typography>
                                                <Grid style={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                                    <Typography variant="h6">
                                                        <DateRangeOutlinedIcon style={{ color: "blue", marginBottom: "-5px" }} />23 Apr 2023
                                                    </Typography>
                                                    <Typography variant="h6" style={{ marginLeft: "30px" }}>
                                                        <AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />5:30PM
                                                    </Typography>
                                                </Grid>
                                            </CardContent>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant='h4' mt={2}>Study Materials</Typography>
                            <Grid container spacing={2} mt={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
                                {studyMaterials.map((chapter) => (
                                    <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                                        <Card variant="outlined">
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item xs={2}>
                                                    <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant='h6' gutterBottom>Chapter-{chapter}</Typography>
                                                    <Typography variant='body2'>
                                                        JavaScript Development
                                                        <FileDownloadOutlinedIcon style={{ marginBottom: "-5px" }} />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant='h4' mt={2}>Notes</Typography>
                            <Grid container spacing={2} mt={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
                                {notes.map((chapter) => (
                                    <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                                        <Card variant="outlined">
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item xs={2}>
                                                    <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant='h6' gutterBottom>Chapter-{chapter}</Typography>
                                                    <Typography variant='body2'>
                                                        Java Notes
                                                        <FileDownloadOutlinedIcon style={{ marginBottom: "-5px" }} />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            </TabPanel>
                            </TabContext>
                            </Grid></Grid></Grid>
    )
  }
  export default  StudentOneCourse;