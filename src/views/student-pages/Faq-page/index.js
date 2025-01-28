import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
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

  const faqs = {
    'Mail': [
      { question: 'What is Mail?', answer: 'Mail is...' },
      { question: 'Mail Related Questions?', answer: 'Yes, Google is...' },
    ],
    'Profile': [
      { question: 'How do I update my Profile Page?', answer: 'In Right Side End...' },
    ],
    'Classes': [
      { question: 'How do I check my updating classes?', answer: 'Check your Dashboard' },
    ],
    'Password': [
      { question: 'How do I update my Password?', answer: 'Click Forgot Password to get OTP on your updated mail' },
    ],
    'Payment': [
      { question: 'How do I check my remaining balance payment?', answer: 'Login to Dashboard and go to payment section' },
    ],
    'Attendance': [
      { question: 'How do I update my Attendance?', answer: 'Create a ticket and send it to the instructor...' },
    ],
    'Login&SignUp': [
      { question: 'How do I update my Login Details?', answer: 'Use Forgot Password to update details' },
    ],
  };

  const handleCategorySelect = (faqCategories) => {
    setSelectedCategory(faqCategories);
  };

  return (
    <Layout>
      <Grid container xs={12} justifyContent="center">
        <Grid item xs={12}>
          <Typography 
            variant="h2" 
            gutterBottom align="center" 
            sx={{ 
              fontSize: "36px", 
              fontFamily: "Poppins, sans-serif", 
              color: "#3f51b5", 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: "10px", // Reduced margin-bottom
              mt: "-50px", // Added negative margin-top to move it upward
            }}
          >
            <QuestionAnswerIcon sx={{ gap: "10px", width: "50px", height: "50px", color: "#3f51b5" }} />
            FAQ
          </Typography>
        </Grid>
        <Grid container xs={12} spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CategoryList categories={faqCategories} onCategorySelect={handleCategorySelect} />
          </Grid>
          {/* Uncomment the following line to display the FAQList component */}
          {/* <Grid item xs={7}>
            <FAQList selectedCategory={selectedCategory} faqs={faqs} />
          </Grid> */}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FAQPage;