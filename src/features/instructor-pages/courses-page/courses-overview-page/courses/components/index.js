import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { getImageUrl } from 'utils/common/imageUtlils';
import { imagePlaceholder } from 'utils/placeholders';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course,onClick}) => {
  return (
    <Card onClick={()=>onClick(course)} sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="140"
        image={ course?.image ? getImageUrl(course?.image) : imagePlaceholder } 
        alt={course.course_name}
      />
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 700, lineHeight: "32px", color: "#000000"}} component="div" >
          {course.course_name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#6C757D", fontSize: "12px",fontWeight:400,lineHeight:"16px"}} color="text.secondary">
          {course.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: "space-between",alignItems:"center",pt:"10px"}} >
           <Box sx={{ display: "flex",gap:"10px", alignItems: "center"}} >
            <LayersOutlinedIcon sx={{ color: "#5611B1"}} />
            <Typography>{course?.coursemodules?.length} modules </Typography>
           </Box>
           <Box sx={{ display: "flex",gap:"10px", alignItems: "center"}} >
            <TimerOutlinedIcon sx={{ color: "#5611B1"}} />
            <Typography>{course?.duration} hours </Typography>
           </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CourseListPage = ({ courses }) => {
  const navigate = useNavigate()

  const handleCourseView = (course) => {
    navigate(`/instructor/course/${course?._id}`)
  }

  return (
    <Grid container spacing={2}>
      {courses.map((course) => (
        <Grid item key={course._id} xs={12} sm={6} md={3.4}>
          <CourseCard course={course} onClick={handleCourseView} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseListPage;
