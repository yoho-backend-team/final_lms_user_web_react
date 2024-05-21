import React from 'react';
import { Paper, Grid, Typography, CardMedia, Box, Button, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import back from '../../../../../src/assets/images/pages/background_2.png';

import pdf from '../../../../assets/images/Elite/pdf.png';
import stu1 from '../../../../assets/images/Elite/stu1.jpg';
import stu2 from '../../../../assets/images/Elite/stu2.jpg';
import stu3 from '../../../../assets/images/Elite/stu3.jpg';


const Demo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
}));

const chapters = [stu3, stu1, stu2];
const studyMaterials = [1, 2, 3, 4];
const notes = [1];

function StudentTwoCourse() {
  const matches = useMediaQuery('(min-width:600px)');

  return (
  <>
   <Grid style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover', backgroundPosition: "center", minHeight: '140vh' }}>
            <Grid container spacing={2} style={{ padding: '80px' }}>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={matches? 12 :12} sm={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button variant='contained' style={{ fontSize: "16px", fontWeight: "400" }}>1st</Button>
            <Box ml={2} flexGrow={1}>
              <Typography variant='h4'>Java Notes</Typography>
              <Typography variant='body1'>Foundation of Python & SQL Basic...</Typography>
            </Box>
            <Typography variant='h2'>97%</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="space-around" alignItems="center">
          <Box display="flex" alignItems="center">
            <DescriptionIcon style={{ marginRight: "4px" }} />
            <Typography variant='h6'>2 Notes</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <SlideshowIcon style={{ marginRight: "4px" }} />
            <Typography variant='h6'>32 Videos</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
        {chapters.map((image, index) => (
          <Grid item xs={matches? 12 : 12} sm={6} md={4} key={index} style={{ flexShrink: 0 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                style={{ height: "200px", borderRadius: "10px", width: "80%" }}
                image={image}
                title={`Chapter ${index + 1}`}
              />
              <CardContent>
                <Grid style={{display:"flex", justifyContent:"space-between"}} >
                  <Typography variant="h6" style={{ marginRight: "auto" }}>Chapter {index + 1}</Typography>
                  <Typography variant="h6">
                    <AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />01:32
                  </Typography>
                </Grid>
                <Grid>
                <Typography variant="body2" color="text.secondary" mt={2}>By Raja Kannan</Typography>
                </Grid>
                <Grid style={{display:"flex", justifyContent:"space-between"}} mt={2}>
                  <Typography variant="h6">
                    <DateRangeOutlinedIcon style={{ color: "blue", marginBottom: "-5px" }} />23 Apr 2023
                  </Typography>
                  <Typography variant="h6" style={{marginLeft:"30px"}}>
                    <AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />5:30PM
                  </Typography>
                </Grid>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={matches? 12 :12}>
          <Typography variant='h4' gutterBottom>Study Materials</Typography>
          <Grid container spacing={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
            {studyMaterials.map((chapter) => (
              <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                <Demo variant="outlined">
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={2}>
                      <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant='h6' gutterBottom>Chapter-{chapter}</Typography>
                      <Typography variant='body2'>
                        JavaScript Development
                        <FileDownloadOutlinedIcon style={{ marginBottom: "-5px" }} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Demo>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={matches? 12 :12}>
          <Typography variant='h4' gutterBottom>Notes</Typography>
          <Grid container spacing={2} style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
            {notes.map((chapter) => (
              <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                <Demo variant="outlined">
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={2}>
                      <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant='h6' gutterBottom>Chapter-01</Typography>
                      <Typography variant='body2'>
                        Java Notes
                        <FileDownloadOutlinedIcon style={{ marginBottom: "-5px" }} />
</Typography>
</Grid>
</Grid>
</Demo>
</Grid>
))}
</Grid>
</Grid>
</Grid>
</Grid>
</Grid>
</>
);
}

export default StudentTwoCourse;