import React, { useState, useEffect } from "react";
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CreateTicketRightSideImage } from "utils/images";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelDialog from "components/modal/cancelModel";
import { useTabResponsive } from "utils/tabResponsive";
import { useFormik } from "formik";
import * as yup from "yup";
import { StudentCreateTickets } from "../services";
import { getStudentDetails } from "store/atoms/authorized-atom";
import toast from "react-hot-toast";
import { fileUpload } from "features/common/upload";
import { useSpinner } from "context/SpinnerProvider";

const validationSchema = yup.object({
  problem: yup.string("Select problem").required("Problem is required"),
  description: yup
    .string("Enter description")
    .required("Description is required"),
  status: yup.string("opened"),
  file_upload: yup.string("Attachment"),
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
    gap: "38px",
  },
  label: {
    color: "#606060",
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  },
  rootright: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: "20px",
    height: "100%",
  },
  rightImage: {
    display: "flex",
    justifyContent: "flex-end",
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

const StudentCreateTicketForm = ({ handleClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [attachment, setAttachment] = useState(null);
  const [open, setOpen] = useState(false);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();

  const problems = [
    { value: "attendance", label: "Attendance Issue" },
    { value: "grade", label: "Grade Issue" },
    { value: "material", label: "Course Material" },
    { value: "support", label: "Technical Support" },
    { value: "feedback", label: "Feedback" },
    { value: "submission", label: "Assignment Submission" },
  ];

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      problem: "",
      description: "",
      file_upload: "",
      status: "",
    },
    onSubmit: async (values) => {
      try {
        const student = getStudentDetails();
        const data = {
          institute: student?.institute_id?._id,
          branch: student?.branch_id?._id,
          query: values?.problem,
          description: values?.description,
          status: "opened",
          user: student?._id,
          file_upload: attachment || null,
        };
        const response = await StudentCreateTickets(data);
        console.log(response, "response");
        handleClose();
        toast.success("ticket created successfully");
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  const handleAttachmentChange = async (event) => {
    try {
      showSpinner();
      const file = event.target.files[0];
      const file_data = new FormData();
      file_data.append("file", file);
      const response = await fileUpload(file_data);
      setAttachment(response?.file);
      toast.success("Attachment added successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleCloseCancel = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    console.log("Cancel clicked");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFF",
          borderRadius: "18px",
          border: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
          padding: "40px",
        }}
      >
        <Box sx={{ display: "flex", gap: "30px", pb: "40px" }}>
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

        <Grid container xs={12}>
          <Grid item xs={8}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              className={classes.form}
              onSubmit={formik.handleSubmit}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <FormControl
                  variant="outlined"
                  error={
                    formik.touched.problem && Boolean(formik.errors.problem)
                  }
                  fullWidth
                >
                  <InputLabel
                    className={classes.label}
                    id="demo-simple-select-label"
                  >
                    Select your Problem
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={formik.values.problem}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="problem"
                    label="Select your Problem"
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

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <FormControl
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  fullWidth
                >
                  <InputLabel className={classes.label} shrink>
                    Description
                  </InputLabel>
                  <TextField
                    multiline
                    rows={7}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    variant="outlined"
                    label="Description" // This should be provided here as well
                  />
                </FormControl>
              </Box>

              <Grid
                item
                xs={6}
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <InputLabel className={classes.label}>Attachment</InputLabel>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon sx={{ color: "#5611B1" }} />}
                  sx={{ backgroundColor: "#DFC7FF", color: "#5611B1" }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleAttachmentChange}
                  />
                </Button>
                {attachment && (
                  <Typography sx={{ mt: 1 }} color="textSecondary">
                    File uploaded: {attachment.split("/")[2]}
                  </Typography>
                )}
                {!attachment && (
                  <Typography sx={{ mt: 1 }} color="textSecondary">
                    No file uploaded
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: "20px",
                    gap: "10px",
                  }}
                >
                  <InfoOutlinedIcon sx={{ color: "#5611B1" }} />
                  <Typography
                    sx={{
                      color: "#5611B1",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "21px",
                    }}
                  >
                    How it Works
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: tabView ? "column" : "column",
                justifyContent: "space-between",
                paddingRight: "20px",
                height: "100%",
              }}
            >
              <Box className={classes.rightImage}>
                <img src={CreateTicketRightSideImage} alt="create ticket" />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  className={classes.cancelButton}
                  sx={theme.custom.buttonStyles.button1}
                  onClick={handleOpen}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={formik.handleSubmit}
                  variant="contained"
                  className={classes.conformButton}
                  sx={theme.custom.buttonStyles.button1}
                >
                  Confirm Ticket
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

export default StudentCreateTicketForm;
