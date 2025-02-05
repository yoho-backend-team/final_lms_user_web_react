import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery, Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

const CourseStudentDetails = ({ feesdata, isPaymentPending }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));
    const [feesData, setFeesData] = useState({ fees: [], totalAmount: 0 });
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

    console.log(feesData, "feesData");


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
        doc.text(`GST Tax: 1,800.00 INR`, 20, 90);
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
    console.log(selectedFee, "selectedFee", feesData);

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                        Course Details
                    </Typography>
                    <Box sx={{ borderBottom: "1px solid #ccc", mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Box
                                sx={{
                                    display: "flex",
                                    border: "1px solid #C3C3C3",
                                    borderRadius: "20px",
                                    background: "#FFF",
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "40%",
                                        backgroundImage: `url(${feesData?.course?.image ? getImageUrl(feesData?.course?.image) : imagePlaceholder})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                                <Box sx={{ p: 2, flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 400 }}>
                                        {feesData?.course?.course_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#000", mb: 1 }}>
                                        {feesData?.fees?.[0]?.institute_id?.institute_name}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <img src={hours} alt="hours" style={{ width: "10px", height: "10px", marginRight: "5px" }} />
                                        <Typography variant="body2">
                                            {feesData?.course?.duration}hrs
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Rating rating={feesData?.course?.starrating || 0} />
                                        <Typography variant="body2" sx={{ color: "#009919", fontWeight: 800 }}>
                                            ₹ {feesData?.course?.actual_price.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                        Fees Details
                    </Typography>
                    <Box sx={{ borderBottom: "1px solid #ccc", mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                    Student: {getStudentDetails()?.full_name}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                    Category: {feesData?.course?.course_name}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                    Enrolled date: {formatDate(feesData?.fees?.[0]?.createdAt)}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold", color: "blue" }}>Description</TableCell>
                                            <TableCell sx={{ fontWeight: "bold", color: "blue" }} align="right">Amount (INR)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Tuition Amount</TableCell>
                                            <TableCell align="right">{feesData?.course_fees} INR</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Software Cost</TableCell>
                                            <TableCell align="right">13,000.00 INR</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>GST Tax</TableCell>
                                            <TableCell align="right">1,800.00 INR</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Paid Amount</TableCell>
                                            <TableCell align="right">{feesData?.totalAmount} INR</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Pending</TableCell>
                                            <TableCell align="right" sx={{ color: "#F00" }}>
                                                ₹{feesData?.pending_payment} INR
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                <Button
                                    variant="text"
                                    sx={{ textDecoration: "underline", color: "#0051C8" }}
                                    onClick={handleDownloadPDF1}
                                >
                                    Download Receipt
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={5}>

<<<<<<< HEAD
                   {/* <div
=======
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
            <TableCell align="right">{feesData?.course_fees} INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Software Cost</TableCell>
            <TableCell align="right">13,000INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GST Tax</TableCell>
            <TableCell align="right">1,800.00INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paid Amount</TableCell>
            <TableCell align="right">{feesData?.totalAmount}INR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pending</TableCell>
            <TableCell align="right" sx={{ color: "#F00" }}>
              {feesData?.pending_payment}INR
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
>>>>>>> f1fdffa403f4d683a368d37c0ebba640023d203b
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
        enable={!isPaymentPending}
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
<<<<<<< HEAD
            </div> */}
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Payment History
                    </Typography>
                    <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    View PDF
                                </Typography>
                                {feesData?.payment_history?.map((item) => (
                                    item.paid_amount > 0 && (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                p: 2,
                                                mb: 2,
                                                borderRadius: "9px",
                                                background: "linear-gradient(90deg, #6380E6 0%, #00C9C0 100%)",
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {formatDate(item.payment_date)}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleClickOpen(item)}
                                                sx={{
                                                    background: "#CFE3FF",
                                                    color: "#0D6EFD",
                                                    borderRadius: "54px",
                                                }}
                                            >
                                                View PDF
                                            </Button>
                                        </Box>
                                    )
                                ))}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Pay Due
                                </Typography>
                                {feesData?.payment_history?.map((item) => (
                                    item.balance > 0 && (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                p: 2,
                                                mb: 2,
                                                borderRadius: "9px",
                                                background: "linear-gradient(90deg, #FFD1D1 0%, #FF4D4D 100%)",
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {formatDate(item.duepaymentdate)}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => navigateToPaymentPage(item.id)}
                                                sx={{
                                                    background: "#FFD1D1",
                                                    color: "#FF4D4D",
                                                    borderRadius: "54px",
                                                }}
                                            >
                                                Pay Due
                                            </Button>
                                        </Box>
                                    )
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: 'none' }}>
                <div ref={invoiceRef}>
                    <InvoiceReceipt feesdata={feesData} />
                </div>
=======
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
                maxHeight: "600px",
                overflowY: "auto",
                paddingRight: "15px",
              }}
            >
              <Grid container Spacing={2}>
                 {feesData?.payment_history?.map((item) =>(
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                     <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '20px 25px 15px 10px',
            
              borderBottom: '2px solid #ccc',
              borderRadius: '18px',
              background: 'linear-gradient(90deg, #6380E6 0%, #00C9C0 100%)',
            }}
          >
           <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
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
>>>>>>> f1fdffa403f4d683a368d37c0ebba640023d203b
            </Box>

            <InvoiceModal open={open} onClose={handleClose} feeData={selectedFee} />
        </Box>
    );
};

export default CourseStudentDetails;