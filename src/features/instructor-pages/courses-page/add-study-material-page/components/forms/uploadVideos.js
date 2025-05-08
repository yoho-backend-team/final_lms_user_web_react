import React from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import VideoPlayIcon from "assets/icons/course/videoIcon";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useNavigate } from "react-router-dom"; // Updated import for react-router-dom v6+

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    border: "2px dashed #6a11cb",
    borderRadius: "16px",
    background: "#fafbff",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      background: "#f1f3ff",
      boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
    },
  },
  input: {
    display: "none",
  },
  icon: {
    fontSize: 42,
    color: "#6a11cb",
  },
  browseButton: {
    marginTop: 4,
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    borderRadius: 20,
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(to right, #5a0faa, #1f64e3)",
    },
  },
  cancelButton: {
    border: "1.5px solid #6a11cb",
    borderRadius: "25px",
    color: "#6a11cb",
    fontWeight: 600,
    padding: "6px 20px",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  uploadButton: {
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "#fff",
    borderRadius: "25px",
    fontWeight: 600,
    padding: "6px 20px",
    "&:hover": {
      background: "linear-gradient(to right, #5a0faa, #1f64e3)",
    },
  },
}));

const UploadVideos = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Using useNavigate for navigation

  // Handle file upload logic
  const handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const isValidType = file.type.startsWith("video/");
      const maxSizeMB = 100; // Example: 100MB max size
      if (!isValidType) {
        alert("Please select a valid video file.");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size should be under ${maxSizeMB}MB.`);
        return;
      }
      formik.setFieldValue("file", file);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      heading: "",
      handledBy: "",
      date: "",
      time: "",
      file: null,
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      handledBy: Yup.string().required("Instructor name is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string().required("Time is required"),
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: (values) => {
      // Handle file upload (e.g., submit data to API)
      console.log("Uploading:", values);
      alert("Video uploaded successfully!");
    },
  });

  // Cancel button logic
  const handleCancel = () => {
    formik.resetForm(); // Reset Formik form
    
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        px: 3,
        pt: 3,
        pb: 5,
        background: "#f8f9fb",
      }}
    >
      <Box sx={{ flex: 1, maxWidth: "500px" }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "700", color: "#222", fontSize: "18px" }}
        >
          Upload Video
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "heading", label: "Heading", type: "text", placeholder: "Enter heading" },
            { name: "handledBy", label: "Class handled by", type: "text", placeholder: "Instructor's name" },
            { name: "date", label: "Date", type: "date" },
            { name: "time", label: "Time", type: "time" },
          ].map(({ name, label, type, placeholder }) => (
            <FormControl fullWidth sx={{ mb: 2 }} key={name}>
              <FormLabel sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
                {label}
              </FormLabel>
              <TextField
                fullWidth
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                size="small"
                sx={{
                  background: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 2px 8px rgba(106, 17, 203, 0.08)",
                  transition: "0.3s ease-in-out",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    "& fieldset": {
                      borderColor: "#6a11cb",
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5e10a3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2575fc",
                      boxShadow: "0 0 0 3px rgba(37, 117, 252, 0.15)",
                    },
                    "& input": {
                      padding: "10px 14px",
                      fontWeight: 500,
                      color: "#333",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                    marginLeft: "8px",
                    color: "#d32f2f",
                  },
                }}
              />
            </FormControl>
          ))}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
              Upload session / Class video
            </FormLabel>
            <Paper className={classes.root} variant="outlined" component="label">
              <input
                type="file"
                accept="video/*"
                className={classes.input}
                onChange={handleFileUpload}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <VideoPlayIcon className={classes.icon} />
                <Box>
                  <Typography fontWeight={600} color="text.primary">
                    Drag & Drop or
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  className={classes.browseButton}
                  component="span"
                >
                  Browse
                </Button>
              </Box>
            </Paper>
            {formik.values.file && (
              <Typography sx={{ mt: 1, fontSize: "14px", color: "#6a11cb", fontWeight: 500 }}>
                Selected: {formik.values.file.name}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button className={classes.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className={classes.uploadButton}
              type="submit"
              variant="contained"
              endIcon={<FileUploadOutlinedIcon />}
            >
              Upload
            </Button>
          </Box>
        </form>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 3,
          borderColor: "#6a11cb", // bright gradient purple theme color
          ml: "40px",
          borderWidth: "2px", // make the line bolder
          opacity: 0.9, // slightly reduce transparency for brightness
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">No Uploads</Typography>
      </Box>
    </Box>
  );
};

export default UploadVideos;
