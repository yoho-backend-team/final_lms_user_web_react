import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomPagination = ({ totalPages,currentPage,setCurrentPage,updateActivitys }) => {
  

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      await updateActivitys({page:currentPage - 1})
    }
  };

  const handleNext = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      await updateActivitys({ page : currentPage + 1 })
    }
  };

  return (
    <Box sx={{ 
         display: "flex", justifyContent: "flex-end", pr: "35px", alignItems : "center"
    }}>
      <Button
        variant="text"
        color="primary"
        onClick={handlePrevious}
        sx={{ color: currentPage === 1 ? "#9F9F9F" : "#5611B1",fontSize:"15px",fontWeight:700,lineHeight:"24px",":hover":{background:"none"}}}
        disabled={currentPage === 1}
        startIcon={<ArrowBackIosIcon sx={{ height: "24px", width: "24px"}} />}
      >
         Previous
      </Button>
      <Button
        variant="text"
        color="primary"
        sx={{ color: currentPage === totalPages ? "#9F9F9F" : "#5611B1",fontSize:"15px",fontWeight:700,lineHeight:"24px",":hover":{background:"none"},":focus":{ background: "none"}}}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        endIcon={<ArrowForwardIosIcon sx={{ height: "24px", width: "24px"}} />}
      >
        Next 
      </Button>
      <Box sx={{ textAlign: "center" }} >
      <Typography variant="body1" sx={{ margin: '0 16px', color : "#9F9F9F", fontSize: "14px", fontWeight: 700 }}>
        {`Page ${currentPage} of ${totalPages}`}
      </Typography>
      </Box>
    </Box>
  );
};

export default CustomPagination
