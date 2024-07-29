import React from 'react';
import { Grid, Paper, List, Typography, Box } from '@mui/material';
import FAQItem from './FAQItem';

const InstructorFAQList = ({ faqs, category,selectedCategory  }) => {
 

  const filteredFaqs = faqs.filter(faq => faq.category_id === category?.category_id);

  return (
    <Grid item xs={12}>
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <>
          <Typography variant="h4" color="black" sx={{ gap: "10px", p: 1 }}>
            {category?.category_id?.category_name}
          </Typography>
        </>
      </Box>
      <Paper>
        <List>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))
          ) : (
            <Typography variant="h6" color="gray" sx={{ p: 2 }}>
              No FAQs available for this category.
            </Typography>
          )}
        </List>
      </Paper>
    </Grid>
  );
};

export default InstructorFAQList;
