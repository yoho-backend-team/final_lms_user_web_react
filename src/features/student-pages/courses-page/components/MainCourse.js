import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "../../../../App.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import courseImage from "../../../../assets/images/dummy/course.jpg"
import lesson from "../../../../assets/images/icons/course.svg"
import language from "../../../../assets/images/icons/language.svg"
import time from "../../../../assets/images/icons/wi_time-12.svg"
import certificateimg from "../../../../assets/images/icons/certificate.svg"
import writing from "../../../../assets/images/icons/writing.svg"
import html1 from  "../../../../assets/images/dummy/Rectangle 53.png"
import html2 from  "../../../../assets/images/dummy/Rectangle 54.png"
import html3 from  "../../../../assets/images/dummy/Rectangle 55.png"
import html4 from  "../../../../assets/images/dummy/Rectangle 56.png"
import html5 from  "../../../../assets/images/dummy/Rectangle 57.png"
import pdf from  "../../../../assets/images/icons/pdf.png"
import down from  "../../../../assets/images/icons/download.png"
import leftnav from "../../../../assets/images/icons/leftnav.svg"
import rightnav from "../../../../assets/images/icons/rightnav.svg"


const MainCourse = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));


  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 200;
      container.scrollLeft += direction * scrollAmount;
    }
  };
  
  const scrollLeft = () => {
    scrollContainer('recorded-class-scroll-container', -1);
  };
  
  const scrollRight = () => {
    scrollContainer('recorded-class-scroll-container', 1);
  };
  
  const scrollLeftStudy = () => {
    scrollContainer('study-material-scroll-container', -1);
  };
  
  const scrollRightStudy = () => {
    scrollContainer('study-material-scroll-container', 1);
  };
  
  const scrollLeftNotes = () => {
    scrollContainer('notes-scroll-container', -1);
  };
  
  const scrollRightNotes = () => {
    scrollContainer('notes-scroll-container', 1);
  };
  



    //dummy
    const dynamicData = "Big Data,Node JS, OOPS, JVM, Web Arch, Angular";
    const items = dynamicData.split(',').map(item => item.trim());

    const dummyData = [
      {
        id: 1,
        title: 'Chapter-01',
        description: 'JavaScript Development Workbook',
      },
      {
        id: 2,
        title: 'Chapter-02',
        description: 'JavaScript Development Workbook',
      },
      {
        id: 3,
        title: 'Chapter-03',
        description: 'JavaScript Development Workbook',
      },
      {
        id: 3,
        title: 'Chapter-04',
        description: 'JavaScript Development Workbook',
      },
    ];
    
    const dummyDataa = [
      {
        id: 1,
        title: 'Chapter-01',
        description: 'JavaScript Development Workbook',
      },
      
    ];
    
    ///////////////////////
    

  
  return (
    <div className="main-container">
      <Grid container spacing={2} sx={{ p: 2 }}>      
        <Grid item xs={matchesXS ? 12 : 3}>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            Java Full Course
          </Typography>
          <img
          src={courseImage}
          alt="Java Full Course"
          style={{
            paddingTop : 15,
            maxWidth: '100%', 
            height: 'auto',
            display: 'block', 
          }}
        />       
        <Typography
            variant="body1"
            sx={{
              color: 'black',
              paddingTop: 6,
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            Benefits
          </Typography>  
          <Grid container spacing={2} sx={{ paddingTop: 2, paddingRight: 10, paddingBottom: 2 }}>
      <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={lesson}
            alt="lesson"
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          />
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px',  marginBottom: '10px' }}>
            12 lessons
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={language}
            alt="language"
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          />
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px',  marginBottom: '10px' }}>
            English & Tamil
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={time}
            alt="time"
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          />
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px',   marginBottom: '10px' }}>
            12 hrs
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={certificateimg}
            alt="certificateimg"
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          />
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px'}}>
            3 certificates
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={writing}
            alt="writing"
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          />
          <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px', marginBottom: '10px' }}>
            Notes
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '12px', fontStyle: 'italic', fontWeight: 500, marginTop: '80px'}}>
          Held on: 23 April 2024
        </Typography>
      </Grid>
      </Grid>
    </Grid>
    
        <Grid item xs={matchesXS ? 12 : 9}>
        <Grid container spacing={2}>
        <Grid item xs={matchesXS ? 12 : 8}>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
             About
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              paddingTop : 2,
              paddingRight: 2,
              fontFamily: 'Poppins',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
             User Interface (UI) refers to the visual and interactive elements of a software or product that facilitate user interaction. It encompasses design elements such as buttons, menus, and layouts, aimed at creating an intuitive and aesthetically pleasing user experience.
          </Typography>

        </Grid>
        <Grid item xs={12} sm={6} md={4}> 
      <Typography
        variant="body1"
        sx={{
          color: 'black',
          fontFamily: 'Poppins',
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: 2, 
        }}
      >
        Skills You’ll Gain
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}> 
            <Typography
              variant="body1"
              sx={{
                color: 'black',
                fontFamily: 'Poppins',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FiberManualRecordIcon sx={{ fontSize: 9, marginRight: 1 }} />
              {item}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
      
        </Grid>
        <Grid item xs={12} sx={{paddingTop : 3}}>
        <div style={{ position: 'relative' }}>
            <Typography
              variant="body1"
              sx={{
                color: 'black',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Recorded Class preview
            </Typography>
            <div style={{ position: 'absolute', top: 0, left: '92%'}}>
              <img
                src={leftnav}
                alt="leftnav"
                onClick={scrollLeft}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <img
                src={rightnav}
                alt="rightnav"
                onClick={scrollRight}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }} id="recorded-class-scroll-container">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html1}
                alt="html1"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-01
              </Typography>
            </div>

            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html2}
                alt="html2"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-02
              </Typography>
            </div>

            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html3}
                alt="html3"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-03
              </Typography>
            </div>

            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html4}
                alt="html4"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-04
              </Typography>
            </div>
            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html1}
                alt="html5"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-05
              </Typography>
            </div>
            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <img
                src={html5}
                alt="html6"
                style={{
                  maxWidth: '100%', 
                  height: 'auto',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '12px' }}>
                HTML ,Part-01
              </Typography>
            </div>

          </div>
        </div>           
        </Grid>
        <Grid item xs={12} >
        <div style={{ position: 'relative' }}>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            Study Materials
          </Typography>
          <div style={{ position: 'absolute', top: 0, left: '92%'}}>
              <img
                src={leftnav}
                alt="leftnav"
                onClick={scrollLeftStudy}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <img
                src={rightnav}
                alt="rightnav"
                onClick={scrollRightStudy}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }} id="study-material-scroll-container">
      <div style={{ display: 'flex', gap: '20px', padding: '20px', maxWidth: 'calc(100% + 20px)' }}>
        {dummyData.map((item) => (
          <div key={item.id} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '322px', height: '80px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ flex: '0 0 auto', width: '62px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={pdf}
                alt="pdf"
                style={{
                  width: '62px',
                  height: '49px',
                  padding: '2px',
                }}
              />
            </div>
            <div style={{ flex: '1', padding: '10px' }}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '10px', marginTop: '5px' }}>
                {item.description}
              </Typography>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '10px' }}>
              <img
                src={down}
                alt="down"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
           
        </Grid>

        <Grid item xs={12} >
        <div style={{ position: 'relative' }}>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            Notes
          </Typography>
          <div style={{ position: 'absolute', top: 0, left: '92%'}}>
              <img
                src={leftnav}
                alt="leftnav"
                onClick={scrollLeftNotes}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <img
                src={rightnav}
                alt="rightnav"
                onClick={scrollRightNotes}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }} id="notes-scroll-container">
      <div style={{ display: 'flex', gap: '20px', padding: '20px', maxWidth: 'calc(100% + 20px)' }}>
        {dummyDataa.map((item) => (
          <div key={item.id} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '322px', height: '80px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ flex: '0 0 auto', width: '62px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={pdf}
                alt="pdf"
                style={{
                  width: '62px',
                  height: '49px',
                  padding: '2px',
                }}
              />
            </div>
            <div style={{ flex: '1', padding: '10px' }}>
              <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontFamily: 'Poppins', fontSize: '10px', marginTop: '5px' }}>
                {item.description}
              </Typography>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '10px' }}>
              <img
                src={down}
                alt="down"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

        </Grid>
     
        </Grid>
      </Grid>
    </div>
  );
}

export default MainCourse;
