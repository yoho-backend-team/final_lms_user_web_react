import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PaymentMethodIcon from 'assets/icons/paymentMethodIcon';

const InvoiceReceipt = forwardRef(({ feesdata = {} }, ref) => { // Default value for feesdata
  useImperativeHandle(ref, () => ({
    generatePDF: () => {
      const input = document.getElementById('invoiceReceipt');
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('invoice-receipt.pdf');
      });
    }
  }));

  // Ensure feesdata is treated as an array where needed
  const feesArray = Array.isArray(feesdata.fees) ? feesdata.fees : [];
  const courseArray = Array.isArray(feesdata) ? feesdata : [];

  return (
    <Box ref={ref} id="invoiceReceipt" sx={{ width: '100%', margin: '0 auto', padding: 4, border: '1px solid #ccc', fontFamily: 'Poppins', height: "842px" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
        <img src="/path/to/logo.png" alt="Logo" style={{ height: '50px' }} />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h6" color="black" align="center" gutterBottom>
            Bill Invoice / Receipt
          </Typography>
          <Box display="flex" alignItems="flex-start" marginBottom={2}>
            <PaymentMethodIcon />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              width="100%"
              marginTop={1}
            >
              <Typography>Email: marketplace@edutech.in</Typography>
              <Typography>Contact: 09096431662</Typography>
              <Typography>Website: www.marketplace.com</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Box>
          {feesArray.map((item, index) => (
            <div key={index}>
              <Typography variant="h6">Student Details</Typography>
              <Typography>Name: {item?.student?.full_name}</Typography>
              <Typography>Student ID: {item?.student?.id}</Typography>
              <Typography>Mail ID: {item?.student?.email}</Typography>
              <Typography>Contact: {item?.student?.contact_info?.phone_number}</Typography>
            </div>
          ))}
        </Box>

        <Box>
          {courseArray.map((item, index) => (
            <div key={index}>
              <Typography variant="h6">Course Details</Typography>
              <Typography>{item?.course?.course_name}</Typography>
              <Typography>By {item?.fees?.institute_id?.institute_name}</Typography>
              <Typography>Duration: {item?.duration?.duration}</Typography>
            </div>
          ))}
        </Box>
        <Box>
          <Typography variant="h6">Fees Details</Typography>
          <Typography>{feesdata?.course_fees}</Typography>
          <Typography>Pending: {feesdata?.pending_payment}</Typography>
          <Typography>Paid: {feesdata?.course_fees - feesdata?.pending_payment}</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        {feesArray.map((item, index) => (
          <div key={index}>
            <Typography variant="h6">Paid Amount</Typography>
            <Typography>{item?.paid_amount}</Typography>
            <Typography>{item?.paid_amount}</Typography>
          </div>
        ))}
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Type</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Other Tax</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Cash / Online</TableCell>
              <TableCell>Payment Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{feesdata?.fees?.payment_method}</TableCell>
              <TableCell>{feesdata?.gst}</TableCell>
              <TableCell>{feesdata?.other_tax}</TableCell>
              <TableCell>{feesdata?.course_fees}</TableCell>
              <TableCell>{feesdata?.fees?.payment_method}</TableCell>
              <TableCell>{feesdata?.fees?.payment_method}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Typography>Status:</Typography>
        <Box sx={{ padding: '10px 20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: 1 }}>
          Payment Success
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Typography>Signature:</Typography>
        <img src="/path/to/signature.png" alt="Signature" style={{ height: '50px' }} />
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: 4, fontSize: 12, color: '#666' }}>
        <Typography>All Rights Reserved @2024 Regulations</Typography>
      </Box>
    </Box>
  );
});

export default InvoiceReceipt;
