import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import logo from '../../../assets/images/pages/auth-v2-forgot-password-illustration-light.png';
import { Container, Paper, Typography, TextField, Button, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F8F7FA',
    padding: theme.spacing(4),
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
    position: 'relative',
  },
  header: {
    textAlign: 'left',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '15px',
    color: 'black',
  },
  logo: {
    width: '140px',
    height: 'auto',
    position: 'absolute',
    top: '40%',
    right: '40px',
    transform: 'translateY(-50%)',
  },
  buttons: {
    textAlign: 'right',
    marginTop: theme.spacing(15),  
  },
  cancelButton: {
    backgroundColor: '#F8F7FA',
    color: 'black',
    marginRight: theme.spacing(2),
    '&:hover': {
      boxShadow: `0 0 10px #F8F7FA`,
    }
  },  
  confirmButton: {
    textTransform: 'none', 
    '&:hover': {
      boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    },
  },  
  formControl: {
    width: '100%',
    marginTop: theme.spacing(3), 
    marginBottom: theme.spacing(2),      
  },
  dialog: {
    padding: '5px',
    width: '360px', 
    height:'180px',
  },
  contentText: {
    color: 'black',
    textAlign: 'center',    
  },
  button: {
    marginTop:'-20px',
    border: '1px solid #0043b0',
    borderRadius: '30px',
    width: '100px',
    height: '10px',
    fontSize: '12px',
    marginRight: '12px',
    color: '#0043b0',
    '&:hover': {
      color: 'white',
      backgroundColor: '#005cf2', 
    },
  },
}));

const CreateTicketPage = () => {
  const classes = useStyles();
  const [selectedProblem, setSelectedProblem] = useState('');
  const [description, setDescription] = useState('');
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleFileUpload = () => {   
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.header}>Create Ticket for Your Problem</Typography>
          <div className={classes.formControl}>
            <InputLabel htmlFor="dropdown">Select your Problem</InputLabel>
            <Select
              id="dropdown"
              value={selectedProblem}
              style={{ width: '230px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'#F8F7FA', color:'black'}}
              onChange={(e) => setSelectedProblem(e.target.value)} 
            >
              <MenuItem value={1}>Attendance issue</MenuItem>
              <MenuItem value={2}>Issue 2</MenuItem>
              <MenuItem value={3}>Issue 3</MenuItem>
            </Select>
          </div>
          <div className={classes.formControl}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField
              id="description"
              multiline
              rows={4}
              style={{ width: '70%', height: 'auto', display: 'flex', justifyContent: 'center', background:'#F8F7FA', color:'black'}}
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div className={classes.formControl}>
            <InputLabel htmlFor="attachment">Attachment</InputLabel>
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              style={{ width: '230px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'#d7e4f7', color:'#2c74e8'}}
            >
              <CloudUploadIcon style={{ fontSize: 24, marginRight: '5px' }} />
              Upload
              <input type="file" id="attachment" onChange={handleFileUpload} style={{ display: 'none' }} />
            </Button>
          </div>
          <img src={logo} alt="Logo" className={classes.logo} />
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.confirmButton}
            >
              Confirm Ticket
            </Button>
          </div>
        </Paper>
      </Container>

      
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
        classes={{ paper: classes.dialog }}
      >
        <DialogContent>
          <DialogContentText className={classes.contentText} id="cancel-dialog-description" >
              Do you Want to discard?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={handleCloseCancelDialog} className={classes.button}>
            Cancel
          </Button>
          <Button onClick={handleCloseCancelDialog} className={classes.button} autoFocus>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default CreateTicketPage;
