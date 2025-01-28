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
      height: 800,
      type: "radialBar",
    },
    series: reports?.attendance?.[0]?.total?.percentage ? [reports.attendance?.[0]?.total?.percentage] : [75],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 1,
          size: "30%",
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
            color: "#111",
            fontSize: "20px",
            fontWeight: "bold",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [""],
  };

  const current_month = new Date().getMonth();
  const attendance_data = Attendance?.find((atten) => atten.month === current_month);

  return (
    <Card
    sx={{
      p: 3,
      boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.2)",
      background: "#EFFFFF",
      width: "369px",
      height: "202px",
      borderRadius: "16px",
      border: "1px solid #BAA3E8",
      backgroundImage: `url(${AttedenceBg})`,
      backgroundSize: "auto",
      backgroundPosition: "center",
      height: 'auto',
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
                fontSize: '20px', 
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
                fontSize: '14px', 
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
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
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
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
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
                }}
              />
              <Typography
                sx={{
                  color: '#2F0C77',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
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
            height={150}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AttendanceCard;
