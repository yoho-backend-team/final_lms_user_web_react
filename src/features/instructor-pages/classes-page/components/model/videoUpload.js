import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Custom URL validation
const videoURLValidation = (url) => {
  const videoPlatforms = ['youtube.com', 'vimeo.com', 'dailymotion.com'];
  try {
    const { hostname } = new URL(url);
    return videoPlatforms.some(platform => hostname.includes(platform));
  } catch (error) {
    return false;
  }
};

const VideoUpload = ({ updateClass }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    url: Yup.string()
      .required("URL is required")
      .test('is-video-url', 'Please enter a valid video URL', value => videoURLValidation(value)),
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={
          <VideoLibraryOutlinedIcon
            sx={{
              color: "#5611B1",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "24px",
            }}
          />
        }
        sx={{
          border: "2px solid #5611B1",
          borderRadius: "24px",
          color: "#5611B1",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        Add Video
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Upload Video</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ title: "", description: "", url: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const data = {
                videos: {
                  url: values.url,
                },
              };
              updateClass(data);
              handleClose();
            }}
          >
            {() => (
              <Form>
                <Box sx={{ mb: 2 }}>
                  <Field
                    name="url"
                    as={TextField}
                    label="Video URL"
                    fullWidth
                  />
                  <ErrorMessage
                    name="url"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose} variant="contained" color="warning" sx={{ fontSize: "12px" }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "12px" }}
                  >
                    Upload
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoUpload;
