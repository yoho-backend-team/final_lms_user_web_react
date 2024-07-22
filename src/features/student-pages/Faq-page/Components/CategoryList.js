import React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import ClassIcon from '@mui/icons-material/Class';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';

const CategoryList = ({ categories, onCategorySelect }) => {
    const getCategoryIcon = (categoryTitle) => {
        switch (categoryTitle.toLowerCase()) {
          case 'mail':
            return <MailIcon />;
          case 'profile':
            return <PersonIcon />;
          case 'password':
            return <LockIcon />;
          case 'Login&SignUp':
            return <LoginIcon />;
          case 'classes':
            return <ClassIcon />;
          case 'attendance':
            return <EventIcon />;
          case 'payment':
            return <PaymentIcon />;
          default:
            return null;
        }
      };
      console.log(categories,"faqCategories?.category_id?")
  return (
    <Box>
    {categories?.map((category, index) => (
    <Grid item xs={12} p={1}>
      <Box sx={{ minWidth:"300px", padding: "14px 28px", backgroundColor:"white",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', }} >
      
        <Box sx={{ display: "flex",flexDirection:"center" , gap:"20px",textAlign:'center'}} 
         onClick={() => onCategorySelect(category)} >
            {/* <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>
              {getCategoryIcon(category.title)}
            </ListItemIcon> */}
           <Typography sx={{ color: "black",fontSize:"20px",fontWeight:600, fontFamily:"Poppins"}} >{category?.category_id?.category_name}</Typography> 
          
           
        </Box>
        <Typography sx={{ color: "gray",fontSize:"14px",fontWeight:400 ,fontFamily:"Poppins"}} >{category?.category_id?.description}</Typography>
      </Box>
    </Grid>
    ))}
    </Box>
    
  );
};

export default CategoryList;
