import { Grid } from "@mui/material";
import CourseDetails from "../courseDetails";
import CourseChapters from "../courseChapter";

const StudentAbout = ({ Course }) => {
  return (
    <Grid xs={12} container sx={{ padding: "40px" }}>
      <Grid item xs={6}>
        <CourseDetails Course={Course} />
      </Grid>
      <Grid xs={6}>
        <CourseChapters Chapters={Course} />
      </Grid>
    </Grid>
  );
};

export default StudentAbout;
