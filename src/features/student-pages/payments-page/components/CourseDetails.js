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
    paddingBottom: "16px",
    marginTop: "10px"
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

  // Divider style
  const dividerStyle = {
    borderTop: "1px solid #E0E0E0",
    width: "100%",
    margin: "10px 0 20px 0"
  };

  console.log(feesData, "feesData");
  
  return (
    <>
      <Grid container spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
        {/* Left Column - Course & Fee Details */}
        <Grid item xs={12} md={7} sx={{ mb: { xs: 3, md: 0 } }}>
          {/* Course Details Section */}
          <Typography variant="body1" style={sectionTitleStyle}>
            Course Details
          </Typography>
          
          <hr style={dividerStyle} />
          
          <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
            <Box
              p={2}
              sx={{
                borderRadius: "20px",
                border: "1px solid #E0E0E0",
                background: "#FFF",
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
                height: "96px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                mb: 3,
                overflow: "hidden"
              }}
            >
              {/* Course Image */}
              <Box
                sx={{
                  width: "38%",
                  height: "96px",
                  display: "flex",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  margin: "-8px 0 -8px -8px"
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
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>

              {/* Course Details */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  pl: 2,
                  py: 1,
                  height: "100%"
                }}
              >
                {/* Course Name */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#000",
                    fontFamily: "Nunito Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "18px",
                    textAlign: "left",
                    mb: 0.5
                  }}
                >
                  {feesData?.course?.course_name}
                </Typography>
                
                {/* Institute Name */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    fontFamily: "Nunito Sans",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "16px",
                    textAlign: "left",
                    mb: 0.5
                  }}
                >
                  {feesData?.fees?.[0]?.institute_id?.institute_name}
                </Typography>
                
                {/* Bottom Row: Duration, Rating, Price */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  {/* Duration */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={hours}
                      alt="hours"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginRight: "5px"
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        fontFamily: "Nunito Sans",
                        fontSize: "12px",
                        fontWeight: 400
                      }}
                    >
                      {feesData?.course?.duration}hrs
                    </Typography>
                  </Box>
                  
                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating rating={feesData?.course?.starrating || 0} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Nunito Sans",
                        fontSize: "12px",
                        fontWeight: 400,
                        ml: 0.5
                      }}
                    >
                      ({feesData?.course?.ratingnumber?.toLocaleString()})
                    </Typography>
                  </Box>
                  
                  {/* Price */}
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
<<<<<<< HEAD
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
=======
                      variant="body2"
>>>>>>> 3b0b1a47c6e2cedb9e576b79b1ae736a7efee0c4
                      sx={{
                        color: "#474747",
                        fontFamily: "Nunito Sans",
                        fontSize: "12px",
                        fontWeight: 400,
                        textDecoration: "line-through",
                        mb: 0.5
                      }}
                    >
<<<<<<< HEAD
                      {feesData?.course?.mrp?.toLocaleString()}
=======
                      ₹{feesData?.course?.mrp?.toLocaleString()}
>>>>>>> 3b0b1a47c6e2cedb9e576b79b1ae736a7efee0c4
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
<<<<<<< HEAD
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
=======
                        color: "#009919",
                        fontFamily: "Nunito Sans",
                        fontSize: "14px",
                        fontWeight: 700
                      }}
                    >
                      ₹{feesData?.course?.actual_price?.toLocaleString()}
                    </Typography>
>>>>>>> 3b0b1a47c6e2cedb9e576b79b1ae736a7efee0c4
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Fees Details Section */}
          <Typography variant="body1" style={sectionTitleStyle}>
            Fees Details
          </Typography>
          
          <hr style={dividerStyle} />
          
          {/* Student Information Row */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              px: { xs: 1, sm: 3 },
              py: 2,
              gap: 2
            }}
          >
            {/* Student Name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#495057",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
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
                  fontWeight: 400
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
                gap: 1
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#495057",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
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
                  fontWeight: 400
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
                gap: 1
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#495057",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
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
                  fontWeight: 400
                }}
              >
                {formatDate(feesData?.fees?.[0]?.createdAt)}
              </Typography>
            </Box>
          </Box>

          <hr style={dividerStyle} />

<<<<<<< HEAD
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
=======
          {/* Fee Details Table */}
          <Box sx={{ px: { xs: 1, sm: 3 }, mb: 3 }}>
            <TableContainer 
              component={Paper} 
              sx={{ 
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f7f9fc' }}>
                    <TableCell 
                      sx={{ 
                        fontWeight: "700", 
                        color: "#0051C8", 
                        fontFamily: "Nunito Sans",
                        py: 1.5
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: "700", 
                        color: "#0051C8", 
                        fontFamily: "Nunito Sans",
                        py: 1.5
                      }} 
                      align="right"
                    >
                      Amount (INR)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ py: 1.5 }}>Tuition Amount</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>{feesData?.course_fees} INR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 1.5 }}>Software Cost</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>13,000.00 INR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 1.5 }}>GST Tax</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>1,800.00 INR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 1.5 }}>Paid Amount</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>{feesData?.totalAmount} INR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 1.5, fontWeight: 600 }}>Pending</TableCell>
                    <TableCell 
                      align="right" 
                      sx={{ 
                        color: "#F00", 
                        fontWeight: 600,
                        py: 1.5
                      }}
                    >
                      ₹{feesData?.pending_payment} INR
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
                mt: 2
              }}
            >
              <Button
                variant="text"
                sx={{
                  color: "#0051C8",
                  fontFamily: "Nunito Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "underline",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 81, 200, 0.05)'
                  }
                }}
                onClick={handleDownloadPDF1}
              >
                Download Receipt
              </Button>
            </Box>
          </Box>
>>>>>>> 3b0b1a47c6e2cedb9e576b79b1ae736a7efee0c4
        </Grid>

        {/* Right Column - Payment History */}
        <Grid item xs={12} md={5}>
          <Box 
            sx={{ 
              backgroundColor: '#f9fbff', 
              borderRadius: '12px',
              p: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              height: '100%'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#151010",
                fontFamily: "Nunito Sans",
                fontSize: "18px",
                fontWeight: 700,
                mb: 3
              }}
            >
              Payment History
            </Typography>
            
            <Box
              sx={{
                maxHeight: "400px",
                overflowY: "auto",
                pr: 1,
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '6px',
                }
              }}
            >
              {/* Section for Viewing PDFs */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#333' 
                }}
              >
                View PDF
              </Typography>
              
              {feesData?.payment_history?.some(item => item.paid_amount > 0) ? (
                feesData?.payment_history?.map((item) => (
                  item.paid_amount > 0 && (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "linear-gradient(90deg, #6380E6 0%, #00C9C0 100%)",
                        boxShadow: "0 2px 8px rgba(99, 128, 230, 0.2)",
                        mb: 2
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        width: "100%",
                        justifyContent: "space-between"
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={pdfgroup}
                            alt="Logo"
                            style={{
                              width: '18px',
                              height: '22px',
                              marginRight: '12px'
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#FFF",
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: 500
                            }}
                          >
                            {formatDate(item.payment_date)}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => handleClickOpen(item)}
                          sx={{
                            padding: "6px 16px",
                            borderRadius: "20px",
                            background: "rgba(255, 255, 255, 0.9)",
                            color: "#0D6EFD",
                            fontFamily: "Poppins",
                            fontSize: "13px",
                            fontWeight: 500,
                            '&:hover': {
                              background: "rgba(255, 255, 255, 1)",
                            }
                          }}
                        >
                          View PDF
                        </Button>
                      </Box>
                    </Box>
                  )
                ))
              ) : (
                <Typography sx={{ mb: 3, color: '#666', fontStyle: 'italic' }}>
                  No payment records available
                </Typography>
              )}

              {/* Section for Paying Dues */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  mt: 4,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#333' 
                }}
              >
                Pay Due
              </Typography>
              
              {feesData?.payment_history?.some(item => item.balance > 0) ? (
                feesData?.payment_history?.map((item) => (
                  item.balance > 0 && (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "linear-gradient(90deg, #FFD1D1 0%, #FF4D4D 100%)",
                        boxShadow: "0 2px 8px rgba(255, 77, 77, 0.2)",
                        mb: 2
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        width: "100%",
                        justifyContent: "space-between"
                      }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#FFF",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: 500
                          }}
                        >
                          Due: {formatDate(item.duepaymentdate)}
                        </Typography>
                        <Button
                          onClick={() => navigateToPaymentPage(item.id)}
                          sx={{
                            padding: "6px 16px",
                            borderRadius: "20px",
                            background: "rgba(255, 255, 255, 0.9)",
                            color: "#FF4D4D",
                            fontFamily: "Poppins",
                            fontSize: "13px",
                            fontWeight: 500,
                            '&:hover': {
                              background: "rgba(255, 255, 255, 1)",
                            }
                          }}
                        >
                          Pay Due
                        </Button>
                      </Box>
                    </Box>
                  )
                ))
              ) : (
                <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
                  No pending payments
                </Typography>
              )}
            </Box>
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
