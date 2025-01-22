import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import hours from "../../../../../assets/images/icons/hours.svg";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import { getStudentFees } from "../../services";
import PaymentMethod from "./PaymentMethod";
import Verify from "./Verify";
import Rating from "../Rating";

const Payment = ({activeStep}) => {

  const isXs = false;
  const [feesData, setFeesData] = useState("");



  
  useEffect(() => {
    const fetchStudentFees = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesData(details);
    };

    fetchStudentFees();
  }, []);


  return (
      <Grid container spacing={2} sx={{ p: 3, pr:8, pl: 8 }}>   
     <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              style={{
                color: "#151010",
                fontFamily: "Nunito Sans",
                fontSize: isXs ? "18px" : "24px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: isXs ? "26px" : "32px",
              }}
            >
              Course Purchased
            </Typography>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={8}>
              <Grid item xs={12} sm={6} md={6} lg={2.4}>
                  <Box
                    p={2}
                    border={1}
                    borderRadius={2}
                    textAlign="center"
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid #C3C3C3",
                      background: "#FFF",
                      display: "flex",
                      alignItems: "left",
                      width: "372.434px",
                      height: "96.515px",
                      justifyContent: "left",
                      flexShrink: 0,
                      padding: "none !important",
                    }}
                  >
                    <Box
                      sx={{
                        width: "40%",
                        height: "100%",
                        display: "flex",
                        backgroundImage: "cover",
                        backgroundAttachment: "fixed",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          feesData?.course?.image
                            ? getImageUrl(feesData?.course?.image)
                            : imagePlaceholder
                        }
                        alt={feesData?.course?.course_name || "course_name"}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "100%",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        justifyContent: "left",
                        paddingLeft: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#000",
                          fontFamily: "Nunito Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          textAlign: "left",
                        }}
                      >
                        {feesData?.course?.course_name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#000",
                          fontFamily: "Nunito Sans",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          textAlign: "left",
                        }}
                      >
                      {feesData?.fees?.[0]?.institute_id?.institute_name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "5px",
                        }}
                      >
                        <img
                          src={hours}
                          alt="hours"
                          style={{
                            width: "9.841px",
                            height: "9.841px",
                            marginRight: "5px",
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#000",
                            fontFamily: "Nunito Sans",
                            fontSize: "13px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "9.841px",
                          }}
                        >
                          {feesData?.course?.duration}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#474747",
                          fontFamily: "Nunito Sans",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "9.841px",
                          textDecoration: "line-through",
                          textAlign: "right",
                          marginRight: "-16px",
                          marginLeft: "159px",
                        }}
                      >
                        ₹ {feesData?.course?.mrp.toLocaleString()}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                       <Rating rating={feesData?.course?.starrating || 0} />
                        <span
                          style={{
                            fontFamily: "Nunito Sans",
                            fontSize: "13px",
                            fontWeight: "350",
                            fontStyle: "normal",
                            marginLeft: "-20px",
                          }}
                        >
                          ( {feesData?.course?.ratingnumber.toLocaleString()} )
                        </span>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#009919",
                            fontFamily: "Nunito Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 800,
                            lineHeight: "9.841px",
                            paddingTop: "5px",
                            marginRight: "-10px",
                          }}
                        >
                          ₹ {feesData?.course?.current_price.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ pt: 3}}> 
              <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography
                    variant="body1"
                    style={{
                    color: "#151010",
                    fontFamily: "Nunito Sans",
                    fontSize: isXs ? "18px" : "24px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: isXs ? "26px" : "32px",
                    marginRight: '10px',
                    minWidth:'fit-content'
                    }}
                >
                    Payment Type:
                </Typography>
                <Typography
                    variant='body1'
                    style={{
                    color: 'var(--Colour-Neutral-1, #878787)',
                    fontFamily: 'Nunito Sans',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '33px',
                    minWidth:'fit-content'
                    }}
                >
                    Full Payment
                </Typography>
                </div>
                {/* <Typography
                    variant="body1"
                    style={{
                    color: "#151010",
                    fontFamily: "Nunito Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "25px",
                    paddingTop:'15px'
                    }}
                >
                    8 Months
                </Typography>
                <Typography
                    variant="body1"
                    style={{
                    color: "#717171",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    }}
                >
                    2024
                </Typography> */}
                <Typography
                    variant="body1"
                    style={{
                    color: "#151010",
                    fontFamily: "Nunito Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "25px",
                    paddingTop:'26px',
                    marginBottom:'20px'
                    }}
                >
                    Amount to pay
                </Typography>
                <div style={{
                display: 'inline-flex',
                padding: '20px 43px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                border: '2px solid #A7D7B4',
                background: '#E4F4E3',
                }}>
                <Typography variant="body1" style={{ color: '#038D00', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 700 }}>
                {feesData?.pending_payment} INR
                </Typography>
                </div>
                </Grid>
                </Grid>
            
             </Grid>

          </Grid>

          <Grid item xs={12} sm={6}>
        
          {activeStep === 0 && ( 
            <>    
          <PaymentMethod />
          </> 
         )}
        {activeStep === 1 && (
            <>
            <Verify />      
            </>
        )}     
         </Grid>
        </Grid>

  );
};

export default Payment;