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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    alignItems: "center",
    padding: "16px",
    border: "2px dashed #6a11cb",
    borderRadius: "14px",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(230, 230, 230, 1) 100%)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(145deg, rgba(245, 245, 245, 1) 0%, rgba(230, 230, 230, 1) 100%)",
      transform: "scale(1.03)",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  input: {
    display: "none",
  },
  icon: {
    fontSize: 48,
    marginBottom: "8px",
    color: "#6a11cb",
  },
  text: {
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },
  browseButton: {
    marginTop: "8px",
    background: "linear-gradient(145deg, #6a11cb, #2575fc)",
    borderRadius: "25px",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(145deg, #5e10a3, #1f64e3)",
    },
  },
  cancelButton: {
    border: "1.5px solid #6a11cb",
    borderRadius: "29px",
    color: "#6a11cb",
    fontWeight: 600,
    padding: "10px 24px",
    "&:hover": {
      background: "rgba(230, 230, 230, 0.2)",
    },
  },
  uploadButton: {
    background: "linear-gradient(145deg, #6a11cb, #2575fc)",
    color: "#fff",
    borderRadius: "29px",
    fontWeight: 600,
    padding: "10px 24px",
    "&:hover": {
      background: "linear-gradient(145deg, #5e10a3, #1f64e3)",
    },
  },
}));

const UploadVideos = () => {
  const classes = useStyles();

  const handleFileUpload = (event) => {
    // Handle file upload logic here
  };

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
      handledBy: Yup.string().required("Class handled by is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string().required("Time is required"),
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: (values) => {
      // Form submission logic
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        px: "20px",
        pt: "20px",
        overflow: "auto",
        pb: "60px",
        background: "#f4f6f9",  // Light theme background
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: "50%" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            color: "#333",
            fontSize: "28px",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          Upload Videos
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", gap: "20px", flexDirection: "column" }}
        >
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="heading"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                pb: "6px",
              }}
            >
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
                "& .MuiInputBase-input": {
                  color: "#333",
                },
                "& fieldset": {
                  border: "1.5px solid #6a11cb",
                  borderRadius: "30px",
                },
              }}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="handledBy"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                pb: "6px",
              }}
            >
              Class handled by
            </FormLabel>
            <TextField
              fullWidth
              id="handledBy"
              name="handledBy"
              placeholder="Enter instructor's name"
              value={formik.values.handledBy}
              onChange={formik.handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#333",
                },
                "& fieldset": {
                  border: "1.5px solid #6a11cb",
                  borderRadius: "30px",
                },
              }}
              error={formik.touched.handledBy && Boolean(formik.errors.handledBy)}
              helperText={formik.touched.handledBy && formik.errors.handledBy}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="date"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                pb: "6px",
              }}
            >
              Date
            </FormLabel>
            <TextField
              fullWidth
              id="date"
              name="date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#333",
                },
                "& fieldset": {
                  border: "1.5px solid #6a11cb",
                  borderRadius: "30px",
                },
              }}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="time"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                pb: "6px",
              }}
            >
              Time
            </FormLabel>
            <TextField
              fullWidth
              id="time"
              name="time"
              type="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#333",
                },
                "& fieldset": {
                  border: "1.5px solid #6a11cb",
                  borderRadius: "30px",
                },
              }}
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={formik.touched.time && formik.errors.time}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, maxWidth: "460px" }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                pb: "10px",
              }}
            >
              Upload session / Class video
            </FormLabel>
            <Paper className={classes.root} variant="outlined" component="label">
              <input
                type="file"
                accept="video/*"
                className={classes.input}
                onChange={handleFileUpload}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <VideoPlayIcon className={classes.icon} />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className={classes.text}
                    sx={{ color: "#333" }}
                  >
                    Drag & Drop file
                  </Typography>
                  <Typography sx={{ color: "#787380", fontSize: "12px" }}>
                    or
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
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              maxWidth: "460px",
            }}
          >
            <Button variant="outlined" className={classes.cancelButton}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              className={classes.uploadButton}
              endIcon={<FileUploadOutlinedIcon />}
            >
              Upload
            </Button>
          </Box>
        </form>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "#6a11cb" }} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#333" }}>No Uploads</Typography>
      </Box>
    </Box>
  );
};

export default UploadVideos;

