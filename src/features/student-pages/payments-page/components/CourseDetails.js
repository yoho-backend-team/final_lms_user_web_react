import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { getStudentFees } from "../services";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

// Image imports
import hours from "../.../../../../../assets/images/icons/hours.svg";
import courseduration from "../.../../../../../assets/images/icons/courseduration.svg";
import pdfgroup from "../.../../../../../assets/images/icons/pdfgroup.svg";

// Utility imports
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import { formatDate } from "utils/formatDate";
import { getStudentDetails } from "store/atoms/authorized-atom";

// Component imports
import Rating from "../components/Rating";
import InvoiceReceipt from "./InvoiceReceipt";
import InvoiceModal from "./InvoiceModal";

// PDF handling
import { jsPDF } from "jspdf";
import html2pdf from 'html2pdf.js';

const CourseStudentDetails = () => {
  // Hooks and state
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const navigate = useNavigate();
  const invoiceRef = useRef();
  
  const [feesData, setFeesData] = useState([{ fees: [], totalAmount: 0 }]);
  const [open, setOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // Fetch student fees on component mount
  useEffect(() => {
    const fetchStudentFees = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesData(details);
    };

    fetchStudentFees();
  }, []);

  // Navigation handler
  const navigateToPaymentPage = () => {
    navigate(`/student/payment/pay`);
  };

  // PDF handlers
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add course details
    doc.text("Course Details", 20, 10);
    doc.text(`Course Name: ${feesData?.course?.course_name}`, 20, 20);
    doc.text(`Institute: Rajalakshmi Institute`, 20, 30);
    doc.text(`Duration: ${feesData?.course?.duration}`, 20, 40);
    doc.text(`Price: ₹${feesData?.course?.price}`, 20, 50);
    
    // Add fees details
    doc.text("Fees Details", 20, 60);
    doc.text(`Tuition Amount: ${feesData?.course_fees} INR`, 20, 70);
    doc.text(`Software Cost: 13,000.00 INR`, 20, 80);
    doc.text(`GST Tax: 1800.00 INR`, 20, 90);
    doc.text(`Paid Amount: ${feesData?.totalAmount} INR`, 20, 100);
    doc.text(`Pending: ₹${feesData?.pending_payment} INR`, 20, 110);
    
    doc.save("receipt.pdf");
  };

  const handleDownloadPDF1 = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: 'invoice-receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Modal handlers
  const handleClickOpen = (fee) => {
    setSelectedFee(fee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFee(null);
  };

  // Typography styles
  const sectionTitleStyle = {
    color: "#151010",
    fontFamily: "Nunito Sans",
    fontSize: isXs ? "18px" : "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: isXs ? "26px" : "32px",
    paddingBottom: "16px"
  };

  const subtitleStyle = {
    color: "#495057",
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
    paddingBottom: "8px"
  };

  console.log(feesData,"feesData")
  return (
    <>
      <Grid container spacing={2} sx={{ p: 3 }}>
        {/* Left Column - Course & Fee Details */}
        <Grid item xs={12} sm={7}>
          {/* Course Details Section */}
          <Typography variant="body1" style={sectionTitleStyle}>
            Course Details
          </Typography>
          
          <Grid item xs={12} sm={7}>
            <hr style={{ borderTop: "1px solid #ccc", width: "auto" }} />
          </Grid>
          
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} sm={8}>
              <Grid item xs={12} sm={6} md={6} lg={2.4}>
                {/* Course Card */}
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
                    marginBottom: "20px",
                  }}
                >
                  {/* Course Image */}
                  <Box
                    sx={{
                      width: "40%",
                      height: "100%",
                      display: "flex",
                      backgroundImage: "cover",
                      backgroundAttachment: "fixed",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      overflow: "hidden"
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
                        maxWidth: "100%"
                      }}
                    />
                  </Box>

                  {/* Course Details */}
                  <Box
                    sx={{
                      justifyContent: "left",
                      paddingLeft: "10px",
                      paddingTop: "10px"
                    }}
                  >
                    {/* Course Name */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#000",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        textAlign: "left"
                      }}
                    >
                      {feesData?.course?.course_name}
                    </Typography>
                    
                    {/* Institute Name */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#000",
                        fontFamily: "Nunito Sans",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        textAlign: "left"
                      }}
                    >
                      {feesData?.fees?.[0]?.institute_id?.institute_name}
                    </Typography>
                    
                    {/* Duration */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "5px"
                      }}
                    >
                      <img
                        src={hours}
                        alt="hours"
                        style={{
                          width: "9.841px",
                          height: "9.841px",
                          marginRight: "5px"
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
                          lineHeight: "9.841px"
                        }}
                      >
                        {feesData?.course?.duration}
                      </Typography>
                    </Box>
                    
                    {/* MRP */}
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
                        marginLeft: "159px"
                      }}
                    >
                      {feesData?.course?.mrp?.toLocaleString()}
                    </Typography>
                    
                    {/* Rating and Price */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt:"10px"
                      }}
                    >
                      <Rating rating={feesData?.course?.starrating || 0} />
                      <span
                        style={{
                          fontFamily: "Nunito Sans",
                          fontSize: "13px",
                          fontWeight: "350",
                          fontStyle: "normal",
                          marginLeft: "-20px"
                        }}
                      >
                        {/* ( {feesData?.course?.ratingnumber?.toLocaleString()} ) */}
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
                          marginRight: "-10px"
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

          {/* Fees Details Section */}
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" style={sectionTitleStyle}>
                Fees Details
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <hr style={{ borderTop: "1px solid #ccc", width: "auto" }} />
            </Grid>
            
            {/* Student Information Row */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  padding: "0 30px"
                }}
              >
                {/* Student Name */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#495057",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 700
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
                      marginLeft: "-2px"
                    }}
                  >
                    {getStudentDetails()?.full_name}
                  </Typography>
                </Box>
                
                {/* Category */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#495057",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 700
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
                      marginLeft: "-2px"
                    }}
                  >
                    {feesData?.course?.course_name}
                  </Typography>
                </Box>
                
                {/* Enrolled Date */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#495057",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 700
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
                      marginLeft: "-2px"
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

            {/* Fee Details Table */}
            <Grid item xs={12}>
              <Box sx={{ padding: "0 30px" }}>
                <TableContainer component={Paper} sx={{ margin: "0 30px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell 
                          sx={{ 
                            fontWeight: "bold", 
                            color: "blue", 
                            fontFamily: "Nunito Sans" 
                          }}
                        >
                          Description
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: "bold", 
                            color: "blue", 
                            fontFamily: "Nunito Sans" 
                          }} 
                          align="right"
                        >
                          Amount (INR)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Tuition Amount</TableCell>
                        <TableCell align="right">{feesData?.course_fees} INR</TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>Software Cost</TableCell>
                        <TableCell align="right">13,000.00 INR</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>GST Tax</TableCell>
                        <TableCell align="right">1,800.00 INR</TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell align="right">{feesData?.totalAmount} INR</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pending</TableCell>
                        <TableCell align="right" sx={{ color: "#F00" }}>
                          {feesData?.pending_payment} INR
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Download Receipt Button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2
                  }}
                >
                  <Button
                    variant="body1"
                    sx={{
                      color: "#0051C8",
                      fontFamily: "Nunito Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      mr:"-30px",
                      textDecorationLine: "underline"
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

        {/* Right Column - Payment History */}
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Typography
            variant="body1"
            style={{
              ...subtitleStyle,
              paddingTop: "10px",
              marginBottom: '5px'
            }}
          >
            Payment History
          </Typography>
          
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "15px"
            }}
          >
            <Grid container spacing={3}>
              {/* Section for Viewing PDFs */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  View PDF
                </Typography>
                
                {feesData?.payment_history?.map((item) => (
                  item.paid_amount > 0 && (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                        borderRadius: "9px",
                        background: "linear-gradient(90deg, #6380E6 0%, #00C9C0 100%)",
                        marginBottom: 2
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginBottom: "10px", 
                        width: "100%",
                      }}>
                        <img
                          src={pdfgroup}
                          alt="Logo"
                          style={{
                            width: '15px',
                            height: '19px',
                            marginRight: '10px'
                          }}
                        />
                        <Typography
                          variant="body1"
                          style={{
                            flex: 1,
                            color: "#495057",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "40px"
                          }}
                        >
                          {formatDate(item.payment_date)}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="a"
                          onClick={() => handleClickOpen(item)}
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
                            fontWeight: 500,
                            lineHeight: "22px",
                            textDecoration: "none",
                            cursor: "pointer",
                            marginLeft: "10px"
                          }}
                        >
                          View PDF
                        </Typography>
                      </Box>
                    </Box>
                  )
                ))}
              </Grid>

              {/* Section for Paying Dues */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Pay Due
                </Typography>
                
                {feesData?.payment_history?.map((item) => (
                  item.balance > 0 && (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                        borderRadius: "9px",
                        background: "linear-gradient(90deg, #FFD1D1 0%,#FF4D4D 100%)",
                        marginBottom: 2
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginBottom: "10px",
                        width: "100%" 
                      }}>
                        <Typography
                          variant="body1"
                          style={{
                            flex: 1,
                            color: "#495057",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "40px"
                          }}
                        >
                          {formatDate(item.duepaymentdate)}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="a"
                          onClick={() => navigateToPaymentPage(item.id)}
                          sx={{
                            display: "inline-flex",
                            padding: "9px 24px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "54px",
                            border: "1px solid var(--Gray-300, #DEE2E6)",
                            background: "#FFD1D1",
                            color: "#FF4D4D",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                            textDecoration: "none",
                            cursor: "pointer",
                            marginLeft: "10px"
                          }}
                        >
                          Pay Due
                        </Typography>
                      </Box>
                    </Box>
                  )
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Hidden Invoice Element for PDF Generation */}
      <div style={{ display: 'none' }}>
        <div ref={invoiceRef}>
          <InvoiceReceipt feesdata={feesData} />
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal 
        open={open} 
        onClose={handleClose} 
        feeData={selectedFee} 
      />
    </>
  );
};

export default CourseStudentDetails;