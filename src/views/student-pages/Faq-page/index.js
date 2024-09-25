import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import Layout from '../../../features/student-pages/Faq-page/Components/Layout';
import CategoryList from '../../../features/student-pages/Faq-page/Components/CategoryList';
import FAQList from '../../../features/student-pages/Faq-page/Components/FAQList';
import Client from "../../../api/index";

const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [faqCategories, setFaqCategories] = useState([]);

  useEffect(() => {
    const fetchFaqCategories = async () => {
      try {
        const response = await Client.Student.faq.get();
        setFaqCategories(response?.data || []);
      } catch (error) {
        console.error("Error fetching FAQ categories:", error.message);
      }
    };

    fetchFaqCategories();
  }, []);


  const categories = [
    { title: 'Mail',description:'Details Submitted Mail' },
  { title: 'Profile' ,description:'Details Profile'},
  { title: 'Classes',description:'Class Details' },
  { title: 'Password' ,description:'Password Change Details'},
  { title: 'Attendance',description:'Attendance Details' },
  { title: 'Payment',description:'Payment Details' },
  { title: 'Login&SignUp',description:'Login&SignUp Up Details' }
];

  const faqs = {
    'Mail': [
      { question: 'What is Mail?', answer: 'Mail is...' },
      { question: 'Mail Related Questions?', answer: 'Yes, Google is...' },
      
    ],
    'Profile': [
      { question: 'How do I will Update Profile Page', answer: 'In Right Side End...' },
      
    ],
    'Classes': [
      { question: 'How do I will check my updating classes', answer: 'Check your Dashboard' },
      
    ],
    'Password': [
      { question: 'How do I will Update Password', answer: 'Click Forgot Password get otp on your updated mail' },
      
    ],
    'Payment': [
      { question: 'Check my remaining balance payment', answer: 'Login Dashbooard go to payment section' },
      
    ],
    'Attendance': [
      { question: 'How do I will Update Attendance', answer: 'Create ticket and sent to instructor...' },
      
    ],
    'Login&SignUp': [
      { question: 'How do I will Update Login Details', answer: 'Give Forgot Password to Update Details' },
      
    ],

    
  };
  const handleCategorySelect = (faqCategories) => {
    setSelectedCategory(faqCategories);        
  };
  

  return (
    <Layout>
       <Grid item xs={12}>
          <Typography variant="h2" gutterBottom align="center" sx={{fontSize:"32px",fontFamily:"poppins",color:"black"}}>
          <QuestionAnswerIcon sx={{gap:"10px", width:"100px",}} />
            Frequently Asked Questions   
          </Typography>
        </Grid>
      <Grid container xs={12} spacing={3}>
        <Grid item xs={4}  sx={{gap:"10px"}}>
          <CategoryList categories={faqCategories}  onCategorySelect={handleCategorySelect} />
        </Grid>
        <Grid item xs={7} >
          <FAQList  selectedCategory={selectedCategory} faqs={faqCategories} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FAQPage;
