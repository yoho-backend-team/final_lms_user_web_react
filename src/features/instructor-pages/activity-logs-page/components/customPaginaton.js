import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomPagination = ({ totalPages, currentPage, setCurrentPage, updateActivitys }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = async (newPage) => {
    setIsTransitioning(true); // Start fade effect
    setCurrentPage(newPage);
    await updateActivitys({ page: newPage });
    setIsTransitioning(false); // End fade effect
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", pr: "35px", alignItems: "center" }}>
      <Button
        variant="text"
        color="primary"
        onClick={handlePrevious}
        sx={{
          color: currentPage === 1 ? "#9F9F9F" : "#5611B1",
          fontSize: "15px",
          fontWeight: 700,
          lineHeight: "24px",
          ":hover": { background: "none" }
        }}
        disabled={currentPage === 1}
        startIcon={<ArrowBackIosIcon sx={{ height: "24px", width: "24px" }} />}
      >
        Previous
      </Button>

      {/* Page Number Display with Fade Transition */}
      <Box
        sx={{
          textAlign: "center",
          transition: "opacity 0.2s ease-in-out", // Faster transition
          opacity: isTransitioning ? 0.5 : 1
        }}
      >
        <Typography variant="body1" sx={{ margin: '0 16px', color: "#9F9F9F", fontSize: "14px", fontWeight: 700 }}>
          {`Page ${currentPage} of ${totalPages}`}
        </Typography>
      </Box>

      <Button
        variant="text"
        color="primary"
        sx={{
          color: currentPage === totalPages ? "#9F9F9F" : "#5611B1",
          fontSize: "15px",
          fontWeight: 700,
          lineHeight: "24px",
          ":hover": { background: "none" },
          ":focus": { background: "none" }
        }}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        endIcon={<ArrowForwardIosIcon sx={{ height: "24px", width: "24px" }} />}
      >
        Next
      </Button>
    </Box>
  );
};

export default CustomPagination;
