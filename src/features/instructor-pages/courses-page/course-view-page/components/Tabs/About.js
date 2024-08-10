import { Grid } from "@mui/material";
import CourseDetails from "../About/courseDetails";
import CourseChapters from "../About/courseChapter";

const About = ({ Course }) => {
  return (
    <Grid xs={12} container sx={{ padding: "40px" }}>
      <Grid item xs={6}>
        <CourseDetails Course={Course} />
      </Grid>
      <Grid item xs={6}>
        <CourseChapters Chapters={Course?.coursemodules} />
      </Grid>
    </Grid>
  );
};

export default About;
