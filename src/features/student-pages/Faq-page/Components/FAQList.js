import React from 'react';
import { Grid, Paper, List, Typography, Box } from '@mui/material';
import FAQItem from './FAQItem';

const FAQList = ({ faqs, category,selectedCategory  }) => {
  console.log(faqs, "faqs = []");
  console.log(category, "category = []");
  console.log(selectedCategory, "selectedCategory = []");

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
            <Typography variant="h3" color="gray" sx={{ p: 2 }}>
              Select category Whats You Want.
            </Typography>
          )}
        </List>
      </Paper>
    </Grid>
  );
};

export default FAQList;
