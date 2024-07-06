import { Skeleton, Box, Grid } from "@mui/material";

const ClassLoader = () => {
  return (
    <Grid container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "24px",
          px: "40px",
          width: "100%",
          gap: "20px",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={"72px"}
          width={"100%"}
          sx={{ borderRadius: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          height={"72px"}
          width={"100%"}
          sx={{ borderRadius: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          height={"72px"}
          width={"100%"}
          sx={{ borderRadius: "10px" }}
        />
      </Box>
    </Grid>
  );
};

export default ClassLoader;
