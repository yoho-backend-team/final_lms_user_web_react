import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Paper,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import StudyMaterialIcon from "assets/icons/course/studyMaterialIcon";
import StudyMaterialList from "./components/materialList";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { fileUpload } from "features/common/upload";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { createStudyMaterial, deleteStudyMaterial, updateStudyMaterial } from "../../services";
import DeleteDialog from "./components/deleteModel";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    alignItems: "center",
    padding: "0.75rem",
    border: "2px dashed #5611B1",
    borderRadius: "14px",
    backgroundColor: "#E7DCF6",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E7DCF6",
    },
  },
  input: {
    display: "none",
  },
  text: {
    marginBottom: "0.25rem",
  },
  browseButton: {
    marginTop: "0.5rem",
  },
  helperText: {
    "& .MuiFormHelperText-root": {
      margin: 0,
    },
  },
  fileSelected: {
    border: "2px solid #00C853",
    backgroundColor: "#E8F5E9",
  },
}));

const UploadStudyMaterials = ({ StudyMaterials, getCourseDetails ,course}) => {
  const classes = useStyles();
  const { showSpinner, hideSpinner } = useSpinner();
  const [editMode, setEditMode] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      heading: "",
      subLine: "",
      file: null,
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      subLine: Yup.string().required("Sub Line is required"),
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: async (values) => {
      if(editMode){
        try {
        showSpinner()  
        const data = { materialId: currentMaterial?.uuid, title: values?.heading, description : values?.subLine, file: values?.file }
        const response = await updateStudyMaterial(data)
        formik.resetForm()
        setEditMode(false)
        setCurrentMaterial(null)
        await getCourseDetails({ course: course })
        toast.success("study material update successfully")
        } catch (error) {
          toast.error(error?.message)
        }finally{
          hideSpinner()
        }
      }else{
        try {
        showSpinner()
        const instructor = getInstructorDetails()
        const data = {
          institute : instructor?.institute_id?.uuid,
          branch : instructor?.branch_id?.uuid,
          course :  course,
          title : values?.heading,
          description : values?.subLine,
          file : values?.file
        } 
        const response = await createStudyMaterial(data)
        formik.resetForm() 
        toast.success(response?.message)
        await getCourseDetails({course:course})
        } catch (error) {
          toast.error(error?.message)
        }finally{
          hideSpinner()
        }
      }
    },
  });


  const handleEdit = (material) => {
    setEditMode(true);
    setCurrentMaterial(material);
    formik.setValues({
      heading: material?.title,
      subLine: material?.description,
      file: material?.file,
    });
  };

  const handleUnselect = () => {
    formik.setFieldValue("file", null);
  };

  const handleDelete = (material) => {
        setMaterialToDelete(material)
        setOpenDeleteDialog(true)
  }

  const confirmDelete = async () => {
     try {
     showSpinner()
     const response = await deleteStudyMaterial({ id: materialToDelete?.uuid })
     toast.success("study material deleted successfully")
     await getCourseDetails({ course: course })
     setMaterialToDelete(null)
     setOpenDeleteDialog(false)
     } catch (error) {
       toast.error(error?.message)
     }finally{
      hideSpinner()
     }
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        px: "20px",
        pt: "20px",
        overflow: "auto",
        pb: "60px",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: "50%" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            color: "#000000",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          Upload Study Materials
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", gap: "20px", flexDirection: "column" }}
        >
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="heading"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#000000",
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
                border:
                  formik.touched.heading && Boolean(formik.errors.heading)
                    ? "none"
                    : "1.4px solid #BDBDBD",
                borderRadius: "32px",
                boxShadow: "none",
                "& .MuiInputBase-input::placeholder": {
                  color: "#B1B1B1",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                },
                "& fieldset": {
                  border: "1.4px solid #BDBDBD",
                  borderRadius: "32px",
                },
              }}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
              FormHelperTextProps={{
                classes: {
                  root: classes.helperText,
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "330px" }}>
            <FormLabel
              htmlFor="subLine"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#000000",
                pb: "6px",
              }}
            >
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
                style: { boxShadow: "none" },
              }}
              sx={{
                border:
                  formik.touched.subLine && Boolean(formik.errors.subLine)
                    ? "none"
                    : "1.4px solid #BDBDBD",
                borderRadius: "32px",
                boxShadow: "none",
                "& .MuiInputBase-input::placeholder": {
                  color: "#B1B1B1",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                },
                "& fieldset": {
                  border: "1.4px solid #BDBDBD",
                  borderRadius: "32px",
                },
                ":focus": {
                  boxShadow: "none",
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "460px" }}>
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#000000",
                pb: "10px",
              }}
            >
              Upload Study Materials File
            </FormLabel>
            <Paper
              className={`${classes.root} ${formik.values.file ? classes.fileSelected : ""}`}
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              component="label"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className={classes.input}
                onChange={async (event) => {
                  showSpinner();
                  try {
                    const file = event?.currentTarget.files[0];
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
                }}
                disabled={!!formik.values.file}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <Box>
                  <StudyMaterialIcon/>
                </Box>
                {formik.values.file ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "black", fontSize: "12px", fontWeight: 500 }}
                      className={classes.text}
                    >
                      {formik.values.file.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUnselect}
                      sx={{
                        color: "#FFFFFF",
                        borderRadius: "25px",
                        backgroundColor: "#E53935",
                      }}
                    >
                      Unselect
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "inline-flex", gap: "10px" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "black", fontSize: "12px", fontWeight: 500 }}
                      className={classes.text}
                    >
                      Drag & Drop file
                    </Typography>
                    <Typography
                      sx={{ color: "#787380", fontSize: "12px", fontWeight: 500 }}
                    >
                      or
                    </Typography>
                    <Box>
                      <Button
                        variant="contained"
                        className={classes.browseButton}
                        sx={{
                          color: "#FFFFFF",
                          borderRadius: "25px",
                          backgroundColor: "#5611B1",
                        }}
                      >
                        Browse
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
            {formik.touched.file && formik.errors.file && (
              <Typography color="error">{formik.errors.file}</Typography>
            )}
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              maxWidth: "460px",
              gap: "20px",
            }}
          >
            <Button
              color="secondary"
              variant="outlined"
              sx={{
                border: "1.55px solid #5611B1",
                color: "#5611B1",
                borderRadius: "29px",
                fontSize: "13px",
                fontWeight: 500,
              }}
              type="button"
              onClick={() => {
                  formik.resetForm()
                  setEditMode(false)
                  setCurrentMaterial(null) }
              }
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#5611B1",
                border: "1.55px solid #5611B1",
                borderRadius: "29px",
              }}
              endIcon={<FileUploadOutlinedIcon sx={{ color: "white" }} />}
            >
              { editMode ? "Update" : "Upload"}
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      </Box>
      <StudyMaterialList materials={StudyMaterials} handleEdit={handleEdit} handleDelete={handleDelete} />
      <DeleteDialog
       openDeleteDialog={openDeleteDialog}
       setOpenDeleteDialog={setOpenDeleteDialog}
       confirmDelete={confirmDelete}
       title={"Are you sure want to delete?"}
      />
    </Box>
  );
};

export default UploadStudyMaterials;
