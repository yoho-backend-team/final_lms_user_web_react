import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import frame from "../../../assets/images/icons/Frame 185.svg"
import Avatar from '@mui/material/Avatar';
import userimage from "../../../assets/images/dummy/Ellipse 5.svg"
import Chart from "react-apexcharts";


const VirtualIDCard = () => {

  const options = {
    chart: {
      type: "radialBar",
    },
    series: [72],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: false,
            color: "#888",
            fontSize: "10px",
            fontWeight: "bold",
          },
          value: {
            color: "var(--Black, #131313)",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            letterSpacing: "-1.592px",
            show: true
        },        
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [""],
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4} xl={3}>
      <Typography variant="h5" gutterBottom sx={{ width: '137px',color: '#000',fontFamily: 'Poppins',fontSize: '20px',fontStyle: 'normal',fontWeight: 700,lineHeight: '5px', padding: '16px 16px 0 16px' }}>
              Virtual ID
            </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '290px', 
            height: 'auto',
            padding: '16px',
            margin: '0 auto', 
          }}
        >
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <img
              src={frame}
              alt="frame"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Avatar
                alt="userimage"
                src={userimage} 
                sx={{
                  width: '90px',
                  height: 'auto',
                  marginBottom: 2,
                  marginLeft:'83px',
                  marginTop:'-61px'
                }}
              />
              <Typography variant="subtitle1" sx={{ color: '#495057', fontFamily: 'Poppins', fontSize:'24px', fontStyle:'normal', fontWeight: 700  }}>Name</Typography>
              <Typography
                    variant="body2"
                    sx={{
                        color: '#6C757D', 
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '16px',
                    }}
                    >
                    Student ID: 9nuidwybutv7
                    </Typography>
                    <Typography
                    variant="body2"
                    sx={{
                        color: 'var(--Gray-600, #6C757D)', 
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '16px',
                    }}
                    >
                    Batch: A
                    </Typography>
            </Box>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="h5" gutterBottom sx={{ width: '500px',color: '#000',fontFamily: 'Poppins',fontSize: '20px',fontStyle: 'normal',fontWeight: 700,lineHeight: '5px', padding: '16px 16px 0 16px', }}>
         Course Status
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start',}}>
      <Chart 
              options={options}
              series={options.series}
              type="radialBar"
              height={200}
            />
      </Box>
      <Typography variant="h5" gutterBottom sx={{
            color: '#828282',
            fontFamily: 'Lato',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            padding: '0 0 0 60px',
            minwidth:'800px'     
        }}>
           Course Ends at : 29 May 2024
        </Typography>      
      </Grid>
    </Grid>
  );
};


export default VirtualIDCard;
