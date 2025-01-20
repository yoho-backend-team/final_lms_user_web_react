import { Box, Grid } from "@mui/material";


const CourseDetailStudentPaymentCard = () => {
  return (
    <Box sx={{ p: "40px" }}>
      <Grid container xs={12}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <CourseStudentDetails />
          </Box>
          <Box></Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetailStudentPaymentCard;
