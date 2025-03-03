import { Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { Card, Box } from "@mui/material";
import { AttedenceBg } from "utils/images";

const AttendanceCard = ({ Attendance }) => {
  const current_month = new Date().getMonth();
  const attendance_data = Attendance?.find((atten) => atten.month === current_month);

  const options = {
    chart: {
      height: "800",
      type: "radialBar",
    },
    series: [attendance_data?.total?.percentage || 76],
    colors: ["#5611B1"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 1,
          size: "30%",
          rotate: "90deg",
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
    
    <Card
  sx={{
    p: 3,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", 
    background: `url("${AttedenceBg}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fff", 
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "369px",
    height: "202px",
    overflow: "hidden", 
    boxSizing: "border-box", 
    borderBottom: "1px solid #ddd", 
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
              fontWeight: "bold",
              fontFamily: "Poppins",
              color: "#442189",
              fontSize: "20px",
            }}
          >
            Attendance
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.2px",
              color: "#2F0C77",
            }}
          >
            OverAll
          </Typography>
        </Grid>
        
        <Grid item xs={7} sx={{ mt: "10px" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Box
              sx={{
                height: 16,
                width: 16,
                borderRadius: "50%",
                backgroundColor: "#32D445",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
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
                borderRadius: "50%",
                backgroundColor: "#F6C92A",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
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
                borderRadius: "50%",
                backgroundColor: "#FF1B1B",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#2F0C77",
              }}
            >
              {attendance_data?.absent?.percentage}% Days Absent
            </Typography>
          </Box>
        </Grid>

        {/* Fixed Chart Layout */}
        <Grid item xs={5} sx={{ mt: "30px" }}>
          <Chart
            options={options}
            series={options.series}
            type="radialBar"
            height={250} // Adjusted height to fit well inside the card
            width={"100%"} // Ensures responsiveness
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AttendanceCard;
