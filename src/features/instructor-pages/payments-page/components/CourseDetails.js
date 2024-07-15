import { Box, Typography, Grid } from "@mui/material";

const CourseDetails = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          borderBottom: "2px solid #B9B9B9",
          fontSize: "20px",
          fontWeight: "700",
          color: "#495057",
          lineHeight: "24px",
          pb: "20px",
        }}
      >
        Course Details
      </Typography>
      <Box sx={{ pt: "20px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
        >
          <Grid container xs={12}>
            <Grid
              item
              xs={8}
              sx={{ border: "1px solid #CFCFCF", borderRadius: "20px" }}
            >
              <Grid item xs={3}>
                <Box sx={{ backgroundColor: "red" }}>
                  <Typography sx={{ color: "white" }}>
                    Basic Online Java Course
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={5}>
                <Box sx={{ display: "flex" }}>
                  <Typography></Typography>
                  <Typography></Typography>
                  <Typography></Typography>
                  <Box>
                    <Typography></Typography>
                    <Typography></Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  alignItems: "end",
                  display: "flex",
                  justifyContent: "flex-end",
                  justifyItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    color: "#495057",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "24px",
                  }}
                >
                  Course Durations
                </Typography>
                <Typography
                  sx={{
                    color: "#495057",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                  }}
                >
                  6th Months
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails;
