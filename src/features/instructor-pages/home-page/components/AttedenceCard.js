import { Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { Card, Box } from "@mui/material";
import { AttedenceBg } from "utils/images";

const AttendanceCard = ({Attendance}) => {
  const current_month = new Date().getMonth()
  const attendance_data = Attendance?.find((atten ) => atten.month === current_month )
  

  const options = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    series: [attendance_data?.total?.percentage || 76],
    // colors:["#5611B1"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "50%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: false,
            color: "#5611B1",
            fontSize: "10px",
            fontWeight: "bold",
          },
          value: {
            color: "#5611B1",
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

 
  return (
    <>
      <Card 
      sx={{
        p: 3, boxShadow: "none", 
        background: `url("${AttedenceBg}")`,
        backgroundSize: "cover", 
        width: "369px",
        height: "202px",
        }}>
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
                fontWeight: "bold",
                fontFamily: "poppins",
                color: "#442189",
                fontWeight: 900,
                fontSize: "20px"
              }}
            >
              Attendance
            </Typography>
            <Typography
              sx={{
                fontWeight: "semi-bold",
                fontWeight: 700,
                letterSpacing: "-0.2px",
                color: "#2F0C77",
              }}
            >
              OverAll
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ mt: "10px"}} >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "100%",
                  backgroundColor: "#32D445",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#2F0C77",
                }}
              >
                OverAll {attendance_data?.total?.percentage}% Attendance
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "100%",
                  backgroundColor: "#F6C92A",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#2F0C77",
                }}
              >
                12% Attendance Remaining
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "100%",
                  backgroundColor: "#FF1B1B",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#2F0C77",
                }}
              >
                {attendance_data?.absent?.percentage}% Days Absent
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ mt: "10px"}} >
            <Chart
              options={options}
              series={options.series}
              type="radialBar"
              height={150}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AttendanceCard;
