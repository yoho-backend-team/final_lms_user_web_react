import { Grid, Box } from "@mui/material";
import { CourseBg, CourseStudent } from "utils/images";

const CourseStudentLayout = ({ children }) => {
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
          background: `url(${CourseStudent})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          border: "1px solid #C3C3C3",
          borderRadius: "18px",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default CourseStudentLayout;
