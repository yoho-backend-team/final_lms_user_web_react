import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';

function StudentOneCourse() {
   
    const matches = useMediaQuery('(min-width:600px)');

    return (
        // <StyledPaper elevation={3}>
        <>
            <Grid container spacing={2}>
                {/* Left Content */}
                <Grid item xs={matches? 12:12} md={9} lg={12} mt={4}>
                    <Grid container spacing={2}>
                        {/* Grid items for each card */}
                        {[
                            { bg: "#193ae3", buttonBg: "#193ae3", buttonLabel: "1st", chapter: "Foundation of Python &SQL Basic...", notes: 2, videos: 32, progress: "97%" },
                            { bg: "#c645b1", buttonBg: "darkviolet", buttonLabel: "2nd", chapter: "Framework & Styling", notes: 2, videos: 22, progress: "88%" },
                            { bg: "#e2d148", buttonBg: "orange", buttonLabel: "3rd", chapter: "Prototype Functionalities...", notes: 0, videos: 0, progress: "0%" },
                            { bg: "#f05b95", buttonBg: "pink", buttonLabel: "4th", chapter: "Database Management with Python", notes: 0, videos: 0, progress: "0%" },
                            { bg: "#38d099", buttonBg: "lightgreen", buttonLabel: "5th", chapter: "Backend Linking & Hosting", notes: 0, videos: 0, progress: "0%" },
                            { bg: "#44aba3", buttonBg: "#46cbc5", buttonLabel: "6th", chapter: "Padding with Python", notes: 0, videos: 0, progress: "0%" }
                        ].map((card, index) => (
                            <Grid item xs={matches? 12:12} sm={6} md={4} lg={3} key={index}>
                                <Card style={{ backgroundColor: card.bg }}>
                                    <CardContent>
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <Grid item xs={4}>
                                                <Button variant='contained' style={{ fontSize: "16px", fontWeight: "400", backgroundColor: card.buttonBg, color: "#fff", border: "none" }}>{card.buttonLabel}</Button>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant='h4' style={{ color: "#fff" }}>Chapter</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                                            <Grid item xs={8}>
                                                <Typography variant='h5' style={{ color: "#fff" }}>{card.chapter}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant='h2' style={{ color: "#fff" }}>{card.progress}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                                            <Grid style={{ display: "flex" }}>
                                                <DescriptionIcon style={{ marginRight: "4px", marginTop: "-3px", color: "#fff" }} />
                                                <Typography variant='h5' style={{ color: "#fff" }}>{card.notes} Notes</Typography>
                                            </Grid>
                                            <Grid style={{ display: "flex" }}>
                                                <SlideshowIcon style={{ marginRight: "4px", marginTop: "-3px", color: "#fff" }} />
                                                <Typography variant='h5' style={{ color: "#fff" }}>{card.videos} Videos</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            </>
    );
}

export default StudentOneCourse;