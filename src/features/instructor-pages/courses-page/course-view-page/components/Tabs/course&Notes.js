import CourseModuleCard from "../Notes&Material/courseModuelCard";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";

const modules = [
  {
    card: "120deg, #0068FF 2.28%, #141BC4 100%",
    color: "#FFFFFF",
    background: "#2E80F9",
  },
  {
    card: "118deg, #CF75FF 1.82%, #670BC3 97.62%",
    color: "#801FBB",
    background: "#D68AFF",
  },
  {
    card: "118deg, #FADB39 1.75%, #F90 100%",
    color: "#E19F10",
    background: "#FFE686",
  },
  {
    card: "118deg, #ED7071 1.82%, #C30BBC 97.62%",
    color: "#BE2563",
    background: "#FFA3BC",
  },
  {
    card: "118deg, #70ED7C 1.82%, #0BADC3 97.62%",
    color: "#26A456",
    background: "#8AEFB2",
  },
  {
    card: "118deg, #9070ED 1.82%, #0BADC3 97.62%",
    color: "#646CDC",
    background: "#A4ACF4",
  },
  // Additional colors
  {
    card: "120deg, #FF6F61 2.28%, #D63A34 100%",
    color: "#FF6F61",
    background: "#F29A8E",
  },
  {
    card: "120deg, #FFD700 2.28%, #FFA500 100%",
    color: "#FFD700",
    background: "#FFEB90",
  },
  {
    card: "120deg, #00FF00 2.28%, #008000 100%",
    color: "#00FF00",
    background: "#98FB98",
  },
  {
    card: "120deg, #00FFFF 2.28%, #008080 100%",
    color: "#00FFFF",
    background: "#B0E0E6",
  },
];


const CourseAndNotesPage = ({ openCourseView, closeCourseView, course }) => {
  const { tabView } = useTabResponsive();

  const getCycledModule = (index) => {
    const modIndex = index % course?.batches?.[0]?.classes?.length;
    return modules[modIndex];
  };
  

  return (
    <Box sx={{ padding: tabView ? "20px" : "60px" }}>
      <Grid container xs={12} gap={tabView ? "60px" : "20px"}>
        {course?.batches?.[0]?.classes?.map((module,index) => (
          <Grid item>
            <CourseModuleCard
              id={index+1}
              style={getCycledModule(index)}
              title={module.class_name}
              notes={module.notes.length}
              videos={module.videos.length}
              progress={""}
              closeCourseView={closeCourseView}
              openCourseView={openCourseView}
              class_details ={ module}
            />
          </Grid>
        ))}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #5611B1",
            px: "66px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#5611B1",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "14px",
              }}
              component={Link}
              to={`/instructor/course/resources/${course?._id}`}
            >
              Add Notes & Videos
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
          sx={{ fontSize: "14px", fontWeight: 600, lineHeight: "24px" }}
        >
          Click the Card to view Preview Details
        </Typography>
      </Box>
    </Box>
  );
};

export default CourseAndNotesPage;
