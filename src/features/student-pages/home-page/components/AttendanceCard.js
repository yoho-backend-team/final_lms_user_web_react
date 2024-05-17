import { Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { Card, Box } from "@mui/material";
const AttendanceCard = () => {
  const options = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    series: [78 ],
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

  return (
    <>
      <Card sx={{ backgroundColor: "#d1c0fd", p: 3, boxShadow: "none" }}>
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
                color: "#6245af",
              }}
            >
              Attendance
            </Typography>
            <Typography
              sx={{
                fontWeight: "semi-bold",
                fontFamily: "poppins",
                fontWeight: 500,
                color: "#6245af",
              }}
            >
              OverAll
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 15,
                  width: 15,
                  borderRadius: "100%",
                  backgroundColor: "#00cd00",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#6245af",
                }}
              >
                OverAll 78% Attendance
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 15,
                  width: 15,
                  borderRadius: "100%",
                  backgroundColor: "#FFFF00",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#6245af",
                }}
              >
                12% Attendance Remaining
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  height: 15,
                  width: 15,
                  borderRadius: "100%",
                  backgroundColor: "#FF0000",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#6245af",
                }}
              >
                10% Days Absent
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
    </>
  );
};

export default AttendanceCard;
