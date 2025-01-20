import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CreateTicketRightSideImage } from "utils/images";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useTabResponsive } from "utils/tabResponsive";
import { useFormik } from "formik";
import * as yup from "yup";
import { CreateTickets } from "../services";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { fileUpload } from "features/common/upload";

const validationSchema = yup.object({
  problem: yup.string("Select problem").required("Problem is required"),
  title: yup.string("Enter Query is required").required("Query is required "),
  priority: yup.string("Select Priority").required("Priority is required"),
  description: yup
    .string("Enter description")
    .required("Description is required"),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const useStyles = makeStyles({
  form: {
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  label: {
    color: "#606060",
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  },
  rightImage: {
    display: "flex",
    justifyContent: "flex-end",
    objectFit: "cover",
    borderRadius: "12px",
    width: "100%",
  },
  cancelButton: {
    background: "#F8F9FA",
    border: "1px solid #DEE2E6",
  },
  conformButton: {
    background: "#5611B1",
    boxShadow: "0px 6px 34px -8px #0D6EFD",
  },
});

const CreateTicketForm = ({ handleClose }) => {
  const classes = useStyles();
  const { showSpinner, hideSpinner } = useSpinner();

  const problems = [
    { value: "attendance", label: "Attendance Issue" },
    { value: "grade", label: "Grade Issue" },
    { value: "material", label: "Course Material" },
    { value: "support", label: "Technical Support" },
    { value: "feedback", label: "Feedback" },
    { value: "submission", label: "Assignment Submission" },
  ];

  const priority = [
    { value: "Low", label: "Low" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Urgent", label: "Urgent" },
  ];

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      problem: "",
      description: "",
      priority: "",
      title: "",
      file: "",
    },
    onSubmit: async (values) => {
      try {
        const instructor = getInstructorDetails();
        const data = {
          institute: instructor?.institute_id?._id,
          branch: instructor?.branch_id?._id,
          category: values?.problem,
          priority: values?.priority,
          query: values?.title,
          description: values?.description,
          user: instructor?._id,
          file: values?.file,
        };
        const response = await CreateTickets(data);
        handleClose();
        toast.success("Ticket created successfully");
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  const handleAttachmentChange = async (event) => {
    try {
      showSpinner();
      const file = event.target.files?.[0];
      const form_data = new FormData();
      form_data.append("file", file);
      const response = await fileUpload(form_data);
      formik.setFieldValue("file", response?.file);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "18px",
        border: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
        padding: "40px",
        overflowX: "hidden", // Prevent horizontal overflow
      }}
    >
      <Box sx={{ display: "flex", gap: "20px", pb: "20px" }}>
        <Box sx={{ ":hover": { cursor: "pointer" } }} onClick={handleClose}>
          <ArrowBackIcon />
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#282828",
              fontSize: "24px",
              fontWeight: 800,
              lineHeight: "24px",
            }}
          >
            Create Ticket for your problem
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            className={classes.form}
            onSubmit={formik.handleSubmit}
          >
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                error={formik.touched.problem && Boolean(formik.errors.problem)}
                fullWidth
              >
                <InputLabel className={classes.label}>Select your Problem</InputLabel>
                <Select
                  label="Select your Problem"
                  value={formik.values.problem}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="problem"
                  fullWidth
                >
                  {problems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.problem && formik.errors.problem && (
                  <FormHelperText>{formik.errors.problem}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Query"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                error={formik.touched.priority && Boolean(formik.errors.priority)}
                fullWidth
              >
                <InputLabel className={classes.label}>Priority</InputLabel>
                <Select
                  label="Priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="priority"
                  fullWidth
                >
                  {priority.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.priority && formik.errors.priority && (
                  <FormHelperText>{formik.errors.priority}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={4}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                variant="outlined"
              />
            </Grid>

            {/* <Grid item xs={12}>
              <InputLabel className={classes.label}>Attachment</InputLabel>
              <Button
                component="label"
                variant="contained"
                disabled={formik.values.file ? true : false}
                startIcon={<CloudUploadIcon sx={{ color: "#5611B1" }} />}
                sx={{ backgroundColor: formik.values.file ? "#E0EBFA" : "#DFC7FF", color: "#5611B1", }}
              >
                {formik.values.file ? formik.values.file?.name : "Choose file"}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleAttachmentChange}
                />
              </Button>
            </Grid> */}
            <Grid item xs={12}>
  <InputLabel className={classes.label}>Attachment</InputLabel>
  <Button
    component="label"
    variant="contained"
    disabled={formik.values.file ? true : false}
    startIcon={<CloudUploadIcon sx={{ color: "#5611B1" }} />}
    sx={{
      backgroundColor: formik.values.file ? "#E0EBFA" : "#DFC7FF", 
      color: "#5611B1",
      "&:hover": {
        backgroundColor: formik.values.file ? "#E0EBFA" : "#C1A1FF", // Light purple on hover
        transform: formik.values.file ? "none" : "scale(1.05)", // Only scale when file isn't selected
      },
      transition: "all 0.3s ease", // Smooth transition for hover
    }}
  >
    {formik.values.file ? formik.values.file?.name : "Choose file"}
    <VisuallyHiddenInput
      type="file"
      accept="image/*,.pdf"
      onChange={handleAttachmentChange}
    />
  </Button>
</Grid>


            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
              {/* <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#5611B1",
                  padding: "12px 24px",
                  fontSize: "16px",
                }}
              >
                Submit
              </Button> */}
              <Button
  variant="contained"
  color="primary"
  type="submit"
  sx={{
    borderRadius: "8px",
    backgroundColor: "#5611B1",
    padding: "12px 24px",
    fontSize: "16px",
    transition: "all 0.3s ease",  // Smooth transition for effects
    "&:hover": {
      backgroundColor: "#4f0e96",  // Darker shade on hover
      transform: "scale(1.1)",  // Boom effect: scaling the button
      boxShadow: "0px 6px 24px rgba(86, 17, 177, 0.3)", // Shadow on hover
    },
    "&:active": {
      transform: "scale(1)",  // Reset scale when clicked
      boxShadow: "none",  // No shadow on click
    }
  }}
>
  Submit
</Button>

            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={CreateTicketRightSideImage}
            alt="Create Ticket"
            className={classes.rightImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateTicketForm;
