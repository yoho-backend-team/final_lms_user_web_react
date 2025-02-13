import React, { useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import coursecardimage from "../../../../assets/images/background/home pic.png";
import { useSpinner } from 'context/SpinnerProvider';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getAllReports from '../redux/thunks';
import { selectStudentDashboard } from '../redux/selectors';

const CourseCard = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectStudentDashboard); 
  const { showSpinner, hideSpinner } = useSpinner();
  
 console.log(coursecardimage)
  const fetchReports = async () => {
    try {
      showSpinner();
      await dispatch(getAllReports());
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };
  
  useEffect(() => {
    fetchReports();
  }, [dispatch]);
 
  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    series: reports?.classes?.[0]?.total ? [reports.classes[0].total] : [0],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "55%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#555", 
            fontSize: "14px",
            fontWeight: 600,
          },
          value: {
            color: "#ff5722", 
            fontSize: "22px",
            fontWeight: 800,
            show: true,
          },
        },
        track: {
          background: 'rgba(219, 23, 23, 0.3)', // Soft white background
        }
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
    colors: ['black'], // White color for better contrast
  };

  return (
    <Card
    sx={{
      backgroundImage: `url('${coursecardimage}')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      p: 2,
      boxShadow: "0px 0px 30px rgba(53, 177, 48, 0.1)",
      border: "1px",
      borderRadius: "2px",
      maxWidth: "450px",
      height: "200px",
    }}
    
    >
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        justifyContent="center" 
        sx={{
          position: 'relative',
          zIndex: 1, // Ensure content is above background
        }}
      >
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h5"
            sx={{
              color: "#481D0C", 
              fontFamily: "Nunito Sans",
              fontSize: "1.5rem",
              fontWeight: 900,
              mt: 0.1,
              mr:"251px",
              textAlign: "center",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)", // Added text shadow for readability
            }}
          >
            Course Progress
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid 
            container 
            justifyContent="center" 
            alignItems="center" 
            spacing={2}
            textAlign="center"
          >
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "#272835", 
                  fontFamily: "Nunito Sans",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  textAlign: "center",
                  mt:"20px",
                  mr:"30px",
                  textShadow: "1px 1px 2px rgba(189, 34, 34, 0.5)", // Added text shadow
                }}
              >
                Total Classes
              </Typography>
              <Typography
                sx={{
                  color: "#403B3B", // Changed to white
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textAlign: "center",
                  mr:"30px",
                  mt: 1,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)", // Added text shadow
                }}
              >
                {reports?.classes?.[0]?.total || 0} Classes
              </Typography>
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',ml:"270px", position: 'relative', top: -105 }}>
              <Chart
                options={options}
                series={options.series}
                type="radialBar"
                height={200}
                width={200
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseCard;
