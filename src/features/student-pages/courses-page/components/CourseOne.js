import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import back from '../../../../../src/assets/images/pages/background_2.png';

function StudentOneCourse() {
  const matches = useMediaQuery('(min-width:600px)');

  const courses = [
    { bg: "#193ae3", buttonBg: "#193ae3", buttonLabel: "1st", chapter: "Foundation of Python &SQL Basic...", notes: 2, videos: 32, progress: "97%" },
    { bg: "#c645b1", buttonBg: "darkviolet", buttonLabel: "2nd", chapter: "Framework & Styling", notes: 2, videos: 22, progress: "88%" },
    { bg: "#e2d148", buttonBg: "orange", buttonLabel: "3rd", chapter: "Prototype Functionalities...", notes: 0, videos: 0, progress: "0%" },
    { bg: "#f05b95", buttonBg: "pink", buttonLabel: "4th", chapter: "Database Management with Python", notes: 0, videos: 0, progress: "0%" },
    { bg: "#38d099", buttonBg: "lightgreen", buttonLabel: "5th", chapter: "Backend Linking & Hosting", notes: 0, videos: 0, progress: "0%" },
    { bg: "#44aba3", buttonBg: "#46cbc5", buttonLabel: "6th", chapter: "Padding with Python", notes: 0, videos: 0, progress: "0%" },
  ];

  return (
    <Grid style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover', backgroundPosition: "center", minHeight: '120vh' }}>
            <Grid container spacing={2} style={{ padding: '60px' }}>
    <Grid container spacing={2} mt={4}>
      {courses.map((course, index) => (
        <Grid item xs={matches? 12 :12} sm={6} md={4} lg={3} key={index}>
          <Card style={{ backgroundColor: course.bg }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={matches? 12:12} display="flex" justifyContent="space-between">
                  <Button variant='contained' style={{ backgroundColor: course.buttonBg, color: "#fff" }}>
                    {course.buttonLabel}
                  </Button>
                  <Typography variant='h4' style={{ color: "#fff" }}>
                    Chapter
                  </Typography>
                </Grid>
                <Grid item xs={matches? 12 :12} display="flex" justifyContent="space-between" mt={3}>
                  <Typography variant='h5' style={{ color: "#fff" }}>
                    {course.chapter}
                  </Typography>
                  <Typography variant='h2' style={{ color: "#fff" }}>
                    {course.progress}
                  </Typography>
                </Grid>
                <Grid item xs={matches? 12 : 12} display="flex" justifyContent="space-between" mt={4}>
                  <Grid display="flex" alignItems="center">
                    <DescriptionIcon style={{ color: "#fff", marginRight: "4px" }} />
                    <Typography variant='h5' style={{ color: "#fff" }}>
                      {course.notes} Notes
                    </Typography>
                  </Grid>
                  <Grid display="flex" alignItems="center">
                    <SlideshowIcon style={{ color: "#fff", marginRight: "4px" }} />
                    <Typography variant='h5' style={{ color: "#fff" }}>
                      {course.videos} Videos
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Grid>
    </Grid>
  );
}

export default StudentOneCourse;