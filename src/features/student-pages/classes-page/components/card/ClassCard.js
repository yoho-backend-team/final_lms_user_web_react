import React from "react";
import { Box, Card, Typography, Button, Grid } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TimeIcon from "../icons/TimeIcon";
import DurationIcon from "../icons/DurationIcon";
import { Link } from "react-router-dom";
import {
  formatDate,
  formatTime,
  getIsTimeValid,
  getTimeDifference,
} from "../../../../../utils/formatDate";
import { Viewimage, Viewimage1, Viewimage2 } from "utils/images";


const groupImages = {
  upcoming: Viewimage1,
  completed: Viewimage,
  history: Viewimage,
  live: Viewimage2,
};

const ClassCard = ({ cls, style, type,group }) => {

  const backgroundImage = groupImages[group] || Viewimage;

  return (
    <Card sx={{ mb: 2}}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition : "right"
                  }}
      >
        <Grid item xs={3} sx={{ p: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 , color:"#000",fontFamily:"Poppins",fontSize:"14px",lineHeight:"22px"}}>
              {cls?.class_name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 400 , color:"#000",fontFamily:"Poppins",fontSize:"10px",lineHeight:"16px" }}>
              {cls?.course?.course_name}
            </Typography>
          </Box>
        </Grid>

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
            <Typography variant="body2" sx={{ color: "#6C757D",fontFamily:"Poppins",fontSize:"12px",lineHeight:"22px",fontWeight:500 }}>
              {formatDate(cls.start_date)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccessTimeOutlinedIcon color={style.timerColor} />
            <Typography variant="body2" sx={{ color: "#6C757D",fontFamily:"Poppins",fontSize:"12px",lineHeight:"22px",fontWeight:500 }}>
              {formatTime(cls.start_time)}
            </Typography>
          </Box>
        </Grid>

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
            sx={{ backgroundColor: style.durationColor, borderRadius: "26px" }}
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
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" , paddingRight:"30px"}}>
          
          <Button
            component={Link}
            to={`/student/class/${cls.uuid}?type=${type}&group=${group}`}
            state={{ id: cls.uuid }}
            variant="contained"
            sx={{
              backgroundColor: "#FFF",
              color: "#0D6EFD",
              padding: '8px 16px',
              minWidth: '100px',
              borderRadius: '8px',
              fontfamily: "Poppins",
              fontsize: "14px",
              fontstyle: "normal",
              fontweight: "500",
              lineheight: "22px"
            }}
          >
            View Class
          </Button>
        
        </Grid>
      </Grid>
    </Card>
  );
};


export default ClassCard;
