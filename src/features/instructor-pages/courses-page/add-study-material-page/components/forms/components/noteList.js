import { Box, Typography, Button, IconButton } from "@mui/material"
import CourseEditIcon from "assets/icons/course/EditIcon";
import CourseDeleteIcon from "assets/icons/course/DeletIcon";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { makeStyles } from "@mui/styles";
import { useSpinner } from "context/SpinnerProvider";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "140px",
      alignItems: "center",
      padding: theme.spacing(3),
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
      marginBottom: theme.spacing(1),
    },
    browseButton: {
      marginTop: theme.spacing(2),
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


const NoteList =  ({Notes,handleEdit,handleDelete,handleDownload}) => {
    const classes = useStyles()
    const { showSpinner,hideSpinner} = useSpinner()
    return(
      <Box sx={{ flexGrow: 1, px: "20px" }}>
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{ color: "#000000", fontSize: "14px", fontWeight: 600, lineHeight: "24px" }}>
              Uploaded Notes
            </Typography>
          </Box>
          <Box>
            <Button variant="text" sx={{ display: "none", color: "#FF0000", fontSize: "14px", fontWeight: 600, lineHeight: "24px", ":hover": { backgroundColor: "none" } }} startIcon={<RemoveCircleOutlineIcon sx={{ color: "#FF0000" }} />}>
              Remove All
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", py: "20px" }}>
          {Notes?.map((note) => (
            <Box key={note.id} className={classes.note}>
              <Box className={classes.noteContent}>
                <Box>
                  <StudyMaterialIcon />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
                  <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 700 }}>{note.title}</Typography>
                  <Typography sx={{ color: "#000000", fontSize: "12px", fontWeight: 300 }}>{note.description}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={() => handleDownload(note,showSpinner,hideSpinner)}>
                  <SaveAltOutlinedIcon sx={{ color: "#8E8383", height: "24px", width: "24px" }} />
                </Box>
              </Box>
              <Box className={classes.actions}>
                  <IconButton sx={{ width: "40px", height: "40px", borderRadius: "22px",backgroundColor: "#5611B1",":hover":{ backgroundColor: "#5611B1"}}} onClick={() => handleEdit(note)}>
                    <CourseEditIcon  color= "#5611B1" />
                  </IconButton>
                  <IconButton sx={{ width: "40px", height: "40px", borderRadius: "22px", backgroundColor: "#BF0000",":hover":{backgroundColor:"#BF0000"}}} onClick={() => handleDelete(note)}>
                    <CourseDeleteIcon sx={{ color: "#FF0000" }} />
                  </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
}

export default NoteList