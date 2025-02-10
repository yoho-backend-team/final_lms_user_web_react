import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getImageUrl } from 'utils/common/imageUtlils';

const PdfViewer = ({ open, handleViewClose, pdf }) => {
  const pdfUrl = pdf?.file ? getImageUrl(pdf.file) : null;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleViewClose}
      aria-labelledby="pdf-view-dialog"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleViewClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                title="PDF Viewer"
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <Typography variant="body1" color="error">
                No PDF file available
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;