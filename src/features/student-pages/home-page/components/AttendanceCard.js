import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, Box } from "@mui/material";
import AttedenceBg from "../../../../assets/images/icons/attendancecard.svg"
import { useSpinner } from 'context/SpinnerProvider';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getAllReports from '../redux/thunks';
import { selectStudentDashboard } from '../redux/selectors';

const AttendanceCard = ({ Attendance }) => {

    
  const dispatch = useDispatch()
  const reports = useSelector(selectStudentDashboard); 
  const { showSpinner, hideSpinner } = useSpinner()


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
      height: 300, // Reduced from 800, more appropriate size
      type: "radialBar",
    },
    series: reports?.attendance?.[0]?.total?.percentage ? [reports.attendance?.[0]?.total?.percentage] : [75],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15, // Increased margin
          size: "50%", // Increased size from 30% to 50%
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: false,
          },
          value: {
            color: "#6D28D9", // More vibrant color
            fontSize: "15px", // Increased font size
            fontWeight: 800,
            show: true,
          },
        },
        track: {
          background: '#E9D5FF', // Added track background for better visibility
        }
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Attendance"],
    colors: ['#6D28D9'], // Vibrant color for the bar
  };

  const current_month = new Date().getMonth();
  const attendance_data = Attendance?.find((atten) => atten.month === current_month);

  return (
    <Card
    sx={{
      p: 3,
      boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.2)",
      background: "#BAA3E8",
      width: "455px",
      height: "202px",
      borderRadius: "16px",
      border: "1px solid #BAA3E8",
      backgroundImage: `url(${AttedenceBg})`,
      backgroundSize: "auto",
      backgroundPosition: "center",
      height: '205px',
      '@media screen and (max-width: 600px)': {
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      },
    }}
  >  
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid
          xs={12}
          sx={{ justifyContent: "space-between", display: "flex" }}
        >
       <Typography
              variant="h4"
              sx={{
                color: '#442189', 
                fontFamily: 'Nunito Sans', 
                fontSize: '25px', 
                fontStyle: 'normal', 
                fontWeight: 900, 
                lineHeight: 'normal', 
              }}
            >
              Attendance
            </Typography>
            <Typography
              sx={{
                color: '#2F0C77', 
                fontFamily: 'Nunito Sans', 
                fontSize: '18px', 
                fontStyle: 'normal', 
                fontWeight: 700, 
                lineHeight: 'normal', 
              }}
            >
              Overall
            </Typography>

        </Grid>

        <Grid item xs={8}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: '100%',
                  backgroundColor: '#32D445',
                  mt:"15px"
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  mt:"15px",
                }}
              >
                Overall {options.series}% Attendance
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: '100%',
                  backgroundColor: '#F6C92A',
                   mt:"5px"
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                   mt:"5px"
                }}
              >
                {reports.attendance?.[0]?.present?.percentage}% Attendance Remaining
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: '100%',
                  backgroundColor: '#FF1B1B',
                   mt:"5px"
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                   mt:"5px"
                }}
              >
                {reports.attendance?.[0]?.absent?.percentage}% Days Absent
              </Typography>
            </Box>
          </Grid>

       

        <Grid item xs={4}>
          <Chart
            options={options}
            series={options.series}
            type="radialBar"
            height={200}
            width={180}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AttendanceCard;
