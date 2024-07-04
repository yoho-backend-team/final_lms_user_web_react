import React, { useState, useEffect } from "react";
import { Button, Paper, styled, Box, Typography, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { getAllClasses } from "../../redux/thunks";
import { formatTime,formatDate } from "../../../../../../../utils/formatDate"
import { useDispatch,useSelector } from "react-redux";
import { selectClasses } from "../../redux/selectors";


function StudentOnlineLiveClasses({classType}) {
  const [liveClasses, setLiveClasses] = useState([]);
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch()
  const classes = useSelector(selectClasses)
  console.log(classes)
  
  
  useEffect( () => {
    const data = { userType:classType }
     dispatch(getAllClasses(data))
  }, [dispatch]);



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      {classes.map((item) => (
        <Grid item xs={12} key={item?.id} sx={{ marginTop: 2 }}>
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
                <Typography
                  variant="h6"
                  sx={{
                    color: 'var(--Gray-Black, var(--Colour-Neutral-1, #000))',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '22px',
                  }}
                >
                  {item?.course?.course_name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'var(--Gray-Black, var(--Colour-Neutral-1, #000))',
                    fontFamily: 'Poppins',
                    fontSize: '10px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '16px',
                    minWidth:'190px'
                  }}
                >
                  {item?.class_name}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--Gray-600, #6C757D)',
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '22px',
                  }}
                >
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> {formatDate(item?.start_date)}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--Gray-600, #6C757D)',
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '22px',
                  }}
                >
                  <AccessTimeIcon style={{ marginBottom: "-5px" }} /> Start at: {formatTime(item?.start_time)}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#0D6EFD',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '22px',
                    borderRadius: '26px',
                    background: 'rgba(61, 139, 253, 0.22)',
                  }}
                >
                  {item?.course?.duration}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#0D6EFD',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '22px',
                    borderRadius: '24px',
                    background: '#FFF',
                    display: 'flex',
                    width: '113px',
                    height: '40px',
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    flexShrink: 0,
                  }}
                >
                  <Link to={`/student/OnlineLiveClass/${item.id}`} style={{ textDecoration: "none" }}>View Class</Link>
                </Button>
              </Box>
            </Box>
          </Item>
        </Grid>
      ))}
    </>
  );
}

export default StudentOnlineLiveClasses;
