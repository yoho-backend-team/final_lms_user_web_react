import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Dialog, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { getImageUrl } from 'utils/common/imageUtlils';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ open, handleViewClose, pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const pdfUrl = getImageUrl(pdf?.file);

  return (
    <Dialog fullScreen open={open} onClose={handleViewClose} aria-labelledby="pdf-viewer">
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleViewClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        {pdfUrl ? (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={12} sx={{ mb: 4, mt: 1.5 }}>
              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setLoading(false);
                }}
                onLoadError={(error) => {
                  console.error("PDF Load Error:", error);
                  setLoading(false);
                }}
              >
                {loading && <CircularProgress />}
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </Grid>
          </Grid>
        ) : (
          <p style={{ textAlign: 'center', color: 'red' }}>Invalid or missing PDF file.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
