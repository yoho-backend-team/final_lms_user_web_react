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

const ClassCard = ({ cls, style, type }) => {
  return (
    <Card sx={{ mb: 2, p: 2 }}>
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
            to={`/instructor/class/${cls.uuid}?type=${type}`}
            state={{ id: cls.uuid }}
            variant="contained"
            sx={{ backgroundColor: "#5611B1", color: "white" }}
          >
            View Class
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ClassCard;
