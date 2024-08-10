import { Grid, Box } from "@mui/material";
import { CourseBg } from "utils/images";

const CourseLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        padding: "58px 40px 40px 40px",
      }}
    >
      <Box
        sx={{
          background: `url(${CourseBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          border: "1px solid #C3C3C3",
          borderRadius: "18px",
          overflow: "auto",
          boxShadow : "0px 0px 64px 0px rgba(0, 0, 0, 0.10)"
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default CourseLayout;
