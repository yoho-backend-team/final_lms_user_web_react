import React, { useRef, useState } from "react";
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
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StudyMaterialUpload = ({
  classDetails,
  handleFileChange,
  updateClass,
}) => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed().required("File is required"),
  });

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        color="primary"
        startIcon={<FileUploadOutlinedIcon sx={{ color: "#5611B1" }} />}
        sx={{
          border: "2px solid #5611B1",
          borderRadius: "24px",
          color: "#5611B1",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          mt: 1,
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#3e088e",
          },
        }}
      >
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth 
       PaperProps={{
        sx: {
          padding: "20px",
          borderRadius: "16px",
          backgroundColor: "#F5F5F5", 
        },
      }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "8px",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#5611B1" }}>Upload Study Material</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ title: "", description: "", file: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const data = {
                study_materials: {
                  file: values?.file,
                  title: values?.title,
                  description: values?.description,
                },
              };
              updateClass(data);
              handleClose();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box sx={{ mb: 2 }}>
                  <Field name="title" as={TextField} label="Title" fullWidth />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Field
                    name="Title"
                    as={TextField}
                    label="Title"
                    fullWidth
                    multiline
                    rows={4}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Box>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="application/pdf"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => fileInputRef.current.click()}
                  sx={{ mb: 2 , border: "2px dashed #5611B1", 
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#5611B1",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#F0E6FF", 
                    },
                    marginBottom: "16px",}}
                >
                  Select File
                </Button>
                <ErrorMessage
                  name="file"
                  component="div"
                  style={{ color: "red" }}
                />
                <DialogActions>
                  <Button onClick={handleClose} sx={{ fontSize: "12px" }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
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

export default StudyMaterialUpload;
