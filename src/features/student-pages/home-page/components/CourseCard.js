import { Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { Card } from "@mui/material";
const CourseCard = () => {
  const options = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    series: [72],
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
      <Card sx={{ backgroundColor: "#FFE7DA", p: 3,boxShadow:'none' }}>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid xs={12}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "poppins", color: "black" }}
            >
              Course Progress
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img
              src="https://cdn.pixabay.com/photo/2024/04/17/14/55/girl-8702264_1280.png"
              height={100}
              alt="course"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>Course</Typography>
            <Typography>156 Class</Typography>
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

export default CourseCard;
