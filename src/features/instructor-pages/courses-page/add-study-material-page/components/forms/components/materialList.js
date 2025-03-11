import { Box, Typography, Button, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeStyles } from "@mui/styles";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined"
import CourseEditIcon from "assets/icons/course/EditIcon";
import CourseDeleteIcon from "assets/icons/course/DeletIcon";
import { useSpinner } from "context/SpinnerProvider";
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
    }
  }));

const StudyMaterialList = ({materials,handleEdit,handleDelete}) => {
    const { showSpinner,hideSpinner} = useSpinner()
    const classes = useStyles()
    return(
        <>
        {
        materials ?
        <Box>
            <Box>
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
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", py: "20px" }}>
                {
                    materials?.map((material)=>(
                        <Box key={material.id} className={classes.note}>
                        <Box className={classes.noteContent}>
                          <Box>
                            <StudyMaterialIcon />
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
                            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 700 }}>{material.title}</Typography>
                            <Typography sx={{ color: "#000000", fontSize: "12px", fontWeight: 300 }}>{material.description}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={() => handleDownload(material,showSpinner,hideSpinner)}>
                            <SaveAltOutlinedIcon sx={{ color: "#8E8383", height: "24px", width: "24px" }} />
                          </Box>
                        </Box>
                        <Box
                         className={classes.actions}>
                            <IconButton sx={{ width: "40px", height: "40px", borderRadius: "22px",backgroundColor: "#5611B1",":hover":{ backgroundColor: "#5611B1"}}} onClick={() => handleEdit(material) }>
                              <CourseEditIcon  color= "#5611B1" />
                            </IconButton>
                            <IconButton sx={{ width: "40px", height: "40px", borderRadius: "22px", backgroundColor: "#BF0000",":hover":{backgroundColor:"#BF0000"}}} onClick={() => handleDelete(material)}>
                              <CourseDeleteIcon sx={{ color: "#FF0000" }} />
                            </IconButton>
                        </Box>
                      </Box>
                    ))
                }
            </Box>
        </Box>
        :
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
       }
       </>
    )
}

export default StudyMaterialList