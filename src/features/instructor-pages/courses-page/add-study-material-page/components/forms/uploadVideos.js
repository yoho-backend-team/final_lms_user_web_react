import React from 'react';
import { Box, Button, Divider, TextField, Typography, FormControl, FormLabel, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import VideoPlayIcon from 'assets/icons/course/videoIcon';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight : "140px",
    alignItems: 'center',
    padding: theme.spacing(3),
    border: '2px dashed #5611B1',
    borderRadius: "14px",
    backgroundColor : '#E7DCF6',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E7DCF6',
    },
  },
  input: {
    display: 'none',
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  browseButton: {
    marginTop: theme.spacing(2),
  },
}));

const UploadVideos = () => {
  const classes = useStyles();

  const handleFileUpload = (event) => {
    console.log(event.target.files);
  };

  const formik = useFormik({
    initialValues: {
      heading: '',
      handledBy: '',
      date: '',
      time : "",
      file: null,
    },
    validationSchema: Yup.object({
      heading: Yup.string().required('Heading is required'),
      handledBy: Yup.string().required('Class handled by is required'),
      date: Yup.date().required('Date is required'),
      time : Yup.string().required("Time is required"),
      file: Yup.mixed().required('File is required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Box sx={{ display: 'flex', width: '100%', px: '80px',pt:"20px", overflow : "auto",pb:"60px" }}>
      <Box sx={{ flexGrow: 1, maxWidth: '50%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#000000', fontSize: '20px', fontWeight: '600', lineHeight: '24px' }}>
          Upload Videos
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ display:"flex",gap:"20px",flexDirection:"column"}}>
          <FormControl fullWidth sx={{ mb: 2, maxWidth:"330px" }}  >
            <FormLabel htmlFor="heading" sx={{ fontSize:"14px", fontWeight:500, lineHeight:"24px", color : "#000000",pb:"6px"}} >Heading</FormLabel>
            <TextField
              fullWidth
              id="heading"
              name="heading"
              placeholder="Enter heading"
              value={formik.values.heading}
              onChange={formik.handleChange}
              sx={{
                border : formik.touched.heading && Boolean(formik.errors.heading) ? "none" : " 1.4px solid #BDBDBD",
                borderRadius : "32px",
                 boxShadow : "none",
                "& .MuiInputBase-input::placeholder":{
                  color : "#B1B1B1",
                  fontSize: "14px",
                  fontWeight : 700, 
                  lineHeight : "24px",
                },
                "& fieldset" : {
                  border :" 1.4px solid #BDBDBD" ,
                  borderRadius : "32px"
                }
              }}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel htmlFor="handledBy" sx={{ fontSize:"14px", fontWeight:500, lineHeight:"24px", color : "#000000", pb:"6px"}} >Class Handled By</FormLabel>
            <TextField
              fullWidth
              id="handledBy"
              name="handledBy"
              placeholder="Enter name"
              value={formik.values.handledBy}
              onChange={formik.handleChange}
              error={formik.touched.handledBy && Boolean(formik.errors.handledBy)}
              helperText={formik.touched.handledBy && formik.errors.handledBy}
              InputProps={{
                style : { boxShadow: "none"}
              }}
              sx={{
                border : formik.touched.handledBy && Boolean(formik.errors.handledBy) ? "none" : " 1.4px solid #BDBDBD",
                borderRadius : "32px",
                 boxShadow : "none",
                "& .MuiInputBase-input::placeholder":{
                  color : "#B1B1B1",
                  fontSize: "14px",
                  fontWeight : 700, 
                  lineHeight : "24px",
                },
                "& fieldset" : {
                  border :" 1.4px solid #BDBDBD" ,
                  borderRadius : "32px"
                },
                ":focus":{
                  boxShadow : "none"
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="dateTime" sx={{ fontSize:"14px", fontWeight:500, lineHeight:"24px", color : "#000000",pb:"6px"}} >Class Date & Time</FormLabel>
            <Box sx={{ display: "flex", gap:"20px", maxWidth:"388px"}} >
            <TextField
              fullWidth
              id="date"
              name="date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              inputProps={{
                style : { boxShadow: "none"}
              }}
              sx={{
                border : formik.touched.date && Boolean(formik.errors.date) ? "none" : " 1.4px solid #BDBDBD",
                borderRadius : "32px",
                 boxShadow : "none",
                "& .MuiInputBase-input::placeholder":{
                  color : "#B1B1B1",
                  fontSize: "14px",
                  fontWeight : 700, 
                  lineHeight : "24px",
                },
                "& fieldset" : {
                  border :" 1.4px solid #BDBDBD" ,
                  borderRadius : "32px"
                },
                ":focus":{
                  boxShadow : "none"
                }
              }}
            />
            
            <TextField
              fullWidth
              id="time"
              name="time"
              type="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={formik.touched.time && formik.errors.time}
              inputProps={{
                style:{boxShadow:"none"}
              }}
              sx={{
                border : formik.touched.time && Boolean(formik.errors.time) ? "none" :" 1.4px solid #BDBDBD",
                borderRadius : "32px",
                 boxShadow : "none",
                "& .MuiInputBase-input::placeholder":{
                  color : "#B1B1B1",
                  fontSize: "14px",
                  fontWeight : 700, 
                  lineHeight : "24px",
                },
                "& fieldset" : {
                  border :" 1.4px solid #BDBDBD" ,
                  borderRadius : "32px"
                },
                ":focus":{
                  boxShadow : "none"
                },
                "& .Mui focused":{
                  boxShadow : "none"
                }
              }}
            />
            </Box>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "460px" }}>
            <FormLabel sx={{ fontSize:"14px", fontWeight:500, lineHeight:"24px", color : "#000000",pb:"10px"}} >Upload session / Class video</FormLabel>
              <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center"}} className={classes.root} variant="outlined" component="label">
                <input
                  type="file"
                  accept="video/*"
                  className={classes.input}
                  onChange={handleFileUpload}
                />
                <Box 
                sx={{ display:"flex",alignItems: "center",gap:"15px"}}>
                <Box>
                <VideoPlayIcon  />
                </Box>
                <Box sx={{ display:"inline-flex",gap:"10px",alignItems:"center"}} >
                <Typography variant="subtitle1" sx={{ color : "black", fontSize:"12px",fontWeight:500,}} className={classes.text}>
                  Drag & Drop file
                </Typography>
                <Typography sx={{ color : "#787380", fontSize:"12px", fontWeight:500}} >
                  or
                </Typography>
                </Box>
                <Box sx={{ display:"inline-flex", alignItems:"center"}} >
                <Button
                  variant="contained"
                  component="span"
                  className={classes.browseButton}
                  sx={{
                    color : "#FFFFFF",
                    borderRadius : "25px",
                    backgroundColor : "#5611B1"
                  }}
                >
                  Browse
                </Button>
                </Box>
                </Box>
              </Paper>
            {formik.touched.file && formik.errors.file && (
              <Typography color="error">{formik.errors.file}</Typography>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: "flex-end", maxWidth:"460px",gap:"20px" }}>
            <Button color="secondary" variant="outlined" sx={{ border:"1.55px solid #5611B1",color:"#5611B1",borderRadius:"29px", fontSize:"13px",fontWeight:500}} type="button">
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit"
            sx={{
              color : "white",
              backgroundColor : "#5611B1",
              border : "1.55px solid #5611B1",
              borderRadius : "29px"
            }}
            endIcon={
              <FileUploadOutlinedIcon sx={{ color : "white"}} />
            }
             >
              Upload
            </Button>
          </Box>
        </form>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>No Uploads</Typography>
      </Box>
    </Box>
  );
};

export default UploadVideos;
