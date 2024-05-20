import React from 'react';
import { Paper, Grid, Typography, CardMedia, Box, Button, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import pdf from '../../../../assets/images/Elite/pdf.png';
import stu1 from '../../../../assets/images/Elite/stu1.jpg';
import stu2 from '../../../../assets/images/Elite/stu2.jpg';
import stu3 from '../../../../assets/images/Elite/stu3.jpg';
import stu4 from '../../../../assets/images/Elite/stu3.jpg';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const Demo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

function StudentTwoCourse() {
    
    const matches = useMediaQuery('(min-width:600px)');

    return (
        // <StyledPaper elevation={3}>
        <>
            <Grid container spacing={4} mt={2}>
                <Grid item xs={matches? 12: 10} sm={6} container spacing={2}>
                    <Grid item xs={matches? 8 : 12} display="flex" justifyContent="space-between" alignItems="center">
                        <Button variant='contained' style={{fontSize:"16px", fontWeight:"400"}}>1st</Button>
                        <Grid ml={2}>
                            <Typography variant='h4'>Java Notes</Typography>
                            <Typography variant='body1'>Foundation of Python & SQL Basic...</Typography>
                        </Grid>
                        <Typography variant='h2'>97%</Typography>
                        
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} display="flex" justifyContent="space-around" alignItems="center">
                    <Grid style={{display:"flex"}}>
                         <DescriptionIcon style={{marginRight:"4px", marginTop:"-3px"}}/>
                        <Typography variant='h4'>2 Notes</Typography>
                    </Grid>
                    <Grid style={{display:"flex"}}>
                    <SlideshowIcon style={{marginRight:"4px", marginTop:"-3px"}} />
                        <Typography variant='h4'>32 Videos</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={4} style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
    {[stu3, stu1, stu2, stu4].map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} style={{ flexShrink: 0 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <CardMedia
                    style={{ height: "200px", borderRadius: "10px", width: "100%" }}
                    image={image}
                    title={`Chapter ${index + 1}`}
                />
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" style={{ marginRight: "150px" }}>Chapter {index + 1}</Typography>
                        <Typography variant="h4"><AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />01:32</Typography>
                    </Grid>
                    <Typography variant="body2" color="text.secondary" mt={2}>By Raja Kannan</Typography>
                    <Grid container justifyContent="space-between" alignItems="center" mt={2}>
                        <Typography variant="h5"><DateRangeOutlinedIcon style={{ color: "blue", marginBottom: "-5px" }} />23 Apr 2023</Typography>
                        <Typography variant="h5"><AccessTimeIcon style={{ color: "blue", marginBottom: "-5px" }} />5:30PM</Typography>
                    </Grid>
                </CardContent>
            </Box>
        </Grid>
    ))}
</Grid>


<Grid container spacing={2} mt={4}>
    <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>Study Materials</Typography>
        <Grid container spacing={2} style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
            {[1, 2, 3, 4].map((chapter) => (
                <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                    <Demo variant="outlined">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={2}>
                                <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant='h4' gutterBottom>Chapter-{chapter}</Typography>
                                <Typography variant='body1'>
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

<Grid container spacing={2} mt={4}>
    <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>Notes</Typography>
        <Grid container spacing={2} style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
            {[1].map((chapter) => (
                <Grid item xs={12} sm={6} md={4} key={chapter} style={{ flexShrink: 0 }}>
                    <Demo variant="outlined">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={2}>
                                <CardMedia component="img" image={pdf} height={50} alt="PDF Icon" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant='h4' gutterBottom>Chapter-01</Typography>
                                <Typography variant='body1'>
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
            </>
        // </StyledPaper>
    );
}

export default StudentTwoCourse;