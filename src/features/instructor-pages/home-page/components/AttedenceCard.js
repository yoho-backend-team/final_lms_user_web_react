import { Card, Typography, Box, Grid } from "@mui/material";
import { width } from "@mui/system";
import { AttedenceBg } from "utils/images";

const InstructorAttendenceCard = () => {
  return (
    <Card
      sx={{
        background: `url("${AttedenceBg}")`,
        backgroundSize: "cover",
        backgroundColor: "#B5A1DE",
        width: "369",
        height: "202",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid xs={12}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#442189" }}>Attedence</Typography>
            <Typography>Overall</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InstructorAttendenceCard;
