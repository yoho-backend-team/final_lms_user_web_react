import React from 'react';
import { Grid, Paper, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import FAQItem from './FAQItem';

const FAQList = ({ faqs ,category}) => {
   console.log(faqs,"faqs = []")
   console.log(category,"category = []")


  return (
    <>
    <Grid item xs={12}  >
      <Box >
        <>
         <Typography variant="h4" color="balck" sx={{gap:"10px", p:1}}>{category?.category_id?.category_name}</Typography>
         <Typography variant="h5" color="gray">{category?.category_id?.description}</Typography>
         </>
        
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
