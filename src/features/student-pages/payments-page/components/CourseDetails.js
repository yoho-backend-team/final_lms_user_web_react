
import React, { useEffect, useRef, useState  } from "react";
import { Box, Button, Grid, Typography, useMediaQuery,Table,Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { getStudentFees } from "../services";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import hours from "../.../../../../../assets/images/icons/hours.svg";
import Rating from "../components/Rating";
import courseduration from "../.../../../../../assets/images/icons/courseduration.svg";
import pdfgroup from "../.../../../../../assets/images/icons/pdfgroup.svg";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import { formatDate } from "utils/formatDate";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { jsPDF } from "jspdf";
import InvoiceReceipt from "./InvoiceReceipt";
import html2pdf from 'html2pdf.js';
import InvoiceModal from "./InvoiceModal";
import { useNavigate } from 'react-router-dom';

const CourseStudentDetails = (feesdata,isPaymentPending) => {

    const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const [feesData, setFeesData] = useState([{ fees: [], totalAmount: 0 }]);
  const invoiceRef = useRef();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedFee, setSelectedFee] = useState(null);



  useEffect(() => {
    const fetchStudentFees = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesData(details);
    };

    fetchStudentFees();
  }, []);

  const navigateToPaymentPage = () => {
    
    navigate(`/student/payment/pay`);
  };

console.log(feesData,"feesData")

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
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
   
    doc.text("Course Details", 20, 10);
    doc.text(`Course Name: ${feesData?.course?.course_name}`, 20, 20);
    doc.text(`Institute: Rajalakshmi Institute`, 20, 30);
    doc.text(`Duration: ${feesData?.course?.duration}`, 20, 40);
    doc.text(`Price: ₹${feesData?.course?.price}`, 20, 50);

    doc.text("Fees Details", 20, 60);
    doc.text(`Tuition Amount: ${feesData?.course_fees} INR`, 20, 70);
    doc.text(`Software Cost: 13,000.00 INR`, 20, 80);
    doc.text(`GST Tax: 1800.00 INR`, 20, 90);
    doc.text(`Paid Amount: ${feesData?.totalAmount} INR`, 20, 100);
    doc.text(`Pending: ₹${feesData?.pending_payment} INR`, 20, 110);

    doc.save("receipt.pdf");
  };

  const handleClickOpen = (fee) => {
    setSelectedFee(fee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFee(null);
  };

  const handleDownloadPDF1 = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: 'invoice-receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };


  console.log(selectedFee,"selectedFee",feesData)

  return (
    <>
    <Grid container spacing={2} sx={{ p: 3}}>
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
                          {feesData?.course?.duration}hrs
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
                          ₹ {feesData?.course?.actual_price.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
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
                      {formatDate(feesData?.fees?.[0]?.createdAt)}
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
      padding: "0 30px",
    }}
  >
    <TableContainer component={Paper} sx={{ margin: "0 30px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "blue", fontFamily: "Nunito Sans" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "blue", fontFamily: "Nunito Sans" }} align="right">Amount (INR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Tuition Amount</TableCell>
            <TableCell align="right">{feesData?.course_fees}81200 INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Software Cost</TableCell>
            <TableCell align="right">13,000.00INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GST Tax</TableCell>
            <TableCell align="right">1,800.00INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paid Amount</TableCell>
            <TableCell align="right">{feesData?.totalAmount}86,000INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pending</TableCell>
            <TableCell align="right" sx={{ color: "#F00" }}>
              ₹{feesData?.pending_payment}16000INR
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 2,
      }}
    >
      <Button
        variant="body1"
        sx={{
          color: "#0051C8",
          fontFamily: "Nunito Sans",
          fontSize: "14px",
          fontWeight: 600,
          textDecorationLine: "underline",
        }}
        onClick={handleDownloadPDF1}
      >
        Download Receipt
      </Button>
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
        {isPaymentPending ? "Pending Payment" : "Payment Completed"}
      </Typography>
      <Button
        component={Link}
        to="/student/payment/pay"
        variant="contained"
        style={{
          width: "212px",
          backgroundColor: isPaymentPending ? "#0D6EFD" : "#d3d3d3",
          color: isPaymentPending ? "white" : "#666",
          textDecoration: "none",
          display: "inline-flex",
          flexDirection: "row",
          padding: "9px 24px",
          gap: "8px",
          boxShadow: isPaymentPending ? "0px 6px 34px -8px #0D6EFD" : "none",
          borderRadius: "8px",
        }}
        disabled={!isPaymentPending} // Disable the button if payment is completed
      >
        Payment
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
                    Last Updated:{formatDate(feesData?.fees?.[feesData.fees.length - 1]?.updatedAt)}                    
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
                    For payment click the above button
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
                marginBottom:'5px'
              }}
            >
              Payment History
            </Typography>
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "15px",
              }}
            >
              <Grid container Spacing={1}>
                 {feesData?.payment_history?.map((item) =>(
                  <Grid item xs={12}>
                     <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              borderRadius: '9px',
              background: 'linear-gradient(90deg, #6380E6 0%, #00C9C0 100%)',
            }}
          >
           <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src={pdfgroup}
              alt="Logo"
              style={{
                width: '15px',
                height: '19px',
                marginRight: '10px',
              }}
            />
            <Typography
              variant="body1"
              style={{
                flex: 1,
                color: '#495057',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '40px',
              }}
            >
              {formatDate(item.payment_date)}
            </Typography>
            
            <Typography
              variant="body1"
              style={{
                flex: 1,
                color: '#495057',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '40px',
              }}
            >
              {formatDate(item.duepaymentdate)}
            </Typography>
            <Typography
              variant="body1"
              style={{
                flex: 1,
                color: item.type === 'pending' ? '#AAA' : '#495057',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: item.type === 'pending' ? 'italic' : 'normal',
                fontWeight: item.type === 'pending' ? 400 : 500,
                lineHeight: '40px',
              }}
            >
               Bill Receipt
            </Typography>
            </Box>

            {/* Display paid and pending amount details */}
            {item.paid_amount > 0 && (
              <Typography
                variant="body1"
                style={{
                  flex: 1,
                  color: '#28A745',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Paid: ₹{item.paid_amount}
              </Typography>
            )}
            {feesData.balance > 0 && (
              <Typography
                variant="body1"
                style={{
                  flex: 1,
                  color: '#FF4D4D',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Pending: ₹{feesData.pending_payment}
              </Typography>
            )}
 
 <Grid container spacing={1} style={{ marginTop: '10px' }}>
          {item.paid_amount > 0 && (
            <Grid item>
              <Typography
                variant="body1"
                component="a"
                onClick={() => handleClickOpen(item)}
                sx={{
                  display: 'inline-flex',
                  padding: '9px 24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '54px',
                  border: '1px solid var(--Gray-300, #DEE2E6)',
                  background: '#CFE3FF',
                  color: '#0D6EFD',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                View PDF
              </Typography>
            </Grid>
          )}
          {item.balance > 0 && (
            <Grid item>
              <Typography
                variant="body1"
                component="a"
                onClick={() => navigateToPaymentPage(item.id)}
                sx={{
                  display: 'inline-flex',
                  padding: '9px 24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '54px',
                  border: '1px solid var(--Gray-300, #DEE2E6)',
                  background: '#FFD1D1',
                  color: '#FF4D4D',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Pay Due
              </Typography>
            </Grid>
          )}
        </Grid>
        </Box>

        {/* Invoice Modal to show paid details */}
        <InvoiceModal open={open} onClose={handleClose} feeData={feesData} />
      
        
                  </Grid>
                  
                 ))}
                 
              </Grid>
              <div style={{ display: 'none' }} >
              <div ref={invoiceRef}>
                      <InvoiceReceipt feesdata={feesData} />
                    </div>
              </div>
            </Box>
          </Grid>
        </Grid>
                      
                  </>
  )};

export default CourseStudentDetails;

