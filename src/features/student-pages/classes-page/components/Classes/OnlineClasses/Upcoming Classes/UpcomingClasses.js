import React from "react";
import {Button, Paper, styled, Box, Typography, Grid} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

function StudentOnlineUpcomingClasses(){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
      }));

      const matches = useMediaQuery("(min-width:600px)");

    return(
        <>
  {[1, 2].map((item) => (
        <Grid item xs={12} key={item} sx={{ marginTop: 2}}>
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
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> 14 Feb 2024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography variant="h5">
                  <AccessTimeIcon style={{ marginBottom: "-5px" }} /> Ends at: 10:30AM
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{ backgroundColor: "lightblue", color: "darkblue", borderRadius: "2px" }}
                >
                  1hr 5 min
                </Typography>
              </Box>
              <Box>
                <Button variant="outlined" sx={{ borderRadius: "50px" }}>
                <Link to={`student/OnlineUpcomingClass/${item}`} style={{textDecoration:"none"}}>View Class</Link>
                </Button>
              </Box>
            </Box>
          </Item>
        </Grid>
      ))}
        </>
    )
}
export default StudentOnlineUpcomingClasses;

