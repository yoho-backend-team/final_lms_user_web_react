import React from 'react';
import { Box, Card, Typography, Button, Grid } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TimeIcon from '../icons/TimeIcon';
import DurationIcon from "../icons/DurationIcon";

const ClassCard = ({ cls,style }) => {
  console.log(style,"style")
  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {cls.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              {cls.subject}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2} sx={{display: "flex", alignItems: 'center', justifyContent: "center"}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarTodayOutlinedIcon color={style.calendarColor} />
            <Typography variant="body2" sx={{color:"gray"}} >
              {cls.date}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AccessTimeOutlinedIcon color={style.timerColor} />
            <Typography variant="body2" sx={{color:"gray"}} >
              {cls.time}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', color: 'gray', justifyContent: 'center' }} >
          <Box sx={{backgroundColor:style.durationColor,borderRadius:"26px"}}>
            <Typography variant="body2" sx={{ ml: 1,color:style?.durationTextColor,px:"16px",py:"8px",fontWeight:600,lineHeight:"22px",fontSize:"14px"}}>
              {cls.duration}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ backgroundColor: '#5611B1', color: 'white' }}>
            View Class
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ClassCard;
