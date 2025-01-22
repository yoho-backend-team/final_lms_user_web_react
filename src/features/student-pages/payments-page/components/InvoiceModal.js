// InvoiceModal.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import InvoiceReceipt from './InvoiceReceipt'; // Update the import path as necessary

const InvoiceModal = ({ open, onClose, feesdata }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle></DialogTitle>
      <p>{feesdata?.paid_amount}</p>
      <DialogContent>
        <InvoiceReceipt feesdata={feesdata} />
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
