import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, Button, Avatar, Box, CardContent, AvatarGroup, Paper, Breadcrumbs, Stack, Tooltip, CardMedia, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import stu from '../../../../assets/images/Elite/stu.jpg';
import pdf from '../../../../assets/images/Elite/pdf.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function OnlineUpcomingClasses() {
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const breadcrumbs = [
    <Typography key="1" color="text.primary" variant='h2'>
      Classes
    </Typography>,
    <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
      Online class
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Upcoming class
    </Link>,
    <Link
      underline="hover"
      key="4"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Basic of Pyth...
    </Link>,
  ];

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const PadPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height: 'auto',
    marginLeft: 'auto', 
    marginRight: 'auto',
    background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)'
  }));

  return (
    <PadPaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ margin: "25px", marginLeft: "35px" }}>
            <Grid container spacing={2} sx={{ padding: "20px" }}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Grid container alignItems="center">
                    <ArrowBackIcon sx={{ marginRight: 1 }} />
                    Batch No:<Typography variant="h3">#{id}</Typography>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Typography variant="h1">Class Details</Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="h3">Basics of Python Chapter 3, Framework & Styling</Typography>
                </Box>
                <Box mt={4}>
                  <Typography variant="body1">
                    User experience (UX) is the overall experience a user has when interacting with a product or service. UX design is the process of creating products that provide meaningful experiences for users.
                  </Typography>
                </Box>
                <Box mt={4}>
                  <Card sx={{ backgroundColor: "#beeef7" }}>
                    <CardContent>
                      <Grid container justifyContent="space-around">
                        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>Date</Typography>
                        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>Start At</Typography>
                        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>End At</Typography>
                        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>Duration</Typography>
                      </Grid>
                      <Grid container justifyContent="space-around" sx={{ marginTop: "10px", marginBottom: "10px" }}>
                        <Typography variant="h4" sx={{ color: "#79a7d9" }}>13 Feb 2024</Typography>
                        <Typography variant="h4" sx={{ color: "#79a7d9" }}>10:30 AM</Typography>
                        <Typography variant="h4" sx={{ color: "#79a7d9" }}>11:30 AM</Typography>
                        <Typography variant="h4" sx={{ color: "#79a7d9" }}>1:24:36</Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h3" gutterBottom>Class Status</Typography>
                      <Typography variant="body1">Class Finished &copy;11:30 AM</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} sx={{ display: 'flex', flexDirection: 'column'}}>
                      <Button variant="outlined" sx={{ borderRadius: "50px", marginBottom: "15px" }}>Check Attendance</Button>
                      <Typography variant="body1"><ErrorOutlineIcon sx={{ marginBottom: "-6px" }} />If there are any issues with attendance, please raise a ticket.</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h3'>Other Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ backgroundColor: "#f5ca9d" }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>Students</Typography>
                        <AvatarGroup max={4}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                        <Grid container justifyContent="space-between" sx={{ marginTop: "20px" }}>
                          <Typography variant='h5'>Total 67</Typography>
                          <Box>
                            <CardMedia
                              component="img"
                              image={stu}
                              height={60}
                              width={20}
                              alt="Student Image"
                              sx={{ marginBottom: "-22px", marginLeft: "20px" }}
                            />
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ backgroundColor: "#f2e4e4" }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>Instructor</Typography>
                        <AvatarGroup max={4}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                        <Grid container justifyContent="space-between" sx={{ marginTop: "20px" }}>
                          <Typography variant='h5'>Total 4</Typography>
                          <Box>
                            <CardMedia
                              component="img"
                              image={stu}
                              height={60}
                              width={20}
                              alt="Instructor Image"
                              sx={{ marginBottom: "-22px", marginLeft: "20px" }}
                            />
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ backgroundColor: "#eff59d" }}>
                      <CardContent>
                        <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Student">
                          <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                          </AvatarGroup>
                        </Tooltip>
                        <Grid container justifyContent="space-between" sx={{ marginTop: "20px" }}>
                          <Typography variant='h5'>Total 2</Typography>
                          <Box>
                            <CardMedia
                              component="img"
                              image={stu}
                              height={60}
                              width={20}
                              alt="Student Image"
                              sx={{ marginBottom: "-22px", marginLeft: "20px" }}
                            />
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sx={{ marginTop: "25px" }}>
                    <Typography variant='h3' gutterBottom>Study Materials</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2}>
                      <Paper variant="outlined" sx={{ borderColor: "black", borderBottom: "none", padding: matches ? '20px' : '10px' }}>
                        <Paper variant="outlined" sx={{ borderColor: "black", padding: matches ? '20px' : '10px', marginBottom: matches ? '10px' : '5px' }}>
                          <Grid container alignItems="center" justifyContent="space-around">
                            <Grid item>
                              <CardMedia
                                component="img"
                                image={pdf}
                                height={50}
                                width={100}
                                alt="PDF Icon"
                              />
                            </Grid>
                            <Grid item xs>
                              <Typography variant='h4'>Chapter-03</Typography>
                              <Typography variant='h5'>JavaScript Development <FileDownloadOutlinedIcon sx={{ marginBottom: "-5px" }} /></Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                        <Paper variant="outlined" sx={{ borderColor: "black", padding: matches ? '20px' : '10px' }}>
                          <Grid container alignItems="center" justifyContent="space-around">
                            <Grid item>
                              <CardMedia
                                component="img"
                                image={pdf}
                                height={50}
                                width={100}
                                alt="PDF Icon"
                              />
                            </Grid>
                            <Grid item xs>
                              <Typography variant='h4'>Chapter-03</Typography>
                              <Typography variant='h5'>JavaScript Development <FileDownloadOutlinedIcon sx={{ marginBottom: "-5px" }} /></Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </PadPaper>
  );
}
