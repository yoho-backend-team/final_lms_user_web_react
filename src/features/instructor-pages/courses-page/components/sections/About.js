import { Grid } from "@mui/material"
import CourseDetails from "../courseDetails"
import CourseChapters from "../courseChapter"


const About = () => {
    return(
        <Grid xs={12} container sx={{ padding: "40px"}} >
            <Grid item xs={6}>
              <CourseDetails />
            </Grid>
            <Grid xs={6} >
              <CourseChapters />
            </Grid>
        </Grid>
    )
}

export default About