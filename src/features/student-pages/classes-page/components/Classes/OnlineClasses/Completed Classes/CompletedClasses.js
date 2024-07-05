import React, { useState, useEffect } from "react";
import { Button, Paper, styled, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

// Mock API call
const fetchCompletedClasses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Basics of User Experience",
          subtitle: "UX Design",
          date: "14 Feb 2024",
          endTime: "10:30AM",
          duration: "1hr 5 min",
        },
        {
          id: 2,
          title: "Advanced User Experience",
          subtitle: "UX Design",
          date: "15 Mar 2024",
          endTime: "12:00PM",
          duration: "1hr 30 min",
        },
        {
          id: 3,
          title: "Intermediate User Experience",
          subtitle: "UX Design",
          date: "16 Apr 2024",
          endTime: "11:00AM",
          duration: "1hr 30 min",
        },
      ]);
    }, 1000);
  });
};

function StudentOnlineCompletedClasses() {
  const [completedClasses, setCompletedClasses] = useState([]);
  const matches = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  useEffect(() => {
    fetchCompletedClasses().then(setCompletedClasses);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      {completedClasses.map((item) => (
        <Grid item xs={12} key={item.id} sx={{ marginTop: 2 }}>
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
                <Typography variant="h6" sx={{
                  color: 'var(--Gray-Black, var(--Colour-Neutral-1, #000))',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '22px',
                  minWidth:'200px'
                }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" sx={{
                  color: 'var(--Gray-Black, var(--Colour-Neutral-1, #000))',
                  fontFamily: 'Poppins',
                  fontSize: '10px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '16px',
                  minWidth:'270px'
                }}>
                  {item.subtitle}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography variant="h5" sx={{
                  color: 'var(--Gray-600, #6C757D)',
                  fontFamily: 'Poppins',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '22px'
                }}>
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> {item.date}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2, display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: 'var(--Gray-600, #6C757D)',
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '22px'
                  }}
                >
                  <AccessTimeIcon /> Ends at: {item.endTime}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#FD8F0D',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '22px',
                    borderradius: '26px',
                    background: 'rgba(253, 176, 61, 0.22)'
                  }}
                >
                  {item.duration}
                </Typography>
              </Box>
              <Box>
                <Button variant="outlined" sx={{
                  color: '#0D6EFD',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '22px',
                  borderradius: '24px',
                  background: '#FFF',
                  display: 'flex',
                  width: '113px',
                  height: '40px',
                  padding: '10px',
                  justifycontent: 'center',
                  alignitems: 'center',
                  gap: '10px',
                  flexshrink: 0
                }}>
                  <Link to={`/student/OnlineCompleteClass/${item.id}`} style={{ textDecoration: "none" }}>View Class</Link>
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
