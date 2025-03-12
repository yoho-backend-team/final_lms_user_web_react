import React from "react";
import { Box, Card, Typography, Button, Grid } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link } from "react-router-dom";
import {
  formatDate,
  formatTime,
  getTimeDifference,
} from "../../../../../utils/formatDate";
import { Viewimage, Viewimage1, Viewimage2 } from "utils/images";

const groupImages = {
  upcoming: Viewimage1,
  completed: Viewimage,
  history: Viewimage,
  live: Viewimage2,
};

export const ClassCardHeader = () => (
    <Grid
      container
      sx={{
        mb: 1,
        mt:2,
       
        p: 2,
        backgroundColor: "blue",
        borderRadius: "22px",
        position: "sticky", // Keep header visible while scrolling
        top: 10, // Add gap between the top of the viewport and the header
        zIndex: 1,
      }}
    >
      <Grid item xs={3}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            ml: 25,
          }}
        >
          Title
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            ml: 19,
          }}
        >
           Start Date
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            ml: 1,
          }}
        >
          Start Time
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            ml: 22,
          }}
        >
          Duration
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            textAlign: "right",
            mr: 16,
          }}
        >
          Action
        </Typography>
      </Grid>
    </Grid>
  );
  
const ClassCard = ({ cls, style, type, group }) => {
  const backgroundImage = groupImages[group] || Viewimage;

  return (
    <>  
    <Box
      sx={{
        overflowY: "auto",
        scrollBehavior: "smooth",
        paddingBottom: "3px",
      }}
    >
      <Card
        sx={{
          mt: 1,  // Reduced from 1
          mx: 4,
          mb: 0.2,  // Keeping consistent spacing
          // py: 0.1,
          ps: 0.5,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            cursor: "pointer",
            height: "55px"
          }}
        >
          {/* Class Name and Course */}
          <Grid item xs={3} sx={{ p: 1 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {cls?.class_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "10px",
                  lineHeight: "16px",
                }}
              >
                {cls?.course?.course_name}
              </Typography>
            </Box>
          </Grid>

          {/* Date */}
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarTodayOutlinedIcon color={style.calendarColor} />
              <Typography
                variant="body2"
                sx={{
                  color: "#6C757D",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  lineHeight: "22px",
                  fontWeight: 500,
                }}
              >
                {formatDate(cls.start_date)}
              </Typography>
            </Box>
          </Grid>

          {/* Time */}
          <Grid item xs={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccessTimeOutlinedIcon color={style.timerColor} />
              <Typography
                variant="body2"
                sx={{
                  color: "grey",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  lineHeight: "22px",
                  fontWeight: 500,
                }}
              >
                {formatTime(cls.start_time)}
              </Typography>
            </Box>
          </Grid>

          {/* Duration */}
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "gray",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: style.durationColor,
                borderRadius: "26px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  color: style?.durationTextColor,
                  px: "16px",
                  py: "8px",
                  fontWeight: 600,
                  lineHeight: "22px",
                  fontSize: "14px",
                }}
              >
                {getTimeDifference(cls.start_time, cls.end_time)}
              </Typography>
            </Box>
          </Grid>

          {/* View Class Button */}
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
          >
           <Button
  component={Link}
  to={`/student/class/${cls.uuid}?type=${type}&group=${group}`}
  state={{ id: cls.uuid }}
  variant="contained"
  sx={{
    backgroundColor: group === "history" ? "white" : "blue",
    color: group === "history" ? "#5611B1" : "white",
    padding: "4px 12px", // Reduced padding
    fontSize: "0.90rem", // Smaller font size
    minWidth: "auto", // Removes unnecessary width
    "&:hover": {
      backgroundColor: group === "history" ? "white" : "#add8e6", // lighter shade for hover
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  }}
>
  View Class
</Button>


          </Grid>
        </Grid>
      </Card>
    </Box>
   </> 
  );
};

export default ClassCard;
