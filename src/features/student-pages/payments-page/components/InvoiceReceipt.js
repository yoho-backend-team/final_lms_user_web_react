import React, { forwardRef } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

const InvoiceReceipt = forwardRef((props, ref) => {
  return (
    <Box ref={ref} sx={{ width: '80%', margin: '0 auto', padding: 4, border: '1px solid #ccc', fontFamily: 'Poppins' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
        <img src="/path/to/logo.png" alt="Logo" style={{ height: '50px' }} />
        <Box>
          <Typography variant="h6">Bill Invoice / Receipt</Typography>
          <Typography>Email: marketplace@edutech.in</Typography>
          <Typography>Contact: 09096431662</Typography>
          <Typography>Website: www.marketplace.com</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Box>
          <Typography variant="h6">Student Details</Typography>
          <Typography>Name: Justine Dave M. Delos Reyes</Typography>
          <Typography>Student ID: Stu02311#</Typography>
          <Typography>Mail ID: student@marketplace@edutech.com</Typography>
          <Typography>Contact: 9857362898</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Course Details</Typography>
          <Typography>Java Full Professional Course</Typography>
          <Typography>By Rajalakshmi Institute</Typography>
          <Typography>Duration: 6 Months</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Fees Details</Typography>
          <Typography>₹1,00,000</Typography>
          <Typography>Pending: 16,600</Typography>
          <Typography>Paid: 84,000</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Paid Amount</Typography>
        <Typography>23 May 2024, 5:38pm</Typography>
        <Typography>₹23,000</Typography>
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
              <TableCell>Monthly</TableCell>
              <TableCell>1800.00</TableCell>
              <TableCell>200</TableCell>
              <TableCell>23,000</TableCell>
              <TableCell>Online</TableCell>
              <TableCell>Gpay</TableCell>
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
