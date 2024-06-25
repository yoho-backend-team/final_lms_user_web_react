import React from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Divider from '@mui/material/Divider';
import NoteIcon from 'assets/icons/noteIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '140px',
    alignItems: 'center',
    padding: theme.spacing(3),
    border: '2px dashed #5611B1',
    borderRadius: '14px',
    backgroundColor: '#E7DCF6',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E7DCF6',
    },
  },
  input: {
    display: 'none',
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  browseButton: {
    marginTop: theme.spacing(2),
  },
  helperText: {
    "& .MuiFormHelperText-root": {
      border: 'none',
    },
  },
}));

const UploadNotes = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      heading: '',
      subLine: '',
      file: null,
    },
    validationSchema: Yup.object({
      heading: Yup.string().required('Heading is required'),
      subLine: Yup.string().required('Sub Line is required'),
      file: Yup.mixed().required('File is required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Box sx={{ display: 'flex', width: '100%', px: '80px', pt: '20px', overflow: 'auto', pb: '60px' }}>
      <Box sx={{ flexGrow: 1, maxWidth: '50%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#000000', fontSize: '20px', fontWeight: '600', lineHeight: '24px' }}>
          Upload Notes
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: '330px' }}>
            <FormLabel htmlFor="heading" sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '24px', color: '#000000', pb: '6px' }}>
              Heading
            </FormLabel>
            <TextField
              fullWidth
              id="heading"
              name="heading"
              placeholder="Enter heading"
              value={formik.values.heading}
              onChange={formik.handleChange}
              sx={{
                border: formik.touched.heading && Boolean(formik.errors.heading) ? "none" : '1.4px solid #BDBDBD',
                borderRadius: '32px',
                boxShadow: 'none',
                "& .MuiInputBase-input::placeholder": {
                  color: '#B1B1B1',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '24px',
                },
                "& fieldset": {
                  border: '1.4px solid #BDBDBD',
                  borderRadius: '32px',
                },
                "& .MuiFormHelperText-root":{
                    border : "none"
                }
              }}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
              FormHelperTextProps={{
                classes:{
                    root:classes.helperText
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: '330px' }}>
            <FormLabel htmlFor="subLine" sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '24px', color: '#000000', pb: '6px' }}>
              Sub Line
            </FormLabel>
            <TextField
              fullWidth
              id="subLine"
              name="subLine"
              placeholder="Enter sub line"
              value={formik.values.subLine}
              onChange={formik.handleChange}
              error={formik.touched.subLine && Boolean(formik.errors.subLine)}
              helperText={formik.touched.subLine && formik.errors.subLine}
              InputProps={{
                style: { boxShadow: 'none' }
              }}
              sx={{
                border: formik.touched.subLine && Boolean(formik.errors.subLine) ? "none" : '1.4px solid #BDBDBD',
                borderRadius: '32px',
                boxShadow: 'none',
                "& .MuiInputBase-input::placeholder": {
                  color: '#B1B1B1',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '24px',
                },
                "& fieldset": {
                  border: '1.4px solid #BDBDBD',
                  borderRadius: '32px',
                },
                ":focus": {
                  boxShadow: 'none'
                },
                "& .MuiFormHelperText-root":{
                    border : "none"
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: '460px' }}>
            <FormLabel sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '24px', color: '#000000', pb: '10px' }}>
              Upload Document
            </FormLabel>
            <Paper className={classes.root} sx={{ display:"flex", justifyContent:"center",alignContent:"center",alignItems:"center"}} variant="outlined" component="label">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className={classes.input}
                onChange={event => {
                  formik.setFieldValue('file', event.currentTarget.files[0]);
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Box>
                  <NoteIcon fill={"#5611B1"} />
                </Box>
                <Box sx={{display:"flex",gap:"10px"}} >
                <Typography variant="subtitle1" sx={{ color: 'black', fontSize: '12px', fontWeight: 500 }} className={classes.text}>
                  Drag & Drop file
                </Typography>
                <Typography sx={{ color: '#787380', fontSize: '12px', fontWeight: 500 }}>
                  or
                </Typography>
                </Box>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.browseButton}
                  sx={{
                    color: '#FFFFFF',
                    borderRadius: '25px',
                    backgroundColor: '#5611B1'
                  }}
                >
                  Browse
                </Button>
              </Box>
            </Paper>
            {formik.touched.file && formik.errors.file && (
              <Typography color="error">{formik.errors.file}</Typography>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '460px', gap: '20px' }}>
            <Button color="secondary" variant="outlined" sx={{ border: '1.55px solid #5611B1', color: '#5611B1', borderRadius: '29px', fontSize: '13px', fontWeight: 500 }} type="button">
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit"
              sx={{
                color: 'white',
                backgroundColor: '#5611B1',
                border: '1.55px solid #5611B1',
                borderRadius: '29px'
              }}
              endIcon={
                <FileUploadOutlinedIcon sx={{ color: 'white' }} />
              }
            >
              Upload
            </Button>
          </Box>
        </form>
      </Box>
      <Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>No Uploads</Typography>
      </Box>
    </Box>
  );
};

export default UploadNotes;
