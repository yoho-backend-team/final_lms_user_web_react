import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import wallet from "../.../../../../../assets/images/icons/wallet.svg";
import time from "../.../../../../../assets/images/icons/time.svg";
import pending from "../.../../../../../assets/images/icons/pending.svg";
import status from "../.../../../../../assets/images/icons/status.svg";
import paymentmeth from "../.../../../../../assets/images/icons/pay method.svg";
import courseImage from "../../../../assets/images/dummy/course.jpg";
import hours from "../.../../../../../assets/images/icons/hours.svg";
import Rating from "../components/Rating";
import courseduration from "../.../../../../../assets/images/icons/courseduration.svg";
import pdfgroup from "../.../../../../../assets/images/icons/pdfgroup.svg";
import { getStudentFees } from "../services";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import { formatDate } from "utils/formatDate";
import { getStudentDetails } from "store/atoms/authorized-atom";

const Payment = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const [feesData, setFeesData] = useState([{ fees: [], totalAmount: 0 }]);

  //dummy
  const ratingValue = 4;

  useEffect(() => {
    const fetchStudentFees = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesData(details);
      console.log(details);
    };

    fetchStudentFees();
  }, []);

  const data = [
    { id: 1, text: "Apr 23", type: "pending" },
    { id: 2, text: "Mar 23", type: "bill receipt" },
    { id: 3, text: "Feb 23", type: "bill receipt" },
    { id: 1, text: "Apr 23", type: "bill receipt" },
    { id: 3, text: "Feb 23" },
    { id: 1, text: "Apr 23" },
    { id: 2, text: "Mar 23" },
    { id: 3, text: "Feb 23" },
    { id: 1, text: "Apr 23" },
    { id: 2, text: "Mar 23" },
    { id: 3, text: "Feb 23" },
  ];

  console.log(feesData, "feesData");

  return (
    <div className="main-container">
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid container>
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
              Payment
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ textAlign: isXs ? "left" : "right" }}
          >
            <Typography
              variant="body1"
              component={Link}
              to="/student/create-ticket"
              style={{
                color: "#0D6EFD",
                fontFamily: "Nunito Sans",
                fontSize: isXs ? "14px" : "16px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: isXs ? "20px" : "22px",
                textDecorationLine: "underline",
              }}
            >
              Raise A Ticket ?
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#495057",
                fontFamily: "Nunito Sans",
                fontSize: isXs ? "10px" : "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: isXs ? "20px" : "24px",
              }}
            >
              For any Queries, Please Raise your Ticket
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Box
              p={2}
              border={1}
              borderRadius={2}
              textAlign="center"
              sx={{
                borderRadius: "10px",
                border: "1px solid #C3C3C3",
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "207px",
                height: "80px",
                padding: "12px 20px",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={wallet}
                  alt="wallet"
                  style={{
                    width: "24px",
                    height: "24px",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    color: "#495057",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  Course Fees
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#000",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                {feesData?.course_fees}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Box
              p={2}
              border={1}
              borderRadius={2}
              textAlign="center"
              sx={{
                borderRadius: "10px",
                border: "1px solid #C3C3C3",
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "207px",
                height: "80px",
                padding: "12px 20px",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={time}
                  alt="time"
                  style={{
                    width: "24px",
                    height: "24px",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    color: "#495057",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  Amount Paid
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#009028",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                {feesData?.totalAmount}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Box
              p={2}
              border={1}
              borderRadius={2}
              textAlign="center"
              sx={{
                borderRadius: "10px",
                border: "1px solid #C3C3C3",
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "207px",
                height: "80px",
                padding: "12px 20px",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={pending}
                  alt="pending"
                  style={{
                    width: "24px",
                    height: "24px",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    color: "#495057",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  Pending Payment
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#F00",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                ₹{feesData?.pending_payment}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Box
              p={2}
              border={1}
              borderRadius={2}
              textAlign="center"
              sx={{
                borderRadius: "10px",
                border: "1px solid #C3C3C3",
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "207px",
                height: "80px",
                padding: "12px 20px",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={status}
                  alt="status"
                  style={{
                    width: "24px",
                    height: "24px",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    color: "#495057",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  Status
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#000",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                {feesData?.payment_status}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Box
              p={2}
              border={1}
              borderRadius={2}
              textAlign="center"
              sx={{
                borderRadius: "10px",
                border: "1px solid #C3C3C3",
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "207px",
                height: "80px",
                padding: "12px 20px",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={paymentmeth}
                  alt="paymentmeth"
                  style={{
                    width: "24px",
                    height: "24px",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    color: "#495057",
                    fontFamily: "Nunito Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  Payment Method
                </Typography>
              </Box>
              <Typography
                variant="body1"
                component={Link}
                to="/student/create-ticket"
                sx={{
                  color: "#0D6EFD",
                  fontFamily: "Nunito Sans",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "24px",
                  textDecoration: "none",
                }}
              >
                Online
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={7}>
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
              Course Details
            </Typography>
            <Grid item xs={12} sm={7}>
              <hr style={{ borderTop: "1px solid #ccc", width: "auto" }} />
            </Grid>
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
                          marginRight: "-10px",
                        }}
                      >
                        ₹ 5,800
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Rating rating={ratingValue} />
                        <span
                          style={{
                            fontFamily: "Nunito Sans",
                            fontSize: "13px",
                            fontWeight: "350",
                            fontStyle: "normal",
                            marginLeft: "-20px",
                          }}
                        >
                          ( 2,387 )
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
                          ₹ {feesData?.course?.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box
                  p={2}
                  textAlign="center"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "207px",
                    height: "80px",
                    padding: "12px 20px",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={courseduration}
                      alt="courseduration"
                      style={{
                        width: "24px",
                        height: "24px",
                        alignItems: "center",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        marginLeft: "10px",
                        color: "#000",
                        fontFamily: "Nunito Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 700,
                      }}
                    >
                      Course Durations
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#000",
                      fontFamily: "Nunito Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    {feesData?.course?.duration}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
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
                  Fees Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <hr style={{ borderTop: "1px solid #ccc", width: "auto" }} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    padding: "0 30px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                      }}
                    >
                      Student:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        marginLeft: "-2px",
                      }}
                    >
                      {getStudentDetails()?.full_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                      }}
                    >
                      Category:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        marginLeft: "-2px",
                      }}
                    >
                      {feesData?.course?.course_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                      }}
                    >
                      Enrolled date:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        marginLeft: "-2px",
                      }}
                    >
                      {formatDate(feesData?.course?.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <hr style={{ borderTop: "1px solid #ccc", width: "auto" }} />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 30px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      Tuition Amount
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {feesData?.course_fees} INR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      Software Cost
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      13,000.00 INR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      GST Tax
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      1800.00 INR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      Paid Amount
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {feesData?.totalAmount} INR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#495057",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      Pending
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#F00",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      ₹{feesData?.pending_payment} INR
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component={Link}
                      to="/student/create-ticket"
                      sx={{
                        color: "#0051C8",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "22px",
                        textDecorationLine: "underline",
                      }}
                    >
                      Download receipt
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                  Pending Payment
                </Typography>
                <Button
                  component={Link}
                  to="/student/pay"
                  variant="contained"
                  style={{
                    width: "212px",
                    backgroundColor: "#0D6EFD",
                    color: "white",
                    textDecoration: "none",
                    display: "inline-flex",
                    flexDirection: "row",
                    padding: "9px 24px",
                    gap: "8px",
                    boxShadow: "0px 6px 34px -8px #0D6EFD",
                    borderRadius: "8px",
                  }}
                >
                  Pay Full Payment
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    {formatDate(feesData?.course?.updatedAt)}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#495057",
                      textAlign: "right",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                      marginTop: "10px",
                    }}
                  >
                    for full payment click the above button
                  </Typography>
                </div>
              </div>
            </div>
            <Typography
              variant="body1"
              style={{
                color: "#495057",
                fontFamily: "Nunito Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "24px",
                paddingTop: "10px",
              }}
            >
              Monthly
            </Typography>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "15px",
              }}
            >
              <Grid container spacing={2}>
                {data?.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {
                        <img
                          src={pdfgroup}
                          alt="Logo"
                          style={{
                            width: "15px",
                            height: "19px",
                            marginRight: "10px",
                          }}
                        />
                      }
                      <Typography
                        variant="body1"
                        style={{
                          flex: 1,
                          color: "#495057",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "40px",
                        }}
                      >
                        {item.text}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          flex: 1,
                          color: item.type === "pending" ? "#AAA" : "#495057",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontStyle:
                            item.type === "pending" ? "italic" : "normal",
                          fontWeight: item.type === 400,
                          lineHeight: "40px",
                        }}
                      >
                        {item.type}
                      </Typography>

                      <Typography
                        variant="body1"
                        component={Link}
                        to="/student/create-ticket"
                        sx={{
                          display: "inline-flex",
                          padding: "9px 24px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "54px",
                          border: "1px solid var(--Gray-300, #DEE2E6)",
                          background: "#CFE3FF",
                          color: "#0D6EFD",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "22px",
                          textDecoration: "none",
                        }}
                      >
                        View
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
