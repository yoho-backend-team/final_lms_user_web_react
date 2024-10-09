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
import {Box, Button, Card, CardContent, Typography, Grid, Chip } from '@mui/material';


const faqData = [
  {
    title: 'Introduction',
    description: 'Thanks for your interest in teaching your courses through Payil.',
    roles: ['Owner'],
  },
  {
    title: 'How to access Payil?',
    description: 'Way To Access Sign Up\nWay To Access Login In',
    roles: ['Owner', 'Student'],
  },
  {
    title: 'About Payil Dashboard',
    description: 'Dashboard feature allows the admin/owner to view the registration, ...',
    roles: ['Owner', 'Admin', 'Staff', 'Student'],
  },
  {
    title: 'About Payil Courses',
    description: 'Each course comprises subjects with their learning materials and assignments.',
    roles: ['Owner', 'Admin'],
  },
  {
    title: 'How to access Payil Subject',
    description: 'In the subject listing page you View / create the subjects for the respective...',
    roles: ['Owner', 'Admin'],
  },
  {
    title: 'How to add a new course to the dashboard?',
    description: 'In the add course page, Add a thumbnail image for your course...',
    roles: ['Owner', 'Admin'],
  },
];


const CategoryList = ({ categories, onCategorySelect }) => {
  const [selectedRole, setSelectedRole] = useState('All');

  const categoryNames = categories?.map(category => category.category_id.category_name) || [];
 const uniqueFilters = Array.from(new Set(['All', ...categoryNames]));

  const filteredFAQs = selectedRole === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.roles.includes(selectedRole));

   console.log(categories,"categories")
  return (
    <div style={{ padding: '20px' }}>
      {/* Role Filter Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px',justifyContent:"center" ,paddingLeft:1000}}>
        {uniqueFilters.map((role) => (
          <Button 
            key={role}
            variant={selectedRole === role ? 'contained' : 'outlined'}
            onClick={() => setSelectedRole(role)}
            sx={{ 
              borderRadius: '1px', 
              padding: '10px 40px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: selectedRole === role ? '#0056b3' : '#f0f0f0',
                color: selectedRole === role ? '#0056b3' : '#0056b3',
              },
            }}
          >
            {role}
          </Button>
        ))}
      </div>

      
      <Grid container spacing={2} justifyContent="space-between">
  {categories.map((faq, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
        <Card
          elevation={3}
          sx={{
            width:'200%',
            height:"200px",
            display:"flex",
            padding: 2,
            margin: '16px',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom align="center" color={'#8f00c8'} fontFamily={'poppins'} fontSize={'22px'} fontWeight={600}>
              {faq.title}
            </Typography>
            <Typography variant="body2" align="center" color={'#00000'} fontFamily={'poppins'} fontSize={'16px'} fontWeight={600}>
              {faq.description}
            </Typography>
          </CardContent>
        </Card>
    </Grid>
  ))}
</Grid>
    </div>
  );
};

export default CategoryList ;





//https://payil.app/FAQ/
