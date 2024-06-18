import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography,Grid,InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from '@mui/styles';
import {useTheme} from '@mui/material/styles';
import { CreateTicketRightSideImage } from 'utils/images';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelDialog from 'components/modal/cancelModel';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const useStyles = makeStyles({
   form : {
    gap : "38px"
   },
   label : {
    color: "#606060",
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal"
   },
   rootright : {
     display : "flex",
     flexDirection : "column",
     justifyContent : "space-between",
     paddingRight : "20px",
     height : "100%"
   },
   rightImage : {
    display : "flex",
    justifyContent : "flex-end"
   },
   cancelButton : {
     background : "#F8F9FA",
     border : "1px solid #DEE2E6"
   },
   conformButton : {
    background : "#5611B1",
    boxShadow : "0px 6px 34px -8px #0D6EFD"
   }
})

const CreateTicketForm = ({ handleClose }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [open, setOpen] = useState(false);

  const problems = [
    { value: 'attendance', label: 'Attendance Issue' },
    { value: 'grade', label: 'Grade Issue' },
    { value: 'material', label: 'Course Material' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'submission', label: 'Assignment Submission' },
  ];

  const handleProblemChange = (event) => {
    setProblem(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleOpen = () => setOpen(true);
  const handleCloseCancel = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    console.log('Cancel clicked');
  };
  const handleConfirm = () => {
    setOpen(false);
    console.log('Confirm clicked');
  };

  const handleSubmit = () => {
    console.log({
      problem,
      description,
      attachment,
    });
    handleClose();
  };


  return (
    <>
    <Box sx={{backgroundColor:"#FFF",borderRadius:"18px",border:"0px 0px 64px 0px rgba(0, 0, 0, 0.10)",padding:"40px"}} >
    
    <Box sx={{display:"flex",gap:"30px",pb:"40px"}}  >
        <Box sx={{":hover":{cursor:"pointer"}}} onClick={handleClose}  >
         <ArrowBackIcon  />
        </Box>
        <Box>
            <Typography sx={{color:"#282828",fontSize:"24px",fontWeight:800,lineHeight:"24px"}} >Create Ticket for your problem</Typography>
        </Box>
    </Box>

    <Grid container xs={12}  >
        <Grid item xs={8}>
           <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            className={classes.form}
            >
            <Grid
            item
            xs={6}
            sx={{display:"flex",justifyContent:"flex-start",flexDirection:"column",gap:"10px"}}
            >
            <InputLabel className={classes.label}>Select your Problem</InputLabel>
            <TextField
              select
              label="Select Problem"
              value={problem}
              onChange={handleProblemChange}
              fullWidth
            >
              {problems.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

            <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}} >
            <InputLabel className={classes.label} >Description</InputLabel>
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              rows={7}
              fullWidth
            />
            </Box>

            <Grid item xs={6} sx={{display:"flex",flexDirection:"column",gap:"10px"}} >
            <InputLabel className={classes.label} >Attachment</InputLabel>
            <Button
             component="label"
             role={undefined}
             variant="contained"
             tabIndex={-1}
             startIcon={<CloudUploadIcon sx={{color : "#5611B1"}} />}
             sx={{backgroundColor:"#DFC7FF",color:"#5611B1"}}
            >
              Upload file
              <VisuallyHiddenInput type="file"  onChange={handleAttachmentChange} />
            </Button>
            <Box sx={{display:"flex",alignItems:"center",py:"20px",gap:"10px"}} >
               <InfoOutlinedIcon sx={{color:"#5611B1"}} />
               <Typography sx={{color:"#5611B1",fontSize:"16px",fontWeight:500,lineHeight:"21px"}} >How it Works</Typography>
            </Box>
            </Grid>

            

           </Box>
        </Grid>
        <Grid item xs={4} >
           <Grid className={classes.rootright} >
            <Box className={classes.rightImage} >
              <img src={CreateTicketRightSideImage} alt='create ticket' />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" className={classes.cancelButton} sx={theme.custom.buttonStyles.button1} onClick={handleOpen}>
                Cancel
              </Button>
              <Button variant="contained" className={classes.conformButton} sx={theme.custom.buttonStyles.button1} onClick={handleSubmit}>
                Conform Ticket
              </Button>
            </Box>
            </Grid>
        </Grid>
    </Grid>

    </Box>
    <CancelDialog
      open={open}
      onClose={handleCloseCancel}
      title=""
      content="Do you want to discard?"
      cancelText="cancel"
      confirmText="Discard"
      onCancel={handleCancel}
      onConfirm={handleClose}
        />
    </>
  );
};

export default CreateTicketForm;
