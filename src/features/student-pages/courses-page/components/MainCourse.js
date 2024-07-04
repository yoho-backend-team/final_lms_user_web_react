import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '../../../../App.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import courseImage from '../../../../assets/images/dummy/course.jpg';
import lesson from '../../../../assets/images/icons/course.svg';
import language from '../../../../assets/images/icons/language.svg';
import time from '../../../../assets/images/icons/wi_time-12.svg';
import certificateimg from '../../../../assets/images/icons/certificate.svg';
import writing from '../../../../assets/images/icons/writing.svg';
import html1 from '../../../../assets/images/dummy/Rectangle 53.png';
import html2 from '../../../../assets/images/dummy/Rectangle 54.png';
import html3 from '../../../../assets/images/dummy/Rectangle 55.png';
import html4 from '../../../../assets/images/dummy/Rectangle 56.png';
import html5 from '../../../../assets/images/dummy/Rectangle 57.png';
import pdf from '../../../../assets/images/icons/pdf.png';
import down from '../../../../assets/images/icons/download.png';
import leftnav from '../../../../assets/images/icons/leftnav.svg';
import rightnav from '../../../../assets/images/icons/rightnav.svg';
import { getCourseDetails } from "../services/";
import { getImageUrl } from 'utils/common/imageUtlils';
// import Client from "../../../../features/student-pages/courses-page/services/index";


const MainCourse = ( ) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const data = {};
      const details = await getCourseDetails(data);
      setCourseDetails(details);
    };

    fetchCourseDetails();
  }, []);

  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 200;
      container.scrollLeft += direction * scrollAmount;
    }
  };

  const scrollLeft = () => scrollContainer('recorded-class-scroll-container', -1);
  const scrollRight = () => scrollContainer('recorded-class-scroll-container', 1);
  const scrollLeftStudy = () => scrollContainer('study-material-scroll-container', -1);
  const scrollRightStudy = () => scrollContainer('study-material-scroll-container', 1);
  const scrollLeftNotes = () => scrollContainer('notes-scroll-container', -1);
  const scrollRightNotes = () => scrollContainer('notes-scroll-container', 1);

  const dynamicData = 'Big Data,Node JS, OOPS, JVM, Web Arch, Angular';
  const items = dynamicData.split(',').map((item) => item.trim());

  const dummyData = [
    { id: 1, title: 'Chapter-01', description: 'JavaScript Development Workbook' },
    { id: 2, title: 'Chapter-02', description: 'JavaScript Development Workbook' },
    { id: 3, title: 'Chapter-03', description: 'JavaScript Development Workbook' },
    { id: 4, title: 'Chapter-04', description: 'JavaScript Development Workbook' },
  ];

  const dummyDataa = [{ id: 1, title: 'Chapter-01', description: 'JavaScript Development Workbook' }];
  console.log(courseDetails,"courseDetails")
  return (
    <div className="main-container">
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={matchesXS ? 12 : 3}>
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500 }}>
            {courseDetails?.course_name}
          </Typography>
          <img src={ getImageUrl(courseDetails?.image) } alt="Java Full Course" style={{ paddingTop: 15, maxWidth: '100%', height: 'auto', display: 'block' }} />
          <Typography variant="body1" sx={{ color: 'black', paddingTop: 6, fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500 }}>
            Benefits
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2, paddingRight: 10, paddingBottom: 2 }}>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={lesson} alt="lesson" style={{ width: '24px', height: '24px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
                  12 lessons
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={language} alt="language" style={{ width: '24px', height: '24px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
                  English & Tamil
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={time} alt="time" style={{ width: '24px', height: '24px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
                  12 hrs
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={certificateimg} alt="certificateimg" style={{ width: '24px', height: '24px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
                  3 certificates
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={writing} alt="writing" style={{ width: '24px', height: '24px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
                  Notes
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '12px', fontStyle: 'italic', fontWeight: 500, marginTop: '80px' }}>
                Held on: 23 April 2024
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={matchesXS ? 12 : 9}>
          <Grid container spacing={2}>
            <Grid item xs={matchesXS ? 12 : 8}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500 }}>
                About
              </Typography>
              <Typography variant="body1" sx={{ color: 'black', paddingTop: 2, paddingRight: 2, fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }}>
                {courseDetails?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500, marginBottom: 2 }}>
                Skills You’ll Gain
              </Typography>
              <Grid container spacing={2}>
                {items.map((item, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon sx={{ fontSize: 9, marginRight: 1 }} />
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: 3 }}>
            <div style={{ position: 'relative' }}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                Recorded Class preview
              </Typography>
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <img src={leftnav} alt="leftnav" style={{ width: '24px', height: '24px', marginRight: '10px', cursor: 'pointer' }} onClick={scrollLeft} />
                <img src={rightnav} alt="rightnav" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={scrollRight} />
              </div>
            </div>
            <div className="recorded-class-scroll-container" id="recorded-class-scroll-container" style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingTop: '10px' }}>
              {[html1, html2, html3, html4, html5].map((image, index) => (
                <div key={index} style={{ flex: '0 0 auto' }}>
                  <img src={image} alt={`html${index + 1}`} style={{ width: '214px', height: '114px' }} />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: 2 }}>
            <div style={{ position: 'relative' }}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                Study Material
              </Typography>
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <img src={leftnav} alt="leftnav" style={{ width: '24px', height: '24px', marginRight: '10px', cursor: 'pointer' }} onClick={scrollLeftStudy} />
                <img src={rightnav} alt="rightnav" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={scrollRightStudy} />
              </div>
            </div>
            <div className="study-material-scroll-container" id="study-material-scroll-container" style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingTop: '10px' }}>
              {courseDetails?.studymaterials.map((studymaterials, index) => (
                <div key={index} style={{ flex: '0 0 auto', textAlign: 'center' }}>
                  <img src={pdf} alt={`pdf${index}`} style={{ width: '80px', height: '80px', display: 'block', margin: '0 auto' }} />
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
                    {studymaterials?.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '10px' }}>
                    {studymaterials?.description}
                  </Typography>
                  <a href={studymaterials?.file} download>
        <img src={down} alt="down" style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
      </a>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: 2 }}>
            <div style={{ position: 'relative' }}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                Notes
              </Typography>
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <img src={leftnav} alt="leftnav" style={{ width: '24px', height: '24px', marginRight: '10px', cursor: 'pointer' }} onClick={scrollLeftNotes} />
                <img src={rightnav} alt="rightnav" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={scrollRightNotes} />
              </div>
            </div>
            <div className="notes-scroll-container" id="notes-scroll-container" style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingTop: '10px' }}>
              {courseDetails?.notes.map((notes, index) => 
                <div key={index} style={{ flex: '0 0 auto', textAlign: 'center' }}>
                  <img src={pdf} alt={`pdf${index}`} style={{ width: '80px', height: '80px', display: 'block', margin: '0 auto' }} />
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
                    {notes?.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '10px' }}>
                    {notes?.description}
                  </Typography>
                  <a href={notes?.file} download>
        <img src={down} alt="down" style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
      </a>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainCourse;
