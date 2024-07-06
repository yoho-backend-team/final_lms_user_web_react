import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  subLine: Yup.string().required("Sub Line is required"),
  dateTime: Yup.date().required("Class Date & Time is required"),
  file: Yup.mixed().required("File is required"),
});

const UploadForm = ({ formType }) => {
  const formik = useFormik({
    initialValues: {
      heading: "",
      subLine: "",
      dateTime: "",
      file: null,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // handle form submission
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        padding: "60px 40px 32px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        {formType}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            id="heading"
            name="heading"
            label="Enter heading"
            value={formik.values.heading}
            onChange={formik.handleChange}
            error={formik.touched.heading && Boolean(formik.errors.heading)}
            helperText={formik.touched.heading && formik.errors.heading}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            id="subLine"
            name="subLine"
            label="Enter Name"
            value={formik.values.subLine}
            onChange={formik.handleChange}
            error={formik.touched.subLine && Boolean(formik.errors.subLine)}
            helperText={formik.touched.subLine && formik.errors.subLine}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            id="dateTime"
            name="dateTime"
            label="Class Date & Time"
            type="datetime-local"
            value={formik.values.dateTime}
            onChange={formik.handleChange}
            error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
            helperText={formik.touched.dateTime && formik.errors.dateTime}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              id="file"
              name="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </Button>
          {formik.touched.file && formik.errors.file && (
            <Typography color="error">{formik.errors.file}</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="secondary" variant="outlined" type="button">
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Upload
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UploadForm;
