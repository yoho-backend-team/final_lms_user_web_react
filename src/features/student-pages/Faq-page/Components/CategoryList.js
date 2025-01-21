// import React from 'react';
// import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
// import MailIcon from '@mui/icons-material/Mail';
// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import LoginIcon from '@mui/icons-material/Login';
// import ClassIcon from '@mui/icons-material/Class';
// import EventIcon from '@mui/icons-material/Event';
// import PaymentIcon from '@mui/icons-material/Payment';

// const CategoryList = ({ categories, onCategorySelect }) => {
//     const getCategoryIcon = (categoryTitle) => {
//         switch (categoryTitle.toLowerCase()) {
//           case 'mail':
//             return <MailIcon />;
//           case 'profile':
//             return <PersonIcon />;
//           case 'password':
//             return <LockIcon />;
//           case 'Login&SignUp':
//             return <LoginIcon />;
//           case 'classes':
//             return <ClassIcon />;
//           case 'attendance':
//             return <EventIcon />;
//           case 'payment':
//             return <PaymentIcon />;
//           default:
//             return null;
//         }
//       };
      

//       const uniqueCategories = categories.reduce((acc, current) => {
//         const category = acc.find(item => item.category_id.category_name === current.category_id.category_name);
//         if (!category) {
//           acc.push(current);
//         }
//         return acc;
//       }, []);


//   return (
//     <Box>
//     {uniqueCategories?.map((category, index) => (
//     <Grid item xs={12} p={1}>
//       <Box sx={{ minWidth:"300px", padding: "14px 28px", backgroundColor:"#bdbdbd",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',cursor:"pointer" ,borderRadius: "16px"}} >
      
//         <Box sx={{ display: "flex",flexDirection:"center" , gap:"20px",textAlign:'center', gap:"10px"}} 
//          onClick={() => onCategorySelect(category)} >
//             {/* <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>
//               {getCategoryIcon(category.title)}
//             </ListItemIcon> */}
//            <Typography sx={{ color: "black",fontSize:"20px",fontWeight:600, fontFamily:"Poppins",gap:"10px"}} >{category?.category_id?.category_name}</Typography> 
          
           
//         </Box>
//         <Typography sx={{ color: "gray",fontSize:"14px",fontWeight:400 ,fontFamily:"Poppins"}} >{category?.category_id?.description}</Typography>
//       </Box>
//     </Grid>
//     ))}
    
//     </Box>
    
//   );
// };


// import React, { useState } from 'react';
// import { Button, Grid, Box } from '@mui/material';

// const CategoryList = ({ categories, onCategorySelect }) => {
//   const [selectedFilter, setSelectedFilter] = useState('All');

//   const handleFilterClick = (filter) => {
//     setSelectedFilter(filter);
//     onCategorySelect(filter);
//   };

//   const categoryNames = categories?.map(category => category.category_id.category_name) || [];
//   const uniqueFilters = Array.from(new Set(['All', ...categoryNames]));

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12}>
//           <Box display="flex" justifyContent="center" paddingLeft={100} paddingTop={-10}>
//             {uniqueFilters.map((filter) => (
//               <Button
//                 key={filter}
//                 variant={selectedFilter === filter ? 'contained' : 'outlined'}
//                 onClick={() => handleFilterClick(filter)}
//                 sx={{ margin: '0 5px' }}
//               >
//                 {filter}
//               </Button>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CategoryList;




import React, { useState } from 'react';
import { Box, Typography, Grid, Collapse, Chip, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const faqData = [
  {
    title: 'Introduction',
    description: 'Thanks for your interest in teaching your courses through Payil.',
    relatedAnswers: [
      'Payil is designed to help you manage your courses effectively.',
      'You can track student progress and manage assignments easily.',
    ],
  },
  {
    title: 'How to access Payil?',
    description: 'Way To Access Sign Up\nWay To Access Login In',
    relatedAnswers: [
      'Visit the Payil website and click on Sign Up.',
      'If you already have an account, click on Login.',
    ],
  },
  {
    title: 'About Payil Dashboard',
    description: 'Dashboard feature allows the admin/owner to view the registration, ...',
    relatedAnswers: [
      'The dashboard provides an overview of all registered users.',
      'You can manage courses and view analytics from the dashboard.',
    ],
  },
  {
    title: 'About Payil Courses',
    description: 'Each course comprises subjects with their learning materials and assignments.',
    relatedAnswers: [
      'Courses can be customized with various subjects.',
      'You can add assignments and track student submissions.',
    ],
  },
  {
    title: 'How to access Payil Subject',
    description: 'In the subject listing page you View / create the subjects for the respective...',
    relatedAnswers: [
      'Navigate to the Subjects section in the dashboard.',
      'You can create new subjects or edit existing ones.',
    ],
  },
  {
    title: 'How to add a new course to the dashboard?',
    description: 'In the add course page, Add a thumbnail image for your course...',
    relatedAnswers: [
      'Fill in the course details and upload a thumbnail image.',
      'Once added, the course will be visible on the dashboard.',
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

const CategoryList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Box sx={{ 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', // Ensures the box takes full height of the viewport
    }}>
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" color="#3f51b5">
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {faqData.map((faq, index) => (
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
                    {faq.title}
                  </Typography>
                  <ExpandMoreIcon color="action" />
                </Box>
                <Collapse in={expanded === index}>
                  <CardContent>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      {faq.description}
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                      {faq.relatedAnswers.map((answer, answerIndex) => (
                        <Chip
                          key={answerIndex}
                          label={answer}
                          variant="outlined"
                          sx={{ marginTop: 1, marginRight: 1, backgroundColor: '#e0f7fa' }}
                        />
                      ))}
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
            <Chip  label="Contact Support" variant="outlined" sx={{ backgroundColor: '#e0f7fa' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryList;



//https://payil.app/FAQ/
