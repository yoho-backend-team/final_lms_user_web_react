import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
// import Chart from "react-apexcharts";
import { Card, Box, Button } from "@mui/material";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { Link } from "react-router-dom";

const PaymentsCard = () => {
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
      <Card sx={{ boxShadow: "none" }}>
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
            sx={{
              display: "flex",
              backgroundColor: "#a2cc8f",
              borderRadius: "0px 0px 0px 0px",
              padding: 3,
            }}
          >
            <Grid xs={6} sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "poppins",
                  color: "black",
                }}
              >
                Payments
              </Typography>
            </Grid>
            <Grid xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "poppins",
                  color: "black",
                }}
              >
                1 month pending
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box>
                  <Avatar
                    sx={{ backgroundColor: "#6dc853", width: 25, height: 25 }}
                  >
                    <CurrencyRupeeRoundedIcon fontSize="small" />
                  </Avatar>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    Payment Pending for April
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: 400,
                        fontSize: 12,
                      }}
                    >
                      Amount to pay :
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                          fontWeight: 600,
                          color: "#6dc853",
                        }}
                      >
                        16,000
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography component={Link} color="secondary">
                  Check Payment
                </Typography>
                <Button color="secondary" size="medium" variant="contained">
                  Pay now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PaymentsCard;
