import React from "react";
import { Box, Card, Typography, Button, Grid } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link } from "react-router-dom";
import { formatDate, formatTime, getTimeDifference } from "../../../../../utils/formatDate";

const ClassCard = ({ cls, style, type, group, img }) => {
  
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        backgroundImage : `url(${img})`,
        backgroundPosition : "right",
        backgroundRepeat : "no-repeat",
        transition: "all 0.2s ease", 
        cursor : "pointer",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          transform: "scale(1.02)", 
        },
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {cls?.class_name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
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
            <Typography variant="body2" sx={{ color: "gray" }}>
              {formatDate(cls.start_date)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccessTimeOutlinedIcon color={style.timerColor} />
            <Typography variant="body2" sx={{ color: "gray" }}>
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

        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to={`/instructor/classes/${cls.uuid}?type=${type}&group=${group}`}
            state={{ id: cls.uuid }}
            variant="contained"
            sx={{
              backgroundColor: group === "history" ?  "white" :  "#5611B1",
              color: group === "history" ?  "#5611B1" : "white",
              "&:hover": {
                backgroundColor: group === "history" ? "white" : "#4a0e8d", 
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
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
