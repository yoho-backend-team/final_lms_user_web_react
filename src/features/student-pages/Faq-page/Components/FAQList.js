import React from 'react';
import { Grid, List, Typography, Box } from '@mui/material';
import FAQItem from './FAQItem';

const FAQList = ({ faqs, selectedCategory }) => {
  // Safety check for selectedCategory and default to 'All'
  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => Array.isArray(faq.access) && faq.access.includes(selectedCategory));

  return (
    <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
       
      </Box>
      
      <List>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))
        ) : (
          <Typography>
            
          </Typography>
        )}
      </List>
    </Grid>
  );
};

export default FAQList;
