import { Box, Grid } from "@mui/material";
import CourseDetails from "./CourseDetails";

const CourseDetailPaymentCard = () => {
  return (
    <Box sx={{ p: "40px" }}>
      <Grid container xs={12}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <CourseDetails />
          </Box>
          <Box></Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetailPaymentCard;
