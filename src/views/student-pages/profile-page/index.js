import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Paper, Typography, Button, Grid  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/icons8.png";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F8F7FA',
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
  papers: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 'auto',
    height: 'auto',
    position: 'relative',
    backgroundColor: '#F8F7FA',
    boxShadow: 'none', 
    border: 'none',  
    borderRadius: 0,
  },  
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
  },
  documentshadow: {
    width: 'auto',
    height: '45px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
    boxSizing: 'border-box', 
  },  
  logo: {
    width: '30px',
    height: 'auto',
    position: 'relative',
    marginRight:'10px',
  },
  header: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  section: {
    width: '72%',
    marginRight: theme.spacing(2),
  },
  card: {
    width: '28%',
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const navigateToEditPage = () => {
    navigate('/edit');
  };

  const dummyData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    gender: "Male",
    contact: "1234567890",
    address: "123 Main Strett",
    pincode: "12345",
    city:"chennai",
    Department:"Design Devlopment",
    Documents:"Mark Sheet",
  };


  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        <Paper className={classes.papers}>
          <div className={classes.header}>
            <div>
             <Button onClick={navigateToDashboard} startIcon={<ArrowBackIcon />} color="primary" style={{ color: 'black' }}>
              Back to Dashboard
              </Button>
            </div>
            <Button variant="contained" color="secondary" onClick={navigateToEditPage}>Edit</Button>
          </div>
          <div className={classes.content}>
            <div className={classes.section}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.header}>Personal info</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>First Name</Typography>
                    <Typography variant="body1">{dummyData.firstName}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Last Name</Typography>
                    <Typography variant="body1">{dummyData.lastName}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" style={{ color: 'black' }}>Email</Typography>
                    <Typography variant="body1">{dummyData.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Gender</Typography>
                    <Typography variant="body1">{dummyData.gender}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Contact</Typography>
                    <Typography variant="body1">{dummyData.contact}</Typography>
                  </Grid>
                </Grid>             
                <Grid container spacing={2} style={{ marginTop: '15px' }}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" style={{ color: 'black' }}>Address</Typography>
                    <Typography variant="body1">{dummyData.address}</Typography>
                    <Typography variant="body1">{dummyData.city}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" style={{ color: 'black' }}>Pincode</Typography>
                    <Typography variant="body1">{dummyData.pincode}</Typography>
                  </Grid>
                </Grid>                         
              </Paper>
           <div>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.header}>Academics info</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Department</Typography>
                    <Typography variant="body1">{dummyData.Department}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Course</Typography>
                    <Typography variant="body1">{dummyData.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Batch</Typography>
                    <Typography variant="body1">{dummyData.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Roll Number</Typography>
                    <Typography variant="body1">{dummyData.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1" style={{ color: 'black' }}>Student ID</Typography>
                    <Typography variant="body1">{dummyData.email}</Typography>
                  </Grid>
                </Grid>             
              </Paper>
              </div>
     
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.header}>Documents</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" className={classes.documentshadow}>
                        <img src={logo} alt="Logo" className={classes.logo} />
                                  {dummyData.Documents}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" className={classes.documentshadow}>  
                    <img src={logo} alt="Logo" className={classes.logo} />{dummyData.Documents}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" className={classes.documentshadow}>
                        <img src={logo} alt="Logo" className={classes.logo} />{dummyData.Documents}</Typography>
                  </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: '15px' }}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" className={classes.documentshadow}>  
                    <img src={logo} alt="Logo" className={classes.logo} />{dummyData.Documents}</Typography>
                  </Grid>
                  </Grid>
                  
         
              </Paper>
            </div>
            <div className={classes.card}>
              
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.header}> Virtual ID</Typography>
           
              </Paper>
         
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.header}>Course Status</Typography>
           
              </Paper>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default ProfilePage;
