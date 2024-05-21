import React from "react";
import { Button, Paper, styled, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

function StudentOnlineCompletedClasses() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  const matches = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  return (
    <>
      {[1, 2].map((item) => (
        <Grid item xs={12} key={item} sx={{ marginTop: 2 }}>
          <Item>
            <Box
              sx={{
                display: "flex",
                flexDirection: matches ? "row" : "column",
                justifyContent: matches ? "space-between" : "flex-start",
                alignItems: matches ? "center" : "flex-start",
                padding: "10px",
              }}
            >
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography variant="h3">Basic of User Experience</Typography>
                <Typography variant="subtitle1">UI/UX Design</Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography variant="h5">
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> 14 Feb
                  2024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2, display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <AccessTimeIcon /> Ends at: 10:30AM
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    borderRadius: 5,
                    p: 1,
                  }}
                >
                  1hr 5 min
                </Typography>
              </Box>
              <Box>
                <Button
                  href="/student/OnlineCompleteClass/${item}"
                  variant="conatined"
                  sx={{ borderRadius: 5, boxShadow: 1 }}
                >
                  <Typography>View Class</Typography>
                </Button>
              </Box>
            </Box>
          </Item>
        </Grid>
      ))}
    </>
  );
}

export default StudentOnlineCompletedClasses;
