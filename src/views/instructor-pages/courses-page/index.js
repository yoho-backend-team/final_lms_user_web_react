// src/CourseDetail.js
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CourseDetail = () => {
  const recordedClasses = [
    { id: 1, title: 'HTML_Part-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'HTML_Part-02', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'HTML_Part-03', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'HTML_Part-04', image: 'https://via.placeholder.com/150' },
  ];

  const studyMaterials = [
    'Chapter-01',
    'Chapter-02',
    'Chapter-03',
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Java Full Course
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          User interface (UI) refers to the visual and interactive elements of a software or product that facilitate user interaction. It encompasses design elements such as buttons, menus, and layouts, aimed at creating an intuitive and aesthetically pleasing user experience.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 3 }}>
          <Chip label="JVM" color="primary" />
          <Chip label="OOPS" color="primary" />
          <Chip label="Big Data" color="primary" />
          <Chip label="Web Arch" color="primary" />
          <Chip label="Angular" color="primary" />
          <Chip label="Node JS" color="primary" />
        </Box>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Enroll Now
        </Button>
        <Button variant="outlined" color="primary">
          Learn More
        </Button>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Benefits
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><FileCopyIcon /></ListItemIcon>
                <ListItemText primary="12 lessons" />
              </ListItem>
              <ListItem>
                <ListItemIcon><FileCopyIcon /></ListItemIcon>
                <ListItemText primary="English & Tamil" />
              </ListItem>
              <ListItem>
                <ListItemIcon><FileCopyIcon /></ListItemIcon>
                <ListItemText primary="12hrs" />
              </ListItem>
              <ListItem>
                <ListItemIcon><FileCopyIcon /></ListItemIcon>
                <ListItemText primary="3 Certificates" />
              </ListItem>
              <ListItem>
                <ListItemIcon><FileCopyIcon /></ListItemIcon>
                <ListItemText primary="Notes" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recorded Class Preview
            </Typography>
            <Grid container spacing={2}>
              {recordedClasses.map((item) => (
                <Grid item xs={6} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Study Materials
        </Typography>
        <Grid container spacing={2}>
          {studyMaterials.map((material, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <ListItemIcon><FileCopyIcon /></ListItemIcon>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {material}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Notes
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><FileCopyIcon /></ListItemIcon>
            <ListItemText primary="Java Notes" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default CourseDetail;
