import React, { useState } from 'react';
import { Box, Grid, Typography, Collapse, Card, CardContent, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

// Sample category data
const categoryData = [
  {
    title: 'Course Management',
    description: 'Learn how to manage your courses effectively.',
    relatedAnswers: [
      'You can create, edit, and delete courses.',
      'Track student progress and manage assignments easily.',
    ],
  },
  {
    title: 'User  Management',
    description: 'Manage users and their roles within the platform.',
    relatedAnswers: [
      'Add new users and assign roles.',
      'View user activity and performance.',
    ],
  },
  {
    title: 'Payment Processing',
    description: 'Understand how to handle payments.',
    relatedAnswers: [
      'Set up payment methods and manage transactions.',
      'View payment history and generate reports.',
    ],
  },
  {
    title: 'Attendance Tracking',
    description: 'Keep track of student attendance.',
    relatedAnswers: [
      'Mark attendance for each class session.',
      'Generate attendance reports for analysis.',
    ],
  },
  {
    title: 'Course Materials',
    description: 'Manage learning materials for your courses.',
    relatedAnswers: [
      'Upload documents, videos, and other resources.',
      'Organize materials by subject or module.',
    ],
  },
];

const ExpandableCard = styled(Card)(({ theme }) => ({
  marginBottom: '10px',
  transition: '0.3s',
  '&:hover': {
    boxShadow: theme.shadows[5],
  },
}));

const InstructorCategoryList = () => {
  const [expanded, setExpanded] = useState(null);
  const [showRelatedAnswers, setShowRelatedAnswers] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
    setShowRelatedAnswers(null); // Reset related answers when toggling categories
  };

  const handleRelatedToggle = (index) => {
    setShowRelatedAnswers(showRelatedAnswers === index ? null : index);
  };

  return (
    <Box sx={{ 
      padding: '20px', 
      backgroundColor: '#E0E4F4', 
      borderRadius: '8px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', // Ensures the box takes full height of the viewport
    }}>
      <Box sx={{ maxWidth: '800px', width: '100%', }}>
        <Typography variant="h4" gutterBottom align="center" color="#3f51b5">
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {categoryData.map((category, index) => (
            <Grid item xs={12} key={index}>
              <ExpandableCard>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    cursor: 'pointer',
                    backgroundColor: expanded === index ? '#e0e7ff' : 'white',
                    borderRadius: '8px',
                  }}
                  onClick={() => handleToggle(index)}
                >
                  <Typography variant="h6" color="#3f51b5">
                    {category.title}
                  </Typography>
                  <ExpandMoreIcon color="action" />
                </Box>
                <Collapse in={expanded === index}>
                  <CardContent>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      {category.description}
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                      <Typography variant="body2" onClick={() => handleRelatedToggle(index)} sx={{ cursor: 'pointer', color: '#3f51b5' }}>
                        {showRelatedAnswers === index ? 'Hide Related Answers' : 'Show Related Answers'}
                      </Typography>
                      <Collapse in={showRelatedAnswers === index}>
                        {category.relatedAnswers.map((answer, answerIndex) => (
                          <Chip
                            key={answerIndex}
                            label={answer}
                            variant="outlined"
                            sx={{ marginTop: 1, marginRight: 1, backgroundColor: '#e0f7fa' }}
                          />
                        ))}
                      </Collapse>
                    </Box>
                  </CardContent>
                </Collapse>
              </ExpandableCard>
            </Grid>
          ))}
        </Grid>
        {/* Centered Box Below FAQ */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="#3f51b5">
            Need more help?
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            If you have any further questions, feel free to reach out to our support team.
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Chip label="Contact Support" variant="outlined" sx={{ backgroundColor: '#e0f7fa' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorCategoryList;