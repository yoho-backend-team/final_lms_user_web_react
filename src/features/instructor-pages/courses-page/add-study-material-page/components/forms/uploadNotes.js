import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Divider from "@mui/material/Divider";
import NoteIcon from "assets/icons/noteIcon";
import toast from "react-hot-toast";
import { getImageUrl } from "utils/common/imageUtlils";
import { fileUpload, getFile } from "features/common/upload";
import { useSpinner } from "context/SpinnerProvider";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CourseEditIcon from "assets/icons/course/EditIcon";
import CourseDeleteIcon from "assets/icons/course/DeletIcon";
import { createNotes, deleteCourseNotes, updateCourseNotes } from "../../services";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import DeleteModel from "./components/deleteModel";
import NoteList from "./components/noteList";
import { handleDownload } from "utils/downloadHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    alignItems: "center",
    padding: 3,
    borderRadius: "14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E7DCF6",
    },
  },
  input: {
    display: "none",
  },
  text: {
    marginBottom: 1,
  },
  browseButton: {
    marginTop: 2,
  },
  helperText: {
    "& .MuiFormHelperText-root": {
      border: "none",
    },
  },
  note: {
    display: 'flex',
    justifyContent: 'flex-start',
    width : "60%",
    flexDirection: "column",
    position: 'relative',
    "&:hover $actions": {
      display: 'flex',
      gap: "20px"
    },
  },
  noteContent: {
    display: "flex",
    padding: "14px 20px 14px 5px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #CCC",
    borderRadius: "8px",
    gap: "23px",
    minWidth: "320px",
    "&:hover":{
      boxShadow : "0 0 4px rgba(0, 0, 0, 0.5)"
    }
  },
  actions: {
    display: 'none',
    paddingTop : "20px",
    paddingBottom : "20px"
    // position: 'absolute',
    // top: '10px',
    // right: '10px',
    // gap: '10px',
  },
}));

const UploadNotes = ({ Notes , getCourseDetails,course}) => {
  const classes = useStyles();
  const { showSpinner, hideSpinner } = useSpinner();
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      heading: "",
      subLine: "",
      file: null,
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      subLine: Yup.string().required("Description is required"),
      file: Yup.mixed().required("Note is required"),
    }),
    onSubmit: async (values) => {
      if (editMode) {
        try {
        showSpinner()
        const data = { NoteId: currentNote?.uuid , title : values?.heading, description: values?.subLine, file : values?.file}
        const response = await updateCourseNotes(data)
        formik.resetForm();
        setEditMode(false);
        setCurrentNote(null);
        await getCourseDetails({course:course})
        toast.success("note update successfully") 
        } catch (error) {
          toast.error(error?.message)
        }finally{
          hideSpinner()
        }
      } else {
        try {
          showSpinner()
          const instructor = getInstructorDetails()
          const data = {
            institute : instructor?.institute_id?.uuid , 
            branch : instructor?.branch_id?.uuid ,
            course : instructor?.userDetail?.course?.[0],
            title : values?.heading,
            description : values?.subLine,
            file : values?.file
          }
          const response = await createNotes(data)
          formik.resetForm();
          setEditMode(false);
          setCurrentNote(null);
          await getCourseDetails({course:course})
          toast.success(response?.message)
        } catch (error) {
          toast.error(error?.message)
        }finally{
          hideSpinner()
        }
      }
    },
  });

  const handleEdit = (note) => {
    setEditMode(true);
    setCurrentNote(note);
    formik.setValues({
      heading: note.title,
      subLine: note.description,
      file: note.file,
    });
  };

  const handleDelete = (note) => {
    setNoteToDelete(note);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
    showSpinner()
    const response = await deleteCourseNotes({id:noteToDelete?.uuid})
    toast.success("note deleted successfully")
    await getCourseDetails({course:course})
    setOpenDeleteDialog(false);
    setNoteToDelete(null);  
    } catch (error) {
     toast.error(error?.message) 
    }finally{
      hideSpinner()
    }
  };


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
          {editMode ? "Edit Note" : "Upload Notes"}
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
              InputProps={{
                style: { boxShadow: "none" },
              }}
              sx={{
                border:
                  formik.touched.heading && Boolean(formik.errors.heading)
                    ? "none"
                    : "1.4px solid #BDBDBD",
                borderRadius: "32px",
                boxShadow: "none",
                "& .MuiInputBase-input::placeholder": {
                  // color: "black",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                   color : "black"
                },
                "& fieldset": {
                  border: "1.4px solid #BDBDBD",
                  borderRadius: "32px"
                },
                "& .MuiFormHelperText-root": {
                  border: "none",
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
              Description
            </FormLabel>
            <TextField
              fullWidth
              id="subLine"
              name="subLine"
              placeholder="Enter description"
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
                  // color: "#B1B1B1",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                },
                "& fieldset": {
                  border: "1.4px solid #BDBDBD",
                  borderRadius: "32px"
                },
                ":focus": {
                  boxShadow: "none",
                },
                "& .MuiFormHelperText-root": {
                  border: "none",
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
              Upload Document
            </FormLabel>
            <Paper
              className={classes.root}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                border: `2px dashed ${ formik.values.file ? "#11B181" : "#5611B1"}`,
                backgroundColor: ` ${formik?.values?.file ? "#DCF6E8" : "#E7DCF6" }`,
              }}
              variant="outlined"
              component="label"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className={classes.input}
                disabled={ formik.values.file ? true : false}
                onChange={async(event) => {
                  try {
                    showSpinner()
                    const file = event.currentTarget.files[0]
                    const form_data = new FormData()
                    form_data.append("file",file)
                    const response = await fileUpload(form_data)
                    formik.setFieldValue("file", response?.file); 
                    toast.success("file uploaded successfully")
                  } catch (error) {
                    toast.error(error?.message)
                  }finally{
                    hideSpinner()
                  }
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <Box>
                  { formik.values.file ? <PictureAsPdfOutlinedIcon sx={{ color: "#11B181"}} /> :  <NoteIcon fill={"#5611B1"} />}
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  {
                  formik?.values?.file ? 
                  <Typography>
                     {formik.values?.file?.split("/")[2]}
                  </Typography>
                  :
                  <>
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
                  </>
}
                </Box>
                {!formik?.values?.file &&<Button
                  variant="contained"
                  component="span"
                  className={classes.browseButton}
                  sx={{
                    color: "#FFFFFF",
                    borderRadius: "25px",
                    backgroundColor: "#5611B1",
                  }}
                >
                  Browse
                </Button>
                }
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
                formik.resetForm();
                setEditMode(false);
                setCurrentNote(null);
              }}
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
              {editMode ? "Update" : "Upload"}
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      </Box>
      <Box sx={{ flexGrow: 1, height: "80vh", overflow: "auto" }}>
        {Notes ? (
          <NoteList 
          Notes={Notes?Notes : []}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          />
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>No Uploads</Typography>
          </Box>
        )}
      </Box>
      <DeleteModel
      openDeleteDialog={openDeleteDialog}
      setOpenDeleteDialog={setOpenDeleteDialog}
      confirmDelete={confirmDelete}
      title={"Are you sure you want to delete this note ? "}
      />
    </Box>
  );
};

export default UploadNotes;
