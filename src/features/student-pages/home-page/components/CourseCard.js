import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Card } from "@mui/material";
import coursecardimage from "../../../../assets/images/background/coursecard.svg";
import { useSpinner } from 'context/SpinnerProvider';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getAllReports from '../redux/thunks';
import { selectStudentDashboard } from '../redux/selectors';

const CourseCard = () => {
    
  const dispatch = useDispatch();
  const reports = useSelector(selectStudentDashboard); 
  const { showSpinner, hideSpinner } = useSpinner();

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
      height: 400,
      type: "radialBar",
      position: 'absolute',
    },
    series: reports?.classes?.[0]?.total ? [reports.classes[0].total] : [75],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 20,
          size: "60%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: 0,
            show: true,
            color: "#555",
            fontSize: "14px",
            fontWeight: "bold",
          },
          value: {
            color: "#ff5722",
            fontSize: "24px",
            fontWeight: "900",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["progress"],
  };

  return (
    <Card
      sx={{
        backgroundImage: `url(${coursecardimage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top-center",
        p: 4,
        boxShadow:"0px 8px 32px rgba(0, 0, 0, 0.15)",
        borderRadius: "16px",
        border: "1px solid #E6AC96",
        position: "relative",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              color: "#481D0C",
              fontFamily: "Nunito Sans",
              fontSize: "1.25rem",
              fontWeight: 900,
              textAlign: "left",
            }}
          >
            Course Progress
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={12}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography
                sx={{
                  color: "#272835",
                  fontFamily: "Nunito Sans",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textAlign: "center",
                  minWidth: '65px',
                  marginLeft: '100px',
                  lineHeight: 'normal'
                }}
              >
                Course
              </Typography>
              <Typography
                sx={{
                  color: "#403B3B",
                  fontFamily: "Poppins",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textAlign: "center",
                  minWidth: '65px',
                  marginLeft: '100px',
                }}
              >
                {reports?.classes?.[0]?.total} Class
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ textAlign: 'center' }}>
              <Chart
                options={options}
                series={options.series}
                type="radialBar"
                height={[150, 200, 300]} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseCard;
