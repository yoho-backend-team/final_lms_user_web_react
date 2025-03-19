import { Grid, Box, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import CourseStudentModuleCard from "../CourseNotesComponents/courseModuleCard";


              
const modules = [
  {
    id: 1,
 
    style: {
      card: "120deg, #0068FF 2.28%, #141BC4 100%",
      color: "#FFFFFF",
      background: "#2E80F9",
    },
  },
  {
    id: 2,
    style: {
      card: "118deg, #CF75FF 1.82%, #670BC3 97.62%",
      color: "#801FBB",
      background: "#D68AFF",
    },
  },
  {
    id: 3,

    style: {
      card: "118deg, #FADB39 1.75%, #F90 100%",
      color: "#E19F10",
      background: "#FFE686",
    },
  },
  {
    id: 4,
 
    style: {
      card: "118deg, #ED7071 1.82%, #C30BBC 97.62%",
      color: "#BE2563",
      background: "#FFA3BC",
    },
  },
  {
    id: 5,

    style: {
      card: "118deg, #70ED7C 1.82%, #0BADC3 97.62%",
      color: "#26A456",
      background: "#8AEFB2",
    },
  },
  {
    id: 6,


    style: {
      card: "118deg, #9070ED 1.82%, #0BADC3 97.62%",
      color: "#646CDC",
      background: "#A4ACF4",
    },
  },
];
 const CourseAndNotesStudentPage = ({ Course, openCourseView, closeCourseView, selectedClass }) => {
  const { tabView } = useTabResponsive();
   
    const classes = Course?.batches[0]?.classes || [];
                
  const getRandomStyle = (index) => {
    const randomIndex = index % Course?.batches?.[0]?.classes?.length;
    return modules[randomIndex].style;
  };             
                return (
                  <Box sx={{ padding: tabView ? "20px" : "60px", }}>
                    <Grid container xs={12} gap={tabView ? "60px" : "20px"}>
                    {classes?.map((module,index) => (
                        <Grid item key={module.id} xs={2.5}  sx={{display:"flex",flexDirection:"row",justifyContent: "center", alignItems: "center",cursor: "pointer"}} tabIndex={1}>
                          <CourseStudentModuleCard
                            id={index+1}
                            style={getRandomStyle(index)}
                           title={module.class_name}
                            notes={module.notes}
                            videos={module.videos}
                            progress={module.progress}
                            closeCourseView={closeCourseView}
                            openCourseView={openCourseView}
                            module={module}
                            class_details ={module}
                        />
                        </Grid>
                      ))}
                      <Grid
                     >
                      </Grid>
                    </Grid>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        width: "100%",
                        py: "20px",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >    
                    </Box> */}
                    <Box
        sx={{
          display: "flex",
          justifyItems: "center",
          width: "100%",
          py: "20px",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", 
            fontWeight: 600,
            lineHeight: "24px",
            color: "blue",
          }}
        >
          Click the Card to view Preview Details
        </Typography>
      </Box>
      </Box>
                );
                };
 export default CourseAndNotesStudentPage;
              