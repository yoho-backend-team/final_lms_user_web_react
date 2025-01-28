import { Avatar, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card, Box, Button } from "@mui/material";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { Link } from "react-router-dom";
import { getStudentFees } from "features/student-pages/payments-page/services";

const PaymentsCard = () => {

  const [feesData, setFeesData] = useState([{ fees: [], totalAmount: 0 }]);
  
  useEffect(() => {
    const fetchStudentFees = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesData(details);
    };

    fetchStudentFees();
  }, []);

 
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
              backgroundColor: "#97D79D",
              borderRadius: "0px 0px 0px 0px",
              padding:{ xs: 1.5, sm: 2.3 }, 
              fontweight:"900",
            }}
          >
            <Grid xs={6} sx={{ display: "flex", justifyContent: "start" }}>
            <Typography
                variant="h5"
                sx={{
                  color: '#047C0F',          
                  fontFamily: 'Nunito Sans', 
                  fontSize: 20,              
                  fontStyle: 'normal',
                  fontWeight: 900,
                  lineHeight: 'normal',     
                }}
              >
                Payments
              </Typography>

            </Grid>
            <Grid xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <Typography
                variant="subtitle2"
                sx={{
                  color: '#2C6831',         
                  textAlign: 'right',      
                  fontFamily: 'Work Sans', 
                  fontSize: { xs: 12, sm: 14 },            
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',   
                }}
              >
                1 month pending
              </Typography>

            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: { xs: 2, sm: 3 } }}> 
              <Box sx={{ display: "flex",flexDirection: { xs: "column", sm: "row" },  gap: 2, mb: 2 }}>
                <Box>
                  <Avatar
                    sx={{ backgroundColor: "#038400",width: { xs: 16, sm: 20 },
                    height: { xs: 16, sm: 20 },  }} >
                    <CurrencyRupeeRoundedIcon fontSize="small" />
                  </Avatar>
                </Box>

                <Box>
                <Typography
                    sx={{
                      color: 'var(--Colour-Neutral-1, #000)',  
                      fontFamily: 'Poppins',  
                       fontSize: { xs: 14, sm: 16 }, 
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Payment Pending for April
                  </Typography>
                  <Box sx={{ display: "flex",flexDirection: { xs: "column", sm: "row" }, gap: 1, mt: 0.5 }}>
                  <Typography
                      sx={{
                        color: 'var(--Colour-Neutral-1, #696969)', 
                        fontFamily: 'Poppins', 
                         fontSize: { xs: 12, sm: 14 }, 
                        fontStyle: 'normal',
                        fontWeight: 300,
                        lineHeight: 'normal', 
                      }}
                    >
                      Amount to pay :
                    </Typography>

                    <Typography
                      sx={{
                        color: 'var(--Colour-Neutral-1, #03A400)', 
                        fontFamily: 'Poppins', 
                        fontSize: '14px', 
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal', 
                      }}
                    >
                      {feesData?.pending_payment}
                    </Typography>

                  </Box>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  component={Link}
                  to="/student/Payments"
                  color="#0D6EFD"
                  fontFamily="Inter"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight={500}
                  lineHeight="normal"
                  textDecoration="underline"
                >
                  Check Payment
                </Typography>
                <Button
                    component={Link}
                    to="/student/payment/pay"
                    sx={{
                      display: 'inline-flex',         
                      padding: '5px',                
                      justifyContent: 'center',     
                      alignItems: 'center',          
                      gap: '10px',                    
                      borderRadius: '12px',          
                      backgroundColor: '#0D6EFD',    
                      color: '#FFF',                
                      fontFamily: 'Poppins',         
                      fontSize: '17px',              
                      fontStyle: 'normal',          
                      fontWeight: 300,            
                      textTransform: 'none',       
                      '&:hover': {
                        backgroundColor: '#0056b3', 
                      },
                    }}
                  >
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
