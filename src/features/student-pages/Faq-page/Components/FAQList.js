import React from 'react';
import { Grid, Paper, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import FAQItem from './FAQItem';

const FAQList = ({ faqs ,category}) => {
   console.log(faqs,"faqs = []")
  return (
    <>
    <Grid item xs={12}  >
      <Box >
         <Typography variant="h4" color="balck" sx={{gap:"10px"}}>{category?.title}</Typography>
         <Typography variant="h5" color="gray">{category?.description}</Typography>
      </Box>
      <Paper>
        <List>
        {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
                   
          
        </List>
      </Paper>
    </Grid>
    </>
  );
};

export default FAQList;
